<p align="center"><img src="appointments/static/images/am-i-responsive.png" alt="Signup Form" width="500px" height="500px"></p>

# The Community Surgery Appointment System

The community surgery is a fictitious doctors’ surgery.  The surgery is in need of an online appointment management system.
This will enable patients to manage their appointments and free up admin time for more urgent tasks.
The system should allow new patients to register and signon using an encrypted password, which will be stored on a database.
Registered patients, then, will be able to view their existing appointments, as well as updating and deleting as and when required.
A workflow has been devised to aid patients with the above tasks.  The workflow provides the surgery with the flexibility to add
extra steps as the need arises.

# Table of Contents 

* [Design](#design)

    * Technologies Used 
    * Frameworks, Libraries, Programs Used

* [User Stories](#user-stories)
  
* [Features](#features)
  
    * Current
    * Future

* [Testing](#testing)

    * HTML Validation
    * CSS Validation
    * JS Validation
    * Manual Testing
    * Functional Testing
    * Issues Encountered

* [Deployment](#deployment)

    * Github Pages
    * Local Clone

* [Credits and Acknowledgements](#credits-and-acknowledgements)

## Design

The design is to provide patients with an easy to follow system in order to view, make, update, delete appointments.
This will remove confusion and reduce the process to few simple steps.  This will also provide surgery's admin staff
with more time to spend on more critical tasks.
Design is broken into the following main sections:

- Signup
- Signon
- Home page
- Make/view appointment
- Update appointment
- Delete Appointment

### Design Wireframes

<p align="center"><img src="appointments/static/images/signup.png" alt="Signup Form" width="400px" height="400px"></p>
<p align="center"><img src="appointments/static/images/signon.png" alt="Signon Form" width="400px" height="300px"></p>
<p align="center"><img src="appointments/static/images/home-page.png" alt="Home Page" width="400px" height="500px"></p>
<p align="center"><img src="appointments/static/images/view-make-appointments.png" alt="View-Make Appointments" width="400px" height="200px"></p>
<p align="center"><img src="appointments/static/images/date-time-selection.png" alt="Date-Time Selection" width="400px" height="200px"></p>
<p align="center"><img src="appointments/static/images/doctor-selection.png" alt="Doctor Selection" width="400px" height="400px"></p>
<p align="center"><img src="appointments/static/images/update-appointments.png" alt="Update Appointments" width="400px" height="200px"></p>
<p align="center"><img src="appointments/static/images/delete-appointments.png" alt="Delete Appointments" width="400px" height="200px"></p>
<p align="center"><img src="appointments/static/images/db-schema.png" alt="DB Schema" width="400px" height="700px"></p>


## Technologies Used

- HTML
- CSS
- Materialize
- Javascript
- JQuery
- RDBMS

## Frameworks, Libraries, Programs Used

- Github
- SQLAlchemy ORM
- Postgres
- Flask
- Fontawesome
- Google fonts
- Am I Responsive
- W3C HTML/CSS validator
- Javascript validator

## User Stories

As a new patient I’d like to be able to register easily and have a confirmation of the process's result.

A signup screen is provided for this purpose, as displayed below:
<p align="center"><img src="appointments/static/images/registration-form.png" alt="Registration Form" width="400px" height="400px"></p>
Comments are placed on each input field to indicate the required data. Fields are also marked as required, ensuring requested information 
is provided by the user. No attempts will be made at registering the user until all data is provided. 
If the user attempts to register as an existing user the following message will be displayed:
<p align="center"><img src="appointments/static/images/duplicate-user-message.png" alt="Duplicate Registration" width="300px" height="100px"></p>
And the user will be returned to the signup screen.
A password confirmation field has been provided to ensure the user has entered the desired password.  Password is, then, encrypted and stored 
on a database.  There is, also, a field to get a list of medications the user is allergic to.
As an existing user, on signon, I’d like to be presented with a welcoming message and provided with the necessary options to view/make 
appointments.  The following screen has been provided for this purpose. Upon a successful signon, the user will be directed to the Home page 
whereby menu options are available to view/make appointments; as well as raising concerns, providing advice, using the form provided.
The signon screen is displayed below:
<p align="center"><img src="appointments/static/images/login.png" alt="Login Form" width="400px" height="200px"></p>
As with the Signup screen, above fields contain information as to the data required for each field and no attempt at signing on will be made 
until all data is provided.  Once the required user information is provided a check is made against the DB to ensure the user exist.  
If not the following message is presented:
<p align="center"><img src="appointments/static/images/user-not-exist.png" alt="User Not Exist" width="300px" height="100px"></p>
The user, then, is directed to the Signup screen.
If incorrect information is provided, a message will inform the user and instruct a retry, as displayed below:
<p align="center"><img src="appointments/static/images/incorrect-user-details.png" alt="Incorrect User Details" width="300px" height="100px"></p>
Upon a successful signon, the user will be presented with the following message:
<p align="center"><img src="appointments/static/images/successful-login.png" alt="Successful Login" width="300px" height="100px"></p>
And will be, subsequently, directed to the Home page, as displayed below:
<p align="center"><img src="appointments/static/images/welcome-page.png" alt="Welcome Page" width="600px" height="400px"></p>
On the above Home screen, a message welcomes users to the site, provides menu options to view/make appointments, as well as logging out of 
the site. Also an enquiry form is provided, enabling users to provide the practice with any concerns, advice they might have, as displayed 
below:
<p align="center"><img src="appointments/static/images/user-enquiry-form.png" alt="User Enquiry Form" width="500px" height="300px"></p>
After filling in the form, once the send button is pressed, a message box will inform the user of the submission of the form, as displayed 
below:
<p align="center"><img src="appointments/static/images/enquiry-submitted.png" alt="Enquiry Submitted" width="300px" height="100px"></p>
Afterwards, the user will be returned to the Home page.


As a user, I’d like to be able to make appointments with doctors at the surgery on a convenient date/time.

The Appointments menu option, on the Home screen, is provided for this purpose.  A user will be able to make/view/update/delete appointments 
by clicking on Appointments menu option.  The user will be presented with below screen upon the first use:
<p align="center"><img src="appointments/static/images/fresh-appointment.png" alt="New Appointment" width="400px" height="200px"></p>
By clicking on the button provided the user can make new appointments.  The process has been devised as a workflow, whereby the user is guided 
through a number of steps, which could be extended at a future date, if so desired.  
First the user will have to select date and time of the desired appointment, as displayed below:
<p align="center"><img src="appointments/static/images/workflow-step1.png" alt="Workflow Step 1" width="400px" height="200px"></p>
Two tables, SurgeryDays & SurgeryTimes, hold data to be used to populate the dropdown fields for date and time. A script to populate the above 
table with the required date/time range is provided.  The date dropdown list will contain 10 working days’ worth of entries; meaning bookings 
could be made for up to 10 days ahead.  The times’ dropdown list allows up to four appointments per hour.
After selecting the desired date & time, the user will be presented with the following screen, whereby a doctor of choice could be selected:
<p align="center"><img src="appointments/static/images/workflow-step2.png" alt="Workflow Step 2" width="400px" height="200px"></p>
Based on the selected date, doctors’ availability could be different.  This is due to an accommodation that has been made for doctors’ days 
off.  If the selected date coincides with a doctor’s day off, that doctor will be listed but will not be selectable.  A message along with the 
name of  the doctor will inform the user of this fact.
E.g. the Doctors table on the test DB currently holds the following data:
<p align="center"><img src="appointments/static/images/doctor-availability.png" alt="Doctor Availability" width="600px" height="100px"></p>
As a result an appointment date prior to March 10, 2025 should list all three doctors as available. This has been displayed in the above screenshot.
An appointment for March 10, 2025 should display one doctor as unavailable, as displayed below:
<p align="center"><img src="appointments/static/images/doctor-availability-date1.png" alt="Doctor Availability Date1" width="400px" height="200px"></p>
<p align="center"><img src="appointments/static/images/doctor-availability1.png" alt="Doctor Availability 1" width="400px" height="200px"></p>
An appointment for March 11, 2025 should display two doctors as unavailable:
<p align="center"><img src="appointments/static/images/doctor-availability-date2.png" alt="Doctor Availability Date2" width="400px" height="200px"></p>
<p align="center"><img src="appointments/static/images/doctor-availability2.png" alt="Doctor Availability 2" width="400px" height="200px"></p>
An appointment between March 12, 2025 and March 13, 2025 should display one doctor as unavailable:
<p align="center"><img src="appointments/static/images/doctor-availability-date3.png" alt="Doctor Availability Date3" width="400px" height="200px"></p>
<p align="center"><img src="appointments/static/images/doctor-availability3.png" alt="Doctor Availability 3" width="400px" height="200px"></p>
<p align="center"><img src="appointments/static/images/doctor-availability-date4.png" alt="Doctor Availability Date4" width="400px" height="200px"></p>
<p align="center"><img src="appointments/static/images/doctor-availability4.png" alt="Doctor Availability 4" width="400px" height="200px"></p>
Selecting a date after March 13, 2025 should display all doctors as available:
<p align="center"><img src="appointments/static/images/doctor-availability-date5.png" alt="Doctor Availability Date5" width="400px" height="200px"></p>
<p align="center"><img src="appointments/static/images/doctor-availability5.png" alt="Doctor Availability 5" width="400px" height="200px"></p>
Two extra fields are provided on the doctor selection screen, in order to gather some information on patient’s condition and severity; as well 
as whether the patient has any special requirement; e.g. wheelchair access, lift, etc.
<p align="center"><img src="appointments/static/images/appointment-urgency.png" alt="Appointment Urgency" width="400px" height="200px"></p>
At the next stage, an attempt is made at making the appointment.  If the user does not have an existing appointment, for the same date/time, 
the appointment will be saved and the user is informed as such:
<p align="center"><img src="appointments/static/images/appointment-successful.png" alt="Appointment Successful" width="300px" height="100px"></p>
The user is then returned to the Appointments screen where the recent booking is displayed, as shown below:
<p align="center"><img src="appointments/static/images/appointment-display.png" alt="Appointment Display" width="400px" height="200px"></p>
If the user attempts to make another appointment for the same date/time combination the following message will be displayed:
<p align="center"><img src="appointments/static/images/duplicate-appointment.png" alt="duplicate appointment" width="300px" height="100px"></p>
And the attempt will fail.


As a user, I’d like to be able to update/delete appointments.

Each appointment is displayed as a card including two buttons enabling the user to Update/Delete existing appointments.
If the update option is selected, the following screen is displayed:
<p align="center"><img src="appointments/static/images/update-appointment.png" alt="Update Appointment" width="400px" height="200px"></p>
If the user chooses the Update button, again, the same process, as making a new appointment, is followed.  After selecting new date/time, or 
changing the doctor:
<p align="center"><img src="appointments/static/images/update-date-time.png" alt="Update Date-Time" width="400px" height="200px"></p>
<p align="center"><img src="appointments/static/images/update-doctor-urgency.png" alt="Update Doctor Urgency" width="400px" height="200px"></p>
As noted above, appointment information has been carried on to the update screen.  Upon clicking the Next button, the user will get a message 
as to the success/failure of the process:
<p align="center"><img src="appointments/static/images/update-appointment-successful.png" alt="Update Appointment Successful" width="300px" height="100px"></p>
And the user is returned to the Appointment screen where a list of existing appointments is displayed:
<p align="center"><img src="appointments/static/images/appointment-after-update.png" alt="Appointment After Update" width="400px" height="200px"></p>
If, on the other hand, the Delete button is selected for an existing appointment, the following screen is displayed to confirm user’s choice:
<p align="center"><img src="appointments/static/images/delete-appointment.png" alt="Delete Appointment" width="400px" height="200px"></p>
Upon clicking the Delete button, an attempt is made to delete the appointment and inform the user via a message screen of the outcome:
<p align="center"><img src="appointments/static/images/delete-appointment-successful.png" alt="Delete Appointment Successful" width="300px" height="100px"></p>
And the user is returned to the Appointment screen, where a list of all existing appointments is displayed:
<p align="center"><img src="appointments/static/images/appointment-after-delete.png" alt="Appointment After Delete" width="400px" height="200px"></p>


As a user, I’d like to be able to logout of the system securely.

The Logout menu option, on the Home and the Appointments screens, is provided for this purpose.  Once this option is selected, user’s session 
information is deleted and the following message is displayed:
<p align="center"><img src="appointments/static/images/logout-message.png" alt="Logout Message" width="300px" height="100px"></p>
And the user is returned to the Signon screen.

## Features

### Current Features

- Password, on the Signup screen, is encrypted prior to storage on the DB.  This is then used on subsequent signons.
- A unique constraint on the patients table, made up of columns FirstName, LastName, BirthDate, prevents duplicate registration.
- Tables SurgeryDays and SurgeryTimes contain opening days/times for the surgery and is used to control date/time appointments are made for.
- Doctors table contain fields, UnavailableFrom and UnavailableTo fields, to ensure patients can make appointments with doctors on duty.
- A unique constraint on the appointments table, made up of columns PatientId, AppointmentDate, AppointmentTime, prevents a patient from making duplicate appointments.
- Menu options provided on each screen are minimal and relevant to the user activity.
- A pop-up message informs user of the result of actions taken.
- Process of making an appointment is configured as a workflow enabling users to manager their appointments easily.
- Process of making an appointment is configured as a workflow enabling the practice to include extra steps as and when required.
- The code uses try-except blocks to handle SQLAlchemyError exceptions.
- The code uses SQLAlchemy to interact with the postgres database.
- The code uses Flask's session management to store user-specific data, which is a common and recommended approach.
- Checks are carried out on input to ensure data type being entered is correct.
- Basic code deployed to prevent URL hijacking.
- Jest scripts has been used to validate HTML files.
- Pytest has been used to validate flask route nodes.


### Future Features

- Provide Admin menu to view/manage appointments.
- Provide screen to display patient information to Admin/doctors.
- Review password encryption, e.g. multifactor authentication.
- Provide password change functionality.
- Provide predefined templates for workflow modification.
- Store enquiry form on the database for future reference.

## Testing

<p align="center"><img src="appointments/static/images/python-code-checker.png" alt="Python Code Check" width="300px" height="200px"></p>
<p align="center"><img src="appointments/static/images/ci-python-linter.png" alt="Python Linter" width="300px" height="200px"></p>
<p align="center"><img src="appointments/static/images/js-validator.png" alt="JS Validator" width="300px" height="200px"></p>
<p align="center"><img src="appointments/static/images/css-validator.png" alt="CSS Validator" width="300px" height="200px"></p>
<p align="center"><img src="appointments/static/images/pytest.png" alt="Python Pytest" width="300px" height="200px"></p>
<p align="center"><img src="appointments/static/images/jest-test.png" alt="Jest Test" width="300px" height="100px"></p>
<p align="center"><img src="appointments/static/images/manual-test1.png" alt="Manual Test 1" width="400px" height="300px"></p>
<p align="center"><img src="appointments/static/images/manual-test2.png" alt="Manual Test 2" width="400px" height="600px"></p>

### Issues Encountered

Most issues were due to unfamiliarity with technologies being used.  E.g. how to construct the required query/subquery in SQLAlchemy ORM.
E.g. using the following query to extract a specific record did not work:
patient = Patients.query.filter(
                    func.lower(Patients.FirstName) == fname.lower() and
                    func.lower(Patients.LastName) == lname.lower()).first()
After some testing the correct query was created:
patient = Patients.query.filter(
                    func.lower(Patients.FirstName) == fname.lower()).filter(
                    func.lower(Patients.LastName) == lname.lower()).first()
Another issue was using Flask conditional statements in templates to arrive at the desired result.  E.g. when trying to display a list of
doctors but have the ones unavailable disabled.  The issue was resolve by combining parameters passed in to the template and use of For 
loop as well as IF statements.
statement

## Deployment

Github Pages

GitHub Pages used to deploy live version of the website.
1.	Log in to GitHub and locate GitHub Repository milestone-project
2.	At the top of the Repository(not the main navigation) locate "Settings" button on the menu.
3.	Scroll down the Settings page until you locate "GitHub Pages".
4.	Under "Source", click the dropdown menu "None" and select "Main" and click "Save".
5.	The page will automatically refresh.
6.	Scroll back to locate the now-published site link in the "GitHub Pages" section.

Forking the GitHub Repository

By forking the repository, we make a copy of the original repository on our GitHub account to view and change without affecting the original repository by using these steps:
1.	Log in to GitHub and locate GitHub Repository milestone-project 
2.	At the top of the Repository(under the main navigation) locate "Fork" button.
3.	Now you should have a copy of the original repository in your GitHub account.

Local Clone

1.	Log in to GitHub and locate GitHub Repository milestone-project
2.	Under the repository name click "Clone or download"
3.	Click on the code button, select clone with HTTPS, SSH or GitHub CLI and copy the link shown.
4.	Open Git Bash
5.	Change the current working directory to the location where you want the cloned directory to be made.
6.	Type git clone and then paste The URL copied in the step 3.
7.	Press Enter and your local clone will be created.

## Credits and Acknowledgements

Thanks to my mentor, Mitko Bachvarov, for providing helpful suggestions, feedback, and links to different guides to assist with this project.
<br />
Thanks, also, to Miguel Ortega Logorreta, learning assistant, for the advice and guidance offered to assist with the project.
<br />
Code Institute for the educational materials.
<br />
Background medical image from pintrest.co.uk
