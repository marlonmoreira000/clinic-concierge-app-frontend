import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { waitFor } from "@testing-library/react";
import SetAppointment from "../components/pages/SetAppointment";

describe("SetAppointment", () => {
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
    render(<SetAppointment />, { wrapper: BrowserRouter });
  });

  it("Displays the Header component with the title 'Create New Availability'", async () => {
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Create New Availability");
    });
  });

  it("Failed to create new appointment", async () => {
    const startDate = screen.getByPlaceholderText("Start date");
    const endDate = screen.getByPlaceholderText("End date");

    // Input appointment date time
    fireEvent.change(startDate, {
      target: { value: "2022-07-30T22:00:35.000Z" },
    });
    fireEvent.change(endDate, {
      target: { value: "2022-07-30T23:00:48.000Z" },
    });

    // Submit form to register
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.findByText("Something went wrong")).toBeInTheDocument;
    });
  });
});