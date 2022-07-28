import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { waitFor } from "@testing-library/react";
import Register from "../components/pages/Register";

describe("register", () => {
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
    render(<Register />, { wrapper: BrowserRouter });
  });

  afterEach(async () => {
    global.localStorage.removeItem('token');
    global.localStorage.removeItem('refreshToken');
    global.localStorage.removeItem('user');
  });

  it("Register new user successfully", async () => {
    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText("Password");

    // Input credentials to form
    fireEvent.change(emailField, {
      target: { value: "new_patient@test.com" },
    });
    fireEvent.change(passwordField, {
      target: { value: "Test@1234" },
    });

    screen.debug();

    // Submit form to register
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(global.localStorage.getItem("token")).toBeDefined();
      expect(global.localStorage.getItem("refreshToken")).toBeDefined();
      expect(global.localStorage.getItem("user")).toBeDefined();

      expect(screen.findByText("Account created successfully")).toBeInTheDocument;
    });
  });

  it("Register new user failed existing user", async () => {
    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText("Password");

    // Input credentials to form
    fireEvent.change(emailField, {
      target: { value: "existing.user@test.com" },
    });
    fireEvent.change(passwordField, {
      target: { value: "Test@1234" },
    });

    screen.debug();

    // Submit form to register
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(global.localStorage.getItem("token")).toBe(null);
      expect(global.localStorage.getItem("refreshToken")).toBe(null);
      expect(global.localStorage.getItem("user")).toBe(null);

      expect(screen.findByText("Account already exists for this email")).toBeInTheDocument;
    });
  });

  it("Register new user failed something went wrong", async () => {
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

    // Submit form to register
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(screen.findByText("Something went wrong")).toBeInTheDocument;
    });
  });
});