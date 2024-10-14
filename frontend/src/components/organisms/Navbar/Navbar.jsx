"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  useMediaQuery,
  Box,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import {
  signedIn,
  setUserInfo,
  getUserRole,
  deleteUserInfo,
  getUserUIN,
} from "@services/authService";
import { signIn, signOut } from "next-auth/react";

/**
 * A functional component that renders the navigation bar.
 * It includes links to different pages and handles user authentication.
 * @returns {JSX.Element} The rendered Navbar component.
 */
export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control the drawer open/close
  const [userRole, setUserRole] = useState(null); // State to store the user's role
  const theme = useTheme(); // Access the theme for responsive design
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is mobile-sized

  /**
   * Toggles the drawer open/close state.
   * @param {boolean} open - Indicates whether to open or close the drawer.
   * @returns {function} A function to handle the toggle event.
   */
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Menu items based on user role
  const menuItems = [
    { text: "Home", link: "/" },
    // Conditionally render "View Members" if role is not "member" and role exists
    userRole &&
      userRole !== "member" &&
      userRole !== "subteam lead" && {
        text: "View Members",
        link: "/Member",
      },
  ].filter(Boolean); // Filter out falsy values

  const drawer = (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            href={item.link}
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const [isSignedIn, setIsSignedIn] = useState(false); // State to track sign-in status

  /**
   * Handles the Google sign-in and sign-out process.
   * @returns {Promise<void>} A promise that resolves when the sign-in/sign-out is complete.
   */
  const handleGoogleSignInAndOut = async () => {
    setIsLoading(true);
    const signedin = await signedIn();
    try {
      if (signedin) await deleteUserInfo();
      signedin ? signOut("google") : signIn("google", { redirectTo: "/" });
    } catch (error) {
      console.error("Google error:", error);
    } finally {
      // This doesn't run if the sign in/out is successful since they redirect
    }
  };

  // Sets up user info, if available
  useEffect(() => {
    const setup = async () => {
      const signedin = await signedIn();
      setIsSignedIn(signedin);
      if (signedin) {
        const role = await getUserRole();
        const uin = await getUserUIN();
        if (role === undefined || uin === undefined) {
          setUserInfo();
          const role2 = await getUserRole();
          setUserRole(role2);
        } else {
          setUserRole(role);
        }
        console.log(role);
        console.log(uin);
      }
    };

    setup();
  }, []);

  return (
    <AppBar
      position="static"
      style={{
        marginBottom: "30px",
        padding: "10px",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" passHref>
            <img src="/logo.png" alt="Logo" style={{ height: "70px" }} />
          </Link>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              {drawer}
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  color="inherit"
                  component={Link}
                  href={item.link}
                >
                  {item.text}
                </Button>
              ))}
              {!userRole && (
                <Button
                  variant="outlined"
                  color="inherit"
                  component={Link}
                  href="/Member/New"
                >
                  New Member?
                </Button>
              )}
              <Button
                variant="outline"
                onClick={handleGoogleSignInAndOut}
                color="inherit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress color="white" />
                ) : isSignedIn ? (
                  "Sign out"
                ) : (
                  "Sign in"
                )}
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
