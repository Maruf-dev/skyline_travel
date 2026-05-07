import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "./Contact";
import { AllProviders } from "../test/helpers";

function renderContact() {
  return render(
    <AllProviders>
      <Contact />
    </AllProviders>
  );
}

describe("Contact form validation", () => {
  it("shows three required errors when submitting an empty form", async () => {
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });

  it("rejects an invalid email and accepts a valid one", async () => {
    const user = userEvent.setup();
    renderContact();

    await user.type(screen.getByLabelText(/your name/i), "Alice");
    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    await user.type(screen.getByLabelText(/your message/i), "Hello.");
    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();

    await user.clear(screen.getByLabelText(/email/i));
    await user.type(screen.getByLabelText(/email/i), "alice@example.com");
    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
  });

  it("clears the field error as the user types", async () => {
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByRole("button", { name: /send/i }));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/your name/i), "B");
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
  });
});
