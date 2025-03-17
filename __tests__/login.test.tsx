import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import LoginPage from "../app/login/page";

jest.mock("../app/lib/actions", () => ({
  authenticate: jest.fn(() => Promise.resolve({ success: true })),
}));

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: jest.fn((param) => {
      if (param === "callbackUrl") return "/dashboard";
      return null;
    }),
  }),
}));

beforeEach(() => {
  render(<LoginPage />);
});

describe("Login-page", () => {
  it("renders the instruction text", () => {
    expect(screen.getByText("Please log in to continue.")).toBeInTheDocument();
  });

  it("renders email and password input fields", () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("renders the login button", () => {
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("allows user to enter credentials", () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("user@example.com");
    expect(passwordInput).toHaveValue("password123");
  });
});
