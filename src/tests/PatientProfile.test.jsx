import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import PatientProfile from "../components/pages/PatientProfile";

describe("PatientProfile", () => {

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
    render(<PatientProfile />, { wrapper: BrowserRouter });
  });

  it("Patient profile created", async () => {
    const firstNameField = screen.getByLabelText("First Name");
    const lastNameField = screen.getByLabelText("Last Name");
    const contactNumberField = screen.getByLabelText("Contact Number");
    const streetNumberField = screen.getByPlaceholderText("street number");
    const streetNameField = screen.getByPlaceholderText("street name");
    const suburbField = screen.getByPlaceholderText("suburb/city");
    //const stateField = screen.getByTestId("select state");
    //const stateField = screen.getByRole("combobox", { name: "" });
    //console.log("firstNameField: %O", firstNameField);
    //console.log("stateFiled: %O", stateField);
    const postcodeField = screen.getByPlaceholderText("Postcode");

    // Input credentials to form
    fireEvent.change(firstNameField, {
      target: { value: "John" },
    });
    fireEvent.change(lastNameField, {
      target: { value: "Doe" },
    });
    fireEvent.change(contactNumberField, {
      target: { value: "1234567890" },
    });
    fireEvent.change(streetNumberField, {
      target: { value: "1" },
    });
    fireEvent.change(streetNameField, {
      target: { value: "some street" },
    });
    fireEvent.change(suburbField, {
      target: { value: "melbourne" },
    });
    fireEvent.change(postcodeField, {
      target: { value: "3000" },
    });

    // Submit form to create profile
    fireEvent.click(screen.getByRole("button", { name: "Create Profile" }));
  });

  it("Patient profile created with optional values", async () => {
    const firstNameField = screen.getByLabelText("First Name");
    const lastNameField = screen.getByLabelText("Last Name");
    const contactNumberField = screen.getByLabelText("Contact Number");
    const streetNumberField = screen.getByPlaceholderText("street number");
    const streetNameField = screen.getByPlaceholderText("street name");
    const suburbField = screen.getByPlaceholderText("suburb/city");
    const postcodeField = screen.getByPlaceholderText("Postcode");
    const ageField = screen.getByPlaceholderText("Age");
    const genderField = screen.getByRole("radio", { name: "Male" });

    // Input credentials to form
    fireEvent.change(firstNameField, {
      target: { value: "John" },
    });
    fireEvent.change(lastNameField, {
      target: { value: "Doe" },
    });
    fireEvent.change(contactNumberField, {
      target: { value: "1234567890" },
    });
    fireEvent.change(streetNumberField, {
      target: { value: "1" },
    });
    fireEvent.change(streetNameField, {
      target: { value: "some street" },
    });
    fireEvent.change(suburbField, {
      target: { value: "melbourne" },
    });
    fireEvent.change(postcodeField, {
      target: { value: "3000" },
    });
    fireEvent.change(ageField, {
      target: { value: 30 },
    });
    fireEvent.change(ageField, {
      target: { value: 30 },
    });
    fireEvent.click(genderField);

    // Submit form to create profile
    fireEvent.click(screen.getByRole("button", { name: "Create Profile" }));
  });

  it("Patient profile failed bad request", async () => {
    const firstNameField = screen.getByLabelText("First Name");
    const lastNameField = screen.getByLabelText("Last Name");
    const contactNumberField = screen.getByLabelText("Contact Number");
    const streetNumberField = screen.getByPlaceholderText("street number");
    const streetNameField = screen.getByPlaceholderText("street name");
    const suburbField = screen.getByPlaceholderText("suburb/city");
    const postcodeField = screen.getByPlaceholderText("Postcode");

    // Input credentials to form
    fireEvent.change(firstNameField, {
      target: { value: "Existing" },
    });
    fireEvent.change(lastNameField, {
      target: { value: "Doe" },
    });
    fireEvent.change(contactNumberField, {
      target: { value: "1234567890" },
    });
    fireEvent.change(streetNumberField, {
      target: { value: "1" },
    });
    fireEvent.change(streetNameField, {
      target: { value: "some street" },
    });
    fireEvent.change(suburbField, {
      target: { value: "melbourne" },
    });
    fireEvent.change(postcodeField, {
      target: { value: "3000" },
    });

    // Submit form to create profile
    fireEvent.click(screen.getByRole("button", { name: "Create Profile" }));
  });

  it("Patient profile failed something went wrong", async () => {
    const firstNameField = screen.getByLabelText("First Name");
    const lastNameField = screen.getByLabelText("Last Name");
    const contactNumberField = screen.getByLabelText("Contact Number");
    const streetNumberField = screen.getByPlaceholderText("street number");
    const streetNameField = screen.getByPlaceholderText("street name");
    const suburbField = screen.getByPlaceholderText("suburb/city");
    const postcodeField = screen.getByPlaceholderText("Postcode");

    // Input credentials to form
    fireEvent.change(firstNameField, {
      target: { value: "sth.went.wrong" },
    });
    fireEvent.change(lastNameField, {
      target: { value: "Doe" },
    });
    fireEvent.change(contactNumberField, {
      target: { value: "1234567890" },
    });
    fireEvent.change(streetNumberField, {
      target: { value: "1" },
    });
    fireEvent.change(streetNameField, {
      target: { value: "some street" },
    });
    fireEvent.change(suburbField, {
      target: { value: "melbourne" },
    });
    fireEvent.change(postcodeField, {
      target: { value: "3000" },
    });

    // Submit form to create profile
    fireEvent.click(screen.getByRole("button", { name: "Create Profile" }));
  });
});