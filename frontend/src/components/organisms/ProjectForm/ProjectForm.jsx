import React from 'react'
import { TextField, Button, CircularProgress, Alert, Box } from '@mui/material'
import { SideBySideBox } from './ProjectForm.styles'
import dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const ProjectForm = ({
  project,
  loading,
  error,
  formError,
  onChange,
  onSubmit,
  handleCancel,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
        }}
      >
        <SideBySideBox>
          <TextField
            required
            label="Project Name"
            variant="outlined"
            fullWidth
            value={project.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
            error={formError.title}
            helperText={formError.title ? 'Title is required' : ''}
          />

          <DatePicker
            required
            label="Start Date"
            value={project.date ? dayjs(project.date) : null}
            onChange={(date) => onChange('date', date)}
            error={formError.date}
            sx={{ minWidth: '250px' }}
            helperText={formError.date ? 'Start Date is required' : ''}
          />
        </SideBySideBox>

        <TextField
          required
          label="Description"
          variant="outlined"
          value={project.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          error={formError.description}
          helperText={formError.description ? 'Description is required' : ''}
          fullWidth
          multiline
          rows={5}
        />

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <Button
            variant="outlined"
            sx={{ width: '200px' }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit" sx={{ width: '200px' }}>
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error">{error.message}</Alert>}
    </form>
  )
}

export default ProjectForm
