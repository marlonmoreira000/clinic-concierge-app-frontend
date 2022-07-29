import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TimeslotCard from "../components/TimeslotCard";
import { BrowserRouter } from "react-router-dom";

const mockItem = {
  _id: 8675309,
  doctor_id: 8675309,
  appointment_slot: {
    start_time: "2022-08-08 14:30:00",
    end_time: "2022-08-08 15:00:00",
  },
  booked: false,
};

const mockDoc = {
  _id: 8675309,
  first_name: "Nick",
  last_name: "Oz",
  gender: "male",
  experience: 10,
  speciality: "General Practice",
  user_id: "86753O9",
  appointments: {
    mockItem,
  },
};

describe("Timeslot Card", async () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <TimeslotCard item={mockItem} doctors={[mockDoc]} index={1} />
      </BrowserRouter>
    );
  });

  it("Links to details for its represented appointment", () => {
    expect(
      screen.getByRole("link", { target: "bookings/8675309" })
    ).toBeInTheDocument();
  });

  it("Displays provided doctor name with appointment", () => {
    expect(screen.getByText("Oz")).toBeInTheDocument();
  });

  it("Displays provided date", () => {
    expect(screen.getByText("2022-08-08")).toBeInTheDocument();
  });

  it("Displays provided start time", () => {
    expect(screen.getByText("14:30")).toBeInTheDocument();
  });
});
