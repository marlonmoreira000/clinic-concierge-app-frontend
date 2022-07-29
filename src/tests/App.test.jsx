import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import fetch from "node-fetch";
import App from "../components/App";
import { waitFor } from "@testing-library/react";

global.fetch = fetch;

describe("Authentication - not logged in", () => {
  beforeEach(function () {
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
    render(<App />);
  });

  afterEach(async () => {
    global.localStorage.removeItem("token");
    global.localStorage.removeItem("refreshToken");
    global.localStorage.removeItem("user");
  });

  it("Redirects to login when attempting to access protected route before logging in", async () => {
    // Attempt to navigate to Bookings screen
    await userEvent.click(screen.getAllByText("Bookings")[1]);
    // Expect login form to be rendered
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument;
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument;
  });

  it("Allows users to log in", async () => {
    // Navigate to login screen
    await userEvent.click(screen.getAllByText("Login")[1]);

    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText("Password");

    // Input credentials to form
    fireEvent.change(emailField, {
      target: { value: "test_patient2@test.com" },
    });
    fireEvent.change(passwordField, {
      target: { value: "Test@1234" },
    });

    expect(screen.getByLabelText("Password")).toBeInTheDocument;

    // Submit form to sign in
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(global.localStorage.getItem("token")).toBeDefined();
    expect(global.localStorage.getItem("refreshToken")).toBeDefined();
    expect(global.localStorage.getItem("user")).toBeDefined();

    // User should be redirected to home screen
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Make a Booking" }))
        .toBeInTheDocument;
    });
  });
});

describe("Authentication - logged in", () => {
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

    global.localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQzYTBmNTAwMzg4NjlmNGZhYTM2NjAiLCJyb2xlcyI6WyJ1c2VyIiwiZG9jdG9yIl0sImlhdCI6MTY1ODk4NDYwOCwiZXhwIjoxNjU4OTg4MjA4fQ.hXIYJ6ylsqkixU8oFr6PXo5ijJ69JNVjK3pJppZhJzI"
    );
    global.localStorage.setItem(
      "refreshToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQzYTBmNTAwMzg4NjlmNGZhYTM2NjAiLCJyb2xlcyI6WyJ1c2VyIiwiZG9jdG9yIl0sImlhdCI6MTY1ODk4NDYwOCwiZXhwIjoxNjU5MDcxMDA4fQ.iY0Rq8QkyJGAYwitSEgcV62uzVvUhRYDjGHwpI5z_8s"
    );
    global.localStorage.setItem("user", "dummyUser");

    render(<App />);
  });

  afterEach(async () => {
    global.localStorage.removeItem("token");
    global.localStorage.removeItem("refreshToken");
    global.localStorage.removeItem("user");
  });

  it("Allows users to access protected routes", async () => {
    // Await user clicking Make Booking
    await userEvent.click(screen.getAllByText("Bookings")[1]);

    // User should be redirected to bookings screen
    await waitFor(() => {
      expect(screen.getByRole("textbox", { placeholder: "Select date" }))
        .toBeInTheDocument;
      expect(screen.getByRole("button", { name: "Choose Doctor" }))
        .toBeInTheDocument;
    });
  });

  it("Allows users to logout", async () => {
    // Await user clicking Make Booking
    await userEvent.click(screen.getAllByText("Logout")[1]);

    // User should be redirected to home screen in logged out state
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Make a Booking" }))
        .toBeInTheDocument;
      expect(screen.getAllByText("Login")[1]);
    });
  });
});