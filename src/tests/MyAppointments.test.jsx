import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { waitFor } from "@testing-library/react";
import fetch from "node-fetch";
import MyAppointments from "../components/pages/MyAppointments";

global.fetch = fetch;

describe("my appointments", () => {
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

    global.localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQzYTBmNTAwMzg4NjlmNGZhYTM2NjAiLCJyb2xlcyI6WyJ1c2VyIiwiZG9jdG9yIl0sImlhdCI6MTY1ODk4NDYwOCwiZXhwIjoxNjU4OTg4MjA4fQ.hXIYJ6ylsqkixU8oFr6PXo5ijJ69JNVjK3pJppZhJzI');
    
    render(<MyAppointments />, { wrapper: BrowserRouter });
  });

  afterEach(async () => {
    global.localStorage.removeItem('token');
  });

  it("Displays the Header component with the title 'My Apppointments'", () => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "My Appointments"
    );
  });

  it("Get new booking successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument;
      expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument;
    });
  });
});