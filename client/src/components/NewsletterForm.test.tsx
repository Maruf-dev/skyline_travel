import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsletterForm from "./NewsletterForm";
import { AllProviders } from "../test/helpers";

function renderForm() {
  return render(
    <AllProviders>
      <NewsletterForm />
    </AllProviders>
  );
}

describe("NewsletterForm", () => {
  it("shows an error when submitting an invalid email", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByPlaceholderText(/your email/i), "nope");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  });

  it("clears the error when the user types again", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByPlaceholderText(/your email/i), "nope");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText(/your email/i), "@x.com");
    expect(screen.queryByText(/valid email/i)).not.toBeInTheDocument();
  });
});
