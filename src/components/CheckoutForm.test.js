import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event"

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm />)

    const header = screen.getByText(/checkout form/i);

    expect(header).toBeInTheDocument();
    expect(header).not.toBeNull();

});

test("shows success message on submit with form details", () => {

    render(<CheckoutForm/>);

    const firstNameInput = screen.getByLabelText(/first name:/i);
    const lastNameInput = screen.getByLabelText(/last name:/i);
    const addressInput = screen.getByLabelText(/address:/i);
    const cityInput = screen.getByLabelText(/city:/i);
    const stateInput = screen.getByLabelText(/state:/i);
    const zipInput = screen.getByLabelText(/zip:/i);
    const checkoutButton = screen.getByRole('button');

    let successMessage = screen.queryByTestId("successMessage")
    expect(successMessage).toBeNull();

    userEvent.type(firstNameInput, "Sherlock");
    userEvent.type(lastNameInput, "Holmes");
    userEvent.type(addressInput, "221 Baker Street");
    userEvent.type(cityInput, "London");
    userEvent.type(stateInput, "England");
    userEvent.type(zipInput, "NW1-6XE");
    userEvent.click(checkoutButton);

    successMessage = screen.getByTestId("successMessage");

    const fullName = screen.getByText(/sherlock holmes/i);
    const fullAddress = screen.getByText(/london, england NW1-6XE/i);

    expect(successMessage). toBeInTheDocument();
    expect(fullName).toBeInTheDocument();
    expect(fullAddress).toBeInTheDocument();
});
