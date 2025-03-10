# import the required functions/definitions
from flask import render_template, redirect
from flask import request, url_for, session
from appointments import app, db
from appointments.models import Patients, Doctors, Appointments
from appointments.models import Surgerydays, Surgerytimes
from datetime import datetime, timedelta
from sqlalchemy import func, cast, Date
from sqlalchemy.exc import SQLAlchemyError
import base64
import re


def validate_input(
        fname, lname, passw="Abcd1234", confirmpassw="Abcd1234",
        dob="01-01-1920", housenum="a1",
        street="a", pcode="a1", allergies="n"):
    """
    validate information provided on signon/signup forms
    parameter types used to register/signon a user is
    validated using this function
    """
    pattern_str = r'^\d{2}-\d{2}-\d{4}$'
    if re.match(pattern_str, dob):
        return (
            fname.strip().isalpha() and
            lname.strip().isalpha() and
            (len(passw) >= 8) and
            (len(confirmpassw) >= 8) and
            (passw == confirmpassw) and
            ((bool(datetime.strptime(
                dob, "%d-%m-%Y")) and
            datetime.strptime(
                dob, "%d-%m-%Y").date().year >= 1920) and
            (datetime.strptime(
                dob, "%d-%m-%Y").date() <
            (datetime.today().date() -
            timedelta(days=90)))) and
            (housenum.replace(' ','').isalnum()) and
            (street.replace(' ','').isalpha()) and
            (pcode.replace(' ','').isalnum()) and
            (allergies.replace(' ','').isalpha()))
    else:
        return False

def clear_session_parameters():
    """
    clear session level parameters
    all session variables set during processing
    stages are reset using this function
    """
    if "did" in session:
        session.pop("did")
    if "sreq" in session:
        session.pop("sreq")
    if "symptoms" in session:
        session.pop("symptoms")
    if "urgent" in session:
        session.pop("urgent")
    if "appointment_date" in session:
        session.pop("appointment_date")
    if "appointment_time" in session:
        session.pop("appointment_time")
    if "aptmnt_id" in session:
        session.pop("aptmnt_id")
    if "update" in session:
        session.pop("update")
    if "_flashes" in session:
        session.pop('_flashes', None)
    if "existing_id" in session:
        session.pop("existing_id")


@app.route("/", methods=["GET", "POST"])
def signon():
    """
    route definition for the signon screen
    information is gathered via the signon form and validated
    a check is made against the DB to confirm whether the user exist
    if not, the user is informed and redirected to the signup screen
    else the user is redirected to the Home screen
    """
    clear_session_parameters()
    user_message = ""

    if request.method == "POST":
        fname = str(request.form.get("fname")).strip()
        lname = str(request.form.get("lname")).strip()
        passw = str(request.form.get("passw")).strip()
        fname = fname.translate(
            str.maketrans('','',string.punctuation))
        lname = lname.translate(
            str.maketrans('','',string.punctuation))
        confirmpassw = passw

        if validate_input(fname, lname, passw, confirmpassw):
            try:
                patient = Patients.query.filter(
                    func.lower(Patients.FirstName) == fname.lower() and
                    func.lower(Patients.LastName) == lname.lower()).first()
            except SQLAlchemyError as e:
                user_message = "user record not found; "
                user_message += "please check details and try again"

                return render_template(
                    "user_message.html", user_message=user_message,
                    forward_page="signon")

            if patient is None:
                user_message = "user record not found; "
                user_message = user_message + "please signup"

                return render_template(
                    "user_message.html", user_message=user_message,
                    forward_page="signup")

            db_passw = base64.b64decode(
                (patient.Password).encode('ascii')).decode('ascii')

            if db_passw == passw:
                session["pid"] = patient.PatientId
                session["allergicto"] = patient.AllergicTo
                user_message = "user login successful"

                return render_template(
                    "user_message.html",
                    user_message=user_message,
                    forward_page="home_page")
            else:
                user_message = "user login unsuccessful; "
                user_message += "please check details and try again"

                return render_template(
                    "user_message.html",
                    user_message=user_message,
                    forward_page="signon")

        else:
            user_message = "user login unsuccessful; "
            user_message += "please check details and try again"

            return render_template(
                "user_message.html",
                user_message=user_message,
                forward_page="signon")

    return render_template("signon.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    """
    route definition for the signup screen
    required information is gathered via the signup form
    and validated an encrypted password is generated based
    on the user's entry the record is then added to the
    Patients table on the DB a unique constraint on
    FirstName, LastName, BirthDate prevents duplicate
    entries to be inserted into the table
    a pop-up message will inform the user of success/failure
    of the process upon failure, the user is returned to the
    signup screen
    """
    clear_session_parameters()
    user_message = ""

    if request.method == "POST":
        fname = str(request.form.get("fname")).strip().lower()
        lname = str(request.form.get("lname")).strip().lower()
        passw = str(request.form.get("passw")).strip()
        confirmpassw = str(request.form.get("confirmpassw")).strip()
        dob = str(request.form.get("bday")).strip()
        housenum = str(request.form.get("housenum")).strip()
        street = str(request.form.get("street")).strip().lower()
        pcode = str(request.form.get("pcode")).strip().lower()
        allergies = str(request.form.get("allergies")).strip().lower()

        fname = fname.translate(str.maketrans(
                '', '', string.punctuation))
        lname = lname.translate(str.maketrans(
                '', '', string.punctuation))
        housenum = housenum.translate(str.maketrans(
                '', '', string.punctuation))
        street = street.translate(str.maketrans(
                '', '', string.punctuation))
        pcode = pcode.translate(str.maketrans(
                '', '', string.punctuation))
        allergies = allergies.translate(str.maketrans(
                '', '', string.punctuation))

        if validate_input(
            fname, lname, passw, confirmpassw, dob,
                housenum, street, pcode, allergies):

            passwrd = base64.b64encode(
                passw.encode('ascii')).decode('ascii')
            patient = Patients(FirstName=fname, LastName=lname,
                               Password=passwrd, BirthDate=dob,
                               HouseNumber=housenum, StreetName=street,
                               PostCode=pcode, AllergicTo=allergies)
            try:
                db.session.add(patient)
                db.session.commit()
                user_message = "user registered successfully. "
                user_message += "Please login to make appointments"

                return render_template("user_message.html",
                                       user_message=user_message,
                                       forward_page="signon")
            except SQLAlchemyError as e:
                user_message = "User has already been registered!"

                return render_template("user_message.html",
                                       user_message=user_message,
                                       forward_page="signup")

            return redirect(url_for("signon"))
        else:
            user_message = "Please provide requested information "
            user_message = user_message + "in the format indicated"

            return render_template("user_message.html",
                                   user_message=user_message,
                                   forward_page="signup")

    return render_template("signup.html")


@app.route("/home_page", methods=["GET", "POST"])
def home_page():
    """
    route definition for the Home screen
    users are directed to this page after signon
    users are greeted and a general message is diplayed
    about the site and encouraged to provide feedback
    suggestions via an input form provided on the page
    """
    user_message = ""

    if session.get("pid") is None:
        return redirect(url_for("signon"))

    if request.method == "POST":
        fullname = request.form.get("fullname")
        email = request.form.get("email")
        comments = request.form.get("comments")
        user_message = "Your comments has been submitted"

        return render_template(
            "user_message.html",
            user_message=user_message,
            forward_page="")
    else:
        return render_template("home_page.html")


@app.route("/view_appointments", methods=["GET"])
def view_appointments():
    """
    route definition for the View_Appointments page
    this is the page where users can view their existing
    appointments as well as editing/deleting them
    this is also the page where new appointments is initiated
    a mini workflow is used to accomplish creation of a new
    appointment with a view that new steps could be introduced
    as and when required
    the workflow guides the user through selection of
    date/time and doctor
    """

    if session.get("pid") is None:
        return redirect(url_for("signon"))

    pid = session.get("pid")
    clear_session_parameters()
    
    if pid is None:
        return redirect(url_for("signon"))
    else:
        appointments = db.session.query(
            Appointments.AppointmentId, Appointments.AppointmentDate,
            Appointments.AppointmentTime,
            Doctors.FirstName, Doctors.LastName).filter(
            Appointments.PatientId == pid).filter(
                Doctors.DoctorId == Appointments.DoctorId).order_by(
                    Appointments.AppointmentDate).all()

        if appointments is not None:

            return render_template("view_appointments.html",
                                   appointments=appointments)
        else:

            return render_template("view_appointments.html")


@app.route("/choose_date_time", methods=["GET", "POST"])
def choose_date_time():
    """
    route definition for appointment date/time selection
    this is the fist step in the workflow of creating a
    new appointment. Dates and times, representing surgery's
    opening days/times are stored on the DB and are
    extracted and provided via two dropdown selection lists.
    """

    if session.get("pid") is None:
        return redirect(url_for("signon"))

    pid = session.get("pid")
    fromdate = datetime.today().date() + timedelta(days=1)
    todate = datetime.today().date() + timedelta(days=14)
    aptmnt_days = Surgerydays.query.filter(
        (cast(Surgerydays.AvailableDays, Date).between(
            fromdate, todate))).all()
    aptmnt_times = Surgerytimes.query.all()

    if request.method == "POST":
        aptmnt_date = request.form.get("appointment_date")
        aptmnt_time = request.form.get("appointment_time")
        session["appointment_date"] = aptmnt_date
        session["appointment_time"] = aptmnt_time

        return redirect(url_for("choose_doctor"))
    else:

        return render_template(
            "choose_date_time.html",
            aptmnt_days=aptmnt_days,
            aptmnt_times=aptmnt_times)


@app.route("/update_date_time", methods=["GET", "POST"])
def update_date_time():
    """
    route definition for appointment date/time update
    this is the fist step in the workflow of updating an
    existing appointment. Dates and times, representing
    surgery's opening days/times are stored on the DB and
    provided via two dropdown selection lists.
    """

    if session.get("pid") is None:
        return redirect(url_for("signon"))

    pid = session.get("pid")
    fromdate = datetime.today().date() + timedelta(days=1)
    todate = datetime.today().date() + timedelta(days=14)
    
    try:
        aptmnt_days = Surgerydays.query.filter(
            (cast(Surgerydays.AvailableDays, Date).between(
                fromdate, todate))).all()

    except SQLAlchemyError as e:
        user_message = str(e.__dict__['orig'])
        return render_template(
                "user_message.html",
                user_message=user_message,
                forward_page="update_date_time")

    try:
        aptmnt_times = Surgerytimes.query.all()

    except SQLAlchemyError as e:
        user_message = str(e.__dict__['orig'])
        return render_template(
                "user_message.html",
                user_message=user_message,
                forward_page="update_date_time")

    if request.method == "POST":
        aptmnt_date = request.form.get("appointment_date")
        aptmnt_time = request.form.get("appointment_time")
        session["appointment_date"] = aptmnt_date
        session["appointment_time"] = aptmnt_time

        return redirect(url_for("update_doctor"))
    else:
        if session.get("appointment_date") not in aptmnt_days:
            old_aptmnt = Surgerydays.query.filter(
            (cast(Surgerydays.AvailableDays, Date) ==
             session.get("appointment_date"))).first()
            aptmnt_days.insert(0, old_aptmnt)

        if session.get("appointment_time") not in aptmnt_times:
            aptmnt_times.insert(0, session.get("appointment_time"))

        aptmnt_date = session.get("appointment_date")
        aptmnt_time = session.get("appointment_time")
        return render_template(
            "update_date_time.html",
            aptmnt_days=aptmnt_days,
            aptmnt_times=aptmnt_times,
            appointment_date=aptmnt_date,
            appointment_time=aptmnt_time)


@app.route("/choose_doctor", methods=["GET", "POST"])
def choose_doctor():
    """
    route definition for doctor selection
    this is the second step in the workflow whereby
    a list of available doctors is provided and the
    user can select one according to condition
    the Doctors' table contains a field to record
    special skills that each doctor might have enabling
    the user to select the relevant one
    """
    user_message = ""

    if session.get("pid") is None:
        return redirect(url_for("signon"))

    pid = session.get("pid")
    unavailable_doctors = []
    
    if request.method == "GET":
        try:
            doctors = Doctors.query.all()
            for doc in doctors:

                if (doc.UnavailableFrom is not None and
                        doc.UnavailableTo is not None):

                    if (doc.UnavailableFrom <=
                        datetime.strptime(session.get(
                            "appointment_date"), '%Y-%m-%d').date() <=
                            doc.UnavailableTo):
                        unavailable_doctors.append(doc)

            return render_template(
                "choose_doctor.html",
                doctors=doctors,
                unavailable_doctors=unavailable_doctors)

        except SQLAlchemyError as e:
            user_message = str(e.__dict__['orig'])

            return render_template(
                "user_message.html",
                user_message=user_message,
                forward_page="choose_doctor")

        return render_template("choose_doctor")
    else:
        did = request.form.get("doctors_list")
        sreq = request.form.get("special_requirement")
        symptoms = request.form.get("symptoms")
        urgent = request.form.get("urgent") == 'on'
        session["did"] = did
        session["sreq"] = sreq
        session["symptoms"] = symptoms
        session["urgent"] = urgent

        return redirect(url_for("make_appointments"))


@app.route("/update_doctor", methods=["GET", "POST"])
def update_doctor():
    """
    route definition for doctor update
    this is the second step in the workflow whereby
    a list of available doctors is provided and the
    user can select one according to availability
    the Doctors' table contains a field to record
    special skills that each doctor might have enabling
    the user to select the relevant one
    """
    user_message = ""

    if session.get("pid") is None:
        return redirect(url_for("signon"))

    pid = session.get("pid")
    unavailable_doctors = []
    if request.method == "GET":
        try:
            doctors = Doctors.query.all()
            for doc in doctors:

                if (doc.UnavailableFrom is not None and
                        doc.UnavailableTo is not None):

                    if (doc.UnavailableFrom <=
                        datetime.strptime(session.get(
                            "appointment_date"), '%Y-%m-%d').date() <=
                            doc.UnavailableTo):
                        unavailable_doctors.append(doc)

            existing_doctor = Doctors.query.filter(
                Doctors.DoctorId == session.get("did")).first()
            
            if existing_doctor:
                session["existing_id"] = existing_doctor.DoctorId

            return render_template(
                "update_doctor.html",
                doctors=doctors,
                unavailable_doctors=unavailable_doctors,
                existing_doctor=existing_doctor,
                special_requirement=session.get("sreq"),
                symptoms=session.get("symptoms"),
                urgent=session.get("urgent"))

        except SQLAlchemyError as e:
            user_message = str(e.__dict__['orig'])

            return render_template(
                "user_message.html",
                user_message=user_message,
                forward_page="update_doctor")

        return render_template("update_doctor")
    else:
        did = request.form.get("doctors_list")

        if did is None:
            did = session["existing_id"]

        sreq = request.form.get("special_requirement")
        symptoms = request.form.get("symptoms")
        urgent = request.form.get("urgent") == 'on'

        session["did"] = did
        session["sreq"] = sreq
        session["symptoms"] = symptoms
        session["urgent"] = urgent

        return redirect(url_for("make_appointments"))


@app.route("/make_appointments")
def make_appointments():
    """
    route definition to finalise making of an appointment
    session variables are created at each stage of the
    workflow and at this stage those are grouped into a
    record to be stored on the DB
    this process contains the logic to identify duplicate
    entries and informing the user of this situation
    the user will be redirected to the page, i.e.
    view_appointments, where the process could be restarted
    """
    user_message = ""

    if session.get("pid") is None:
        return redirect(url_for("signon"))

    pid = session.get("pid")
    did = session.get("did")
    aptmnt_date = session.get("appointment_date")
    aptmnt_time = session.get("appointment_time")
    sreq = session.get("sreq")
    symptoms = session.get("symptoms")
    urgent = session.get("urgent")

    if (
        (session.get("update") is not None) and
            (session.get("aptmnt_id") is not None)):
        try:
            aptmnt_id = session.get("aptmnt_id")
            appointment = Appointments.query.filter(
                Appointments.AppointmentId == aptmnt_id).first()
            if appointment is not None:
                appointment.DoctorId = did
                appointment.AppointmentDate = aptmnt_date
                appointment.AppointmentTime = aptmnt_time
                appointment.SpecialRequirement = sreq
                appointment.Symptoms = symptoms
                appointment.IsUrgent = urgent
                db.session.commit()
                clear_session_parameters()
                user_message = "record updated successfully"

                return render_template(
                    "user_message.html",
                    user_message=user_message,
                    forward_page="view_appointments")
        except SQLAlchemyError as e:
            user_message = str(e.__dict__['orig'])

            return render_template(
                "user_message.html", user_message=user_message,
                forward_page="view_appointments")
    else:
        appointment_exist = Appointments.query.filter(
            Appointments.PatientId == pid, Appointments.DoctorId == did,
            Appointments.AppointmentDate == aptmnt_date,
            Appointments.AppointmentTime == aptmnt_time).first()

        if appointment_exist is not None:
            clear_session_parameters()
            user_message = "A duplicate appointment was found"

            return render_template(
                "user_message.html",
                user_message=user_message,
                forward_page="view_appointments")
        else:
            appointment = Appointments(
                PatientId=pid, DoctorId=did,
                AppointmentDate=aptmnt_date,
                AppointmentTime=aptmnt_time,
                Symptoms=symptoms,
                SpecialRequirement=sreq,
                IsUrgent=urgent)
            try:
                db.session.add(appointment)
                db.session.commit()
                clear_session_parameters()
                user_message = "record saved successfully"
                return render_template(
                    "user_message.html",
                    user_message=user_message,
                    forward_page="view_appointments")
            except SQLAlchemyError as e:
                clear_session_parameters()
                user_message = str(e.__dict__['orig'])

                return render_template(
                    "user_message.html",
                    user_message=user_message,
                    forward_page="view_appointments")

    return redirect(url_for("view_appointments"))


@app.route('/confirm_appointment_update/<int:appointment>',
           methods=["GET", "POST"])
def confirm_appointment_update(appointment):
    """
    route definition for appointment update
    at this stage the required information is recorded
    in order to identify the record to be updated
    and the appointment making workflow is repeated
    in order to gather updated selections
    then the updated record is stored on the DB
    details of the selected record to be updated
    is displayed prior to the start of the workflow
    """

    if session.get("pid") is None:
        return redirect(url_for("signon"))

    session["aptmnt_id"] = appointment
    session["update"] = "update"

    if session.get("aptmnt_id") is not None:
        try:
            appointment_to_update = db.session.query(
                Appointments.AppointmentId,
                Appointments.AppointmentDate,
                Appointments.AppointmentTime,
                Appointments.SpecialRequirement,
                Appointments.Symptoms,
                Appointments.IsUrgent,
                Doctors.DoctorId,
                Doctors.FirstName,
                Doctors.LastName).filter(
                    Appointments.AppointmentId == appointment).filter(
                        Doctors.DoctorId == Appointments.DoctorId).order_by(
                            Appointments.AppointmentDate).first()
        except SQLAlchemyError as e:
            clear_session_parameters()
            user_message = str(e.__dict__['orig'])
            return render_template(
                "user_message.html",
                user_message=user_message,
                forward_page="view_appointments")
                    
        session["appointment_date"] = appointment_to_update.AppointmentDate
        session["appointment_time"] = appointment_to_update.AppointmentTime
        session["did"] = appointment_to_update.DoctorId
        session["sreq"] = appointment_to_update.SpecialRequirement
        session["symptoms"] = appointment_to_update.Symptoms
        session["urgent"] = appointment_to_update.IsUrgent

        if request.method == "POST":          
            return redirect(url_for("update_date_time"))
        else:
            return render_template(
                'confirm_appointment_update.html',
                appointment_to_update=appointment_to_update)

    return redirect(url_for('view_appointments'))


@app.route('/confirm_appointment_deletion/<int:appointment>',
           methods=["GET", "POST"])
def confirm_appointment_deletion(appointment):
    """
    route definition to identify appointment to be deleted
    at this stage details of the selected record to be
    deleted is gathered and displayed for user's confirmation
    """

    if session.get("pid") is None:
        return redirect(url_for("signon"))

    if appointment is not None:
        appointment_to_delete = db.session.query(
            Appointments.AppointmentId,
            Appointments.AppointmentDate,
            Appointments.AppointmentTime,
            Doctors.FirstName,
            Doctors.LastName).filter(
                Appointments.AppointmentId == appointment).filter(
                    Doctors.DoctorId == Appointments.DoctorId).order_by(
                        Appointments.AppointmentDate).first()

        return render_template(
            "confirm_appointment_deletion.html",
            appointment_to_delete=appointment_to_delete)

    return redirect(url_for('view_appointment'))


@app.route('/delete_appointment/<int:appointment>', methods=['GET', 'POST'])
def delete_appointment(appointment):
    """
    route definition to complete appointment deletion
    the record selected for deletion is located on the DB
    and removed from the DB
    the user is informed of the result via a pop-up message box
    """
    user_message = ""

    if session.get("pid") is None:
        return redirect(url_for("signon"))

    if appointment is not None:
        appointment_to_delete = Appointments.query.filter(
            Appointments.AppointmentId == appointment).first()
        try:
            db.session.delete(appointment_to_delete)
            db.session.commit()
            clear_session_parameters()
            user_message = "record deleted successfully"

            return render_template(
                "user_message.html",
                user_message=user_message,
                forward_page="view_appointments")
        except SQLAlchemyError as e:
            clear_session_parameters()
            user_message = str(e.__dict__['orig'])

            return render_template(
                "user_message.html",
                user_message=user_message,
                forward_page="view_appointments")

    return redirect(url_for('view_appointments'))


@app.route("/enquiry_form_submitted")
def enquiry_form_submitted():
    """
    route definition for submission of the Home page form
    on the Home page a form is provided encouraging patients
    to provide comments/concerns/suggestions
    this stage to provide the user with a confirmation that
    the completed form has been submitted
    """
    user_message = "Your comments has been submitted"
    forward_page = "home_page"

    return render_template(
        "user_message.html",
        user_message=user_message,
        forward_page=forward_page)


@app.route("/logout")
def logout():
    """
    route definition for the logout stage
    session parameters are cleared and the user
    is redirected to the signon screen
    """

    if "pid" in session:
        session.pop("pid")

    clear_session_parameters()
    user_message = "You are successfully logged out"
    forward_page = "signon"

    return render_template(
            "user_message.html",
            user_message=user_message,
            forward_page=forward_page)
