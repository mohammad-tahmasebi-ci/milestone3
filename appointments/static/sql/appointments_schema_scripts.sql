-- Table: public.appointments
-- DROP TABLE public.appointments;
CREATE TABLE public.appointments
(
    "AppointmentId" integer NOT NULL DEFAULT nextval('"appointments_AppointmentId_seq"'::regclass),
    "PatientId" integer NOT NULL,
    "DoctorId" integer NOT NULL,
    "SpecialRequirement" character varying(50) COLLATE pg_catalog."default",
    "AppointmentDate" character varying(10) COLLATE pg_catalog."default" NOT NULL,
    "AppointmentTime" character varying(5) COLLATE pg_catalog."default" NOT NULL,
    "Symptoms" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "IsUrgent" boolean NOT NULL,
    CONSTRAINT appointments_pkey PRIMARY KEY ("AppointmentId"),
    CONSTRAINT u_pid_appdate_apptime UNIQUE ("PatientId", "AppointmentDate", "AppointmentTime")
)
TABLESPACE pg_default;
ALTER TABLE public.appointments
    OWNER to postgres;


-- Table: public.doctors
-- DROP TABLE public.doctors;
CREATE TABLE public.doctors
(
    "DoctorId" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "FirstName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "LastName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "BirthDate" character varying(10) COLLATE pg_catalog."default" NOT NULL,
    "Sex" character varying(1) COLLATE pg_catalog."default" NOT NULL,
    "Speciality" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "UnavailableFrom" date,
    "UnavailableTo" date,
    CONSTRAINT "Doctors_pkey" PRIMARY KEY ("DoctorId"),
    CONSTRAINT u_name_bday UNIQUE ("FirstName", "LastName", "BirthDate")
)
TABLESPACE pg_default;
ALTER TABLE public.doctors
    OWNER to postgres;


-- Table: public.patients
-- DROP TABLE public.patients;
CREATE TABLE public.patients
(
    "PatientId" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "FirstName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "LastName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "BirthDate" character varying(10) COLLATE pg_catalog."default" NOT NULL,
    "HouseNumber" character varying(10) COLLATE pg_catalog."default" NOT NULL,
    "StreetName" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "PostCode" character varying(10) COLLATE pg_catalog."default" NOT NULL,
    "AllergicTo" character varying(50) COLLATE pg_catalog."default",
    "Password" character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT "Patients_pkey" PRIMARY KEY ("PatientId"),
    CONSTRAINT u_name_birthdate UNIQUE ("FirstName", "LastName", "BirthDate")
)
TABLESPACE pg_default;
ALTER TABLE public.patients
    OWNER to postgres;


-- Table: public.surgerydays
-- DROP TABLE public.surgerydays;
CREATE TABLE public.surgerydays
(
    "AvailableDays" character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "SurgeryDays_pkey" PRIMARY KEY ("AvailableDays")
)
TABLESPACE pg_default;
ALTER TABLE public.surgerydays
    OWNER to postgres;

-- Table: public.surgerytimes
-- DROP TABLE public.surgerytimes;
CREATE TABLE public.surgerytimes
(
    "AvailableTimes" character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "SurgeryTimes_pkey" PRIMARY KEY ("AvailableTimes")
)
TABLESPACE pg_default;
ALTER TABLE public.surgerytimes
    OWNER to postgres;



--script to populate SurgeryDays:

truncate table "SurgeryDays";

INSERT INTO "SurgeryDays"("AvailableDate")
select cast(adate as varchar(10)) from 
(SELECT adate FROM generate_series(
    '2025-01-01'::date,
    '2025-12-31'::date,
    '1 day'::interval
) as adate) as t
where (select extract (dow from adate)) not in (0, 6);


--script to populate "SurgeryTimes":

truncate table "SurgeryTimes";

INSERT INTO "SurgeryTimes"("AvailableTimes")
select substring(cast(the_day as varchar(20)), 12, 5) as the_time from
(select the_day from
(SELECT the_day::timestamp as the_day
FROM   generate_series(timestamp '2025-01-01', '2025-01-02', '15 min') the_day) as t) as t1
where date_part('hour', the_day::timestamp) > 8 and date_part('hour', the_day::timestamp) < 17;


