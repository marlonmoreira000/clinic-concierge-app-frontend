import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { waitFor } from "@testing-library/react";
import Login from "../components/pages/Login";

describe("Login", () => {
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
    render(<Login />, { wrapper: BrowserRouter });
  });

  afterEach(async () => {
    global.localStorage.removeItem('token');
    global.localStorage.removeItem('refreshToken');
    global.localStorage.removeItem('user');
  });

  it("Successfully login", async () => {
    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText("Password");

    // Input credentials to form
    fireEvent.change(emailField, {
      target: { value: "test_patient2@test.com" },
    });
    fireEvent.change(passwordField, {
      target: { value: "Test@1234" },
    });

    screen.debug();
    expect(screen.getByLabelText("Password")).toBeInTheDocument;

    // Submit form to sign in
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(global.localStorage.getItem("token")).toBeDefined();
      expect(global.localStorage.getItem("refreshToken")).toBeDefined();
      expect(global.localStorage.getItem("user")).toBeDefined();

      expect(screen.findByText("Login successful")).toBeInTheDocument;
    });
  });

  it("Failed login invalid user", async () => {
    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText("Password");

    // Input credentials to form
    fireEvent.change(emailField, {
      target: { value: "unknown.user@test.com" },
    });
    fireEvent.change(passwordField, {
      target: { value: "Test@1234" },
    });

    screen.debug();
    expect(screen.getByLabelText("Password")).toBeInTheDocument;

    // Submit form to sign in
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(global.localStorage.getItem("token")).toBe(null);
      expect(global.localStorage.getItem("refreshToken")).toBe(null);
      expect(global.localStorage.getItem("user")).toBe(null);

      expect(screen.findByText("User does not exist")).toBeInTheDocument;
    });
  });

  it("Login something went wrong", async () => {
    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText("Password");

    // Input credentials to form
    fireEvent.change(emailField, {
      target: { value: "sth.went.wrong@test.com" },
    });
    fireEvent.change(passwordField, {
      target: { value: "Test@1234" },
    });

    screen.debug();
    expect(screen.getByLabelText("Password")).toBeInTheDocument;

    // Submit form to sign in
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(screen.findByText("Something went wrong")).toBeInTheDocument;
    });
  });
})