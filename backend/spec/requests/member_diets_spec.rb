require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe "/member_diets", type: :request do
  let(:valid_member_attributes) {
    {
      first_name: "John",
      last_name: "Doe",
      uin: 132123555,
      major: "Comp Sci",
      year: 2025,
      email: "ajzhou2003@tamu.edu",
      phone: 1234567890,
      tshirt_size: "S",
      aggie_ring_day: Date.today,
      birthday: Date.today,
      graduation_day: Date.today
    }
  }

  let(:valid_diet_attributes) {
    {
      item_name: "cheese"
    }
  }

  let!(:member) { Member.create!(valid_member_attributes) }
  let!(:dietary_restriction) { DietaryRestriction.create!(valid_diet_attributes) }
  let!(:dietary_restriction2) { DietaryRestriction.create!(valid_diet_attributes) }
  # This should return the minimal set of attributes required to create a valid
  # MemberDiet. As you add validations to MemberDiet, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    {
      uin: member.uin,
      item_id: dietary_restriction.id
    }
  }

  let(:invalid_attributes) {
    {
      uin: 1234
    }
  }

  # This should return the minimal set of values that should be in the headers
  # in order to pass any filters (e.g. authentication) defined in
  # MemberDietsController, or in your router and rack
  # middleware. Be sure to keep this updated too.
  let(:valid_headers) {
    {}
  }

  describe "GET /index" do
    it "renders a successful response" do
      MemberDiet.create! valid_attributes
      get member_diets_url, headers: valid_headers, as: :json
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      member_diet = MemberDiet.create! valid_attributes
      get member_diet_url(member_diet), as: :json
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new MemberDiet" do
        expect {
          post member_diets_url,
               params: { member_diet: valid_attributes }, headers: valid_headers, as: :json
        }.to change(MemberDiet, :count).by(1)
      end

      it "renders a JSON response with the new member_diet" do
        post member_diets_url,
             params: { member_diet: valid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "does not create a new MemberDiet" do
        expect {
          post member_diets_url,
               params: { member_diet: invalid_attributes }, as: :json
        }.to change(MemberDiet, :count).by(0)
      end

      it "renders a JSON response with errors for the new member_diet" do
        post member_diets_url,
             params: { member_diet: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        {
          item_id: dietary_restriction2.id
        }
      }

      it "updates the requested member_diet" do
        member_diet = MemberDiet.create! valid_attributes
        patch member_diet_url(member_diet),
              params: { member_diet: new_attributes }, headers: valid_headers, as: :json
        member_diet.reload
        expect(member_diet.item_id).to eq(dietary_restriction2.id)
      end

      it "renders a JSON response with the member_diet" do
        member_diet = MemberDiet.create! valid_attributes
        patch member_diet_url(member_diet),
              params: { member_diet: new_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the member_diet" do
        member_diet = MemberDiet.create! valid_attributes
        patch member_diet_url(member_diet),
              params: { member_diet: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested member_diet" do
      member_diet = MemberDiet.create! valid_attributes
      expect {
        delete member_diet_url(member_diet), headers: valid_headers, as: :json
      }.to change(MemberDiet, :count).by(-1)
    end
  end
end
