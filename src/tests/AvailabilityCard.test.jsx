import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import AvailabilityCard from "../components/AvailabilityCard";

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

describe("Avilability Card", async () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    render(
      <AvailabilityCard item={mockItem} doctors={[mockDoc]} index={1} />,
      { wrapper: BrowserRouter }
    );
  });

  it("Includes delete button", () => {
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("Displays provided date", () => {
    expect(screen.getByText("08.08.2022")).toBeInTheDocument();
  });

  it("Displays provided start time", () => {
    expect(screen.getByText("2:30 PM")).toBeInTheDocument();
  });
});
