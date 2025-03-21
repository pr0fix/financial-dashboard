import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SignUpPage from "../app/sign-up/page";

jest.mock("../app/lib/actions", () => ({
  authenticate: jest.fn(() => Promise.resolve({ success: true })),
}));

beforeEach(() => {
  render(<SignUpPage />);
});

describe("Sign-up-page", () => {
  it("renders the instruction text", () => {
    expect(screen.getByText("Create your account")).toBeInTheDocument();
  });

  it("renders name, email and password input fields", () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("renders the sign up button", () => {
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it("allows user to enter credentials", () => {
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(nameInput, { target: { value: "user" } });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(nameInput).toHaveValue("user");
    expect(emailInput).toHaveValue("user@example.com");
    expect(passwordInput).toHaveValue("password123");
  });
});
