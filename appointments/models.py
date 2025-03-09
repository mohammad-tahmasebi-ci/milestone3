from appointments import db

# below are ORM table definitions to be created on Postgresql

class Patients(db.Model):
    PatientId = db.Column(db.Integer, primary_key=True)
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    Password = db.Column(db.String(50), nullable=False)
    BirthDate = db.Column(db.Date, nullable=False)
    HouseNumber = db.Column(db.String(10), nullable=False)
    StreetName = db.Column(db.String(100), nullable=False)
    PostCode = db.Column(db.String(10), nullable=False)
    AllergicTo = db.Column(db.String(50), nullable=True)
    Appointments = db.relationship("Appointments", backref="patients", cascade="all, delete", lazy=True)
    
    #def __repr__(self):
    #    return "Patient: {0} {1} born on: {2}".format(self.FirstName, self.LastName, self.DateOfBirth)
    
class Doctors(db.Model):
    DoctorId = db.Column(db.Integer, primary_key=True)
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    BirthDate = db.Column(db.String(10), nullable=False)
    Sex = db.Column(db.String(1), nullable=False)
    Speciality = db.Column(db.String(100), nullable=False)
    UnavailableFrom = db.Column(db.Date, nullable=True)
    UnavailableTo = db.Column(db.Date, nullable=True)
    Appointments = db.relationship("Appointments", backref="doctors", cascade="all, delete", lazy=True)
    
    def __repr__(self):
        return "Doctor: {0} {1} with speciality in: ".format(self.FirstName, self.LastName, self.Speciality)
    
class Appointments(db.Model):
    AppointmentId = db.Column(db.Integer, primary_key=True)
    PatientId = db.Column(db.Integer, db.ForeignKey("patients.PatientId", ondelete="CASCADE"), nullable=False)
    DoctorId = db.Column(db.Integer, db.ForeignKey("doctors.DoctorId", ondelete="CASCADE"), nullable=False)
    SpecialRequirement = db.Column(db.String(100), nullable=True)
    AppointmentDate = db.Column(db.String(10), nullable=False)
    AppointmentTime = db.Column(db.String(10), nullable=False)
    Symptoms = db.Column(db.String(50), nullable=False)
    IsUrgent = db.Column(db.Boolean, nullable=False, default=False)
    
    def __repr__(self):
        return "Appointment for patient: {0}".format(self.PatientId)
    

class Surgerydays(db.Model):
    AvailableDays = db.Column(db.String(10), primary_key=True)
    
    def __repr__(self):
        return "Surgery Days: {0}".format(self.AvailableDays)
    
class Surgerytimes(db.Model):
    AvailableTimes = db.Column(db.String(10), primary_key=True)
    
    def __repr__(self):
        return "Surgery Times: {0}".format(self.AvailableTimes)
    
