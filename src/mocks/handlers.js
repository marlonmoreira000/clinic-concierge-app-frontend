import { rest } from "msw";

// Mock Data
const loginSuccess = {
  error: false,
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQzYTBmNTAwMzg4NjlmNGZhYTM2NjAiLCJyb2xlcyI6WyJ1c2VyIiwiZG9jdG9yIl0sImlhdCI6MTY1ODk4NDYwOCwiZXhwIjoxNjU4OTg4MjA4fQ.hXIYJ6ylsqkixU8oFr6PXo5ijJ69JNVjK3pJppZhJzI",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQzYTBmNTAwMzg4NjlmNGZhYTM2NjAiLCJyb2xlcyI6WyJ1c2VyIiwiZG9jdG9yIl0sImlhdCI6MTY1ODk4NDYwOCwiZXhwIjoxNjU5MDcxMDA4fQ.iY0Rq8QkyJGAYwitSEgcV62uzVvUhRYDjGHwpI5z_8s",
  message: "Login successful",
};

const loginFailed = {
  error: true,
  message: "Account already exists for this email",
};

const registerSuccess = {
  error: false,
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmUyMzZiNDJlNjViNTk0NTQwOTBiNGMiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTY1ODk5MjMwOCwiZXhwIjoxNjU4OTk1OTA4fQ.71WV5gndmVcqcTmefeBs5bL7EpbSpYuIz0o4Kq_eCdM",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmUyMzZiNDJlNjViNTk0NTQwOTBiNGMiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTY1ODk5MjMwOCwiZXhwIjoxNjU5MDc4NzA4fQ.U_4_u7qqPD-JaZ6pZ-U3ivm0H3JtD4SLY6SvzowwFIk",
  message: "Account created successfully",
};

const registerFailed = {
  error: true,
  message: "User exist",
};

const logoutSuccess = {
  error: false,
  message: "Token found. Logged out",
};

const patientProfileCreated = {
  first_name: "John",
  last_name: "Doe",
  contact_number: 123456789,
  address: {
    street_number: 1,
    street_name: "some street",
    suburb: "melbourne",
    state: "Victoria",
    postcode: 3169,
  },
  gender: "other",
  age: 50,
  appointments: [],
  user_id: "62e236b42e65b59454090b4c",
  _id: "62e237cd2e65b59454090b53",
  createdAt: "2022-07-28T07:16:29.376Z",
  updatedAt: "2022-07-28T07:16:29.376Z",
  __v: 0,
};

const patientProfileFailed = {
  error: true,
  message: "Bad Request",
};

const doctors = [
  {
    appointments: [],
    _id: "62d0b723973a6ab7e30b3bc8",
    first_name: "John",
    last_name: "Doe",
    gender: "male",
    experience: 15,
    speciality: "diabetology",
    bio: "Some Bio",
    user_id: "62cfb8a8776e94160cfee75b",
    createdAt: "2022-07-15T00:38:59.620Z",
    updatedAt: "2022-07-15T00:38:59.620Z",
    __v: 0,
  },
  {
    appointments: [],
    _id: "62d0c5459e2a6f4f87d6fbe9",
    first_name: "Hans",
    last_name: "Zimmak",
    gender: "female",
    experience: 20,
    speciality: "pregnancy and neonatal care",
    bio: "Some Bio",
    user_id: "62d0c4899e2a6f4f87d6fbe2",
    createdAt: "2022-07-15T01:39:17.729Z",
    updatedAt: "2022-07-15T01:39:17.729Z",
    __v: 0,
  },
];

const appointments = [
  {
    appointment_slot: {
      start_time: "2022-07-25T05:35:59.000Z",
      end_time: "2022-07-25T06:35:59.000Z",
    },
    _id: "62d65c9fcf0b5ec18af4a6eb",
    doctor_id: "62d0c5459e2a6f4f87d6fbe9",
    booked: false,
    createdAt: "2022-07-15T05:45:53.014Z",
    updatedAt: "2022-07-25T02:05:40.755Z",
    __v: 0,
    booked_by: null,
  },
  {
    appointment_slot: {
      start_time: "2022-07-25T04:35:59.000Z",
      end_time: "2022-07-25T05:35:59.000Z",
    },
    _id: "62d0ff9d3f44591d7d190c97",
    doctor_id: "62d0c5459e2a6f4f87d6fbe9",
    booked: false,
    createdAt: "2022-07-15T05:48:13.750Z",
    updatedAt: "2022-07-23T10:32:58.062Z",
    __v: 0,
    booked_by: null,
  },
];

const makeAppointment = {
  appointment_id: "62d65c9fcf0b5ec18af4a6eb",
  patient_id: "62e237cd2e65b59454090b53",
  attended: false,
  fee_paid: false,
  reason_for_visit: "no notes provided",
  _id: "62e29dff6ae2318c08ed0571",
  createdAt: "2022-07-28T14:32:31.079Z",
  updatedAt: "2022-07-28T14:32:31.079Z",
  __v: 0,
};

const myAppointments = [
  {
    _id: "62e29dff6ae2318c08ed0571",
    appointment_id: "62d65c9fcf0b5ec18af4a6eb",
    patient_id: "62e237cd2e65b59454090b53",
    attended: false,
    fee_paid: false,
    reason_for_visit: "no notes provided",
    createdAt: "2022-07-28T14:32:31.079Z",
    updatedAt: "2022-07-28T14:32:31.079Z",
    __v: 0,
  },
];

const createAppointment = {
  doctor_id: "62d0d235bc3742c45027c255",
  appointment_slot: {
    start_time: "2022-07-30T22:00:35.000Z",
    end_time: "2022-07-30T23:00:48.000Z",
  },
  booked: false,
  _id: "62e3f1f3f521a1abc3085a1a",
  createdAt: "2022-07-29T14:42:59.790Z",
  updatedAt: "2022-07-29T14:42:59.790Z",
  __v: 0,
};

// Adding handlers for msw mocking
export const handlers = [
  // Login handler
  rest.post(
    "https://clinic-concierge.herokuapp.com/api/v1/login",
    (req, res, ctx) => {
      if (req.body.email == "unknown.user@test.com") {
        return res(ctx.status(401), ctx.json(loginFailed));
      } else if (req.body.email == "sth.went.wrong@test.com") {
        return res(ctx.status(500), ctx.json({}));
      } else {
        return res(ctx.status(200), ctx.json(loginSuccess));
      }
    }
  ),

  // Register handler
  rest.post(
    "https://clinic-concierge.herokuapp.com/api/v1/register",
    (req, res, ctx) => {
      if (req.body.email == "existing.user@test.com") {
        return res(ctx.status(400), ctx.json(registerFailed));
      } else if (req.body.email == "sth.went.wrong@test.com") {
        return res(ctx.status(500), ctx.json({}));
      } else {
        return res(ctx.status(200), ctx.json(registerSuccess));
      }
    }
  ),

  // Create Patient profile handler
  rest.post(
    "https://clinic-concierge.herokuapp.com/api/v1/patients",
    (req, res, ctx) => {
      if (req.body.first_name == "Existing") {
        return res(ctx.status(400), ctx.json(patientProfileFailed));
      } else if (req.body.first_name == "sth.went.wrong") {
        return res(ctx.status(500), ctx.json({}));
      } else {
        return res(ctx.status(201), ctx.json(patientProfileCreated));
      }
    }
  ),

  // Logout successful
  rest.delete(
    "https://clinic-concierge.herokuapp.com/api/v1/refreshToken/",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(logoutSuccess));
    }
  ),

  // Get Doctors handler
  rest.get(
    "https://clinic-concierge.herokuapp.com/api/v1/doctors/",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(doctors));
    }
  ),

  // Get Appointments handler
  rest.get(
    "https://clinic-concierge.herokuapp.com/api/v1/appointments?fromTime=&toTime=&doctorId=&booked=false",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(appointments));
    }
  ),

  // Make Appointment handler
  rest.post(
    "https://clinic-concierge.herokuapp.com/api/v1/bookings/",
    (req, res, ctx) => {
      return res(ctx.status(201), ctx.json(makeAppointment));
    }
  ),

  // Get Booking by ID handler
  rest.get(
    "https://clinic-concierge.herokuapp.com/api/v1/bookings?userId=62d3a0f50038869f4faa3660",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(myAppointments));
    }
  ),

  // Create new Appointment handler
  rest.post(
    "https://clinic-concierge.herokuapp.com/api/v1/appointments",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(createAppointment));
    }
  ),
];
