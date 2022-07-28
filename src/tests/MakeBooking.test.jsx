import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { waitFor } from "@testing-library/react";
import fetch from "node-fetch";
import MakeBooking from "../components/pages/MakeBooking";

global.fetch = fetch;

describe("make booking", () => {
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
    render(<MakeBooking />, { wrapper: BrowserRouter });
  });

  it("Create new booking successfully", async () => {
    // Submit form to register
    fireEvent.click(screen.getByRole("button", { name: "Confirm Booking" }));

    await waitFor(() => {
      expect(screen.findByText("Your appointment has been booked!")).toBeInTheDocument;
    });
  });
});