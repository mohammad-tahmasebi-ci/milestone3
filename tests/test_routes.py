import pytest
#from flask import request
from appointments import app, routes


class Testing():
	def test_validate_input(self):
		assert routes.validate_input('sam', 'daniels', passw="Abcd1234",
		dob="01-01-1920", housenum="a1",
		street="a", pcode="a1", allergies="n")


	def test_home_page(self):
		result = app.get("/home_page")
		assert result


	def test_signon(self):
		result = app.get("/")
		assert result


	def test_signup(self):
		result = app.get("/signup")
		assert result


	def test_view_appointments(self):
		result = app.get("/view_appointments")
		assert result


	def test_choose_date_time(self):
		result = app.get("/choose_date_time")
		assert result



	def test_choose_doctor(self):
		result = app.get("/choose_doctor")
		assert result


	def test_make_appointments(self):
		result = app.get("/make_appointments")
		assert result


	def test_confirm_appointment_update(self):
		result = app.get("/confirm_appointment_update")
		assert result


	def test_confirm_appointment_deletion(self):
		result = app.get("/confirm_appointment_deletion")
		assert result


	def test_delete_appointment(self):
		result = app.get("/delete_appointment")
		assert result


	def test_enquiry_form_submited(self):
		result = app.get("/enquiry_form_submited")
		assert result


	def test_logout(self):
		result = app.get("/logout")
		assert result


