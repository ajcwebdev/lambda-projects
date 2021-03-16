import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  const { getByText } = render(<CheckoutForm />);
  getByText(/checkout form/i);
});

test("form shows success message on submit with form details", () => {
  const { getByLabelText, findByText, getByRole } = render(<CheckoutForm />);

  fireEvent.change(getByLabelText(/first name/i), { target: { value: 'First' } });
  fireEvent.change(getByLabelText(/last name/i), { target: { value: 'Last' } });
  fireEvent.change(getByLabelText(/address/i), { target: { value: '555 Street Drive' } });
  fireEvent.change(getByLabelText(/city/i), { target: { value: 'Town' } });
  fireEvent.change(getByLabelText(/state/i), { target: { value: 'CA' } });
  fireEvent.change(getByLabelText(/zip/i), { target: { value: '12345' } });
  
  expect(getByLabelText(/first name/i).value).toBe('First');
  expect(getByLabelText(/last name/i).value).toBe('Last');
  expect(getByLabelText(/address/i).value).toBe('555 Street Drive');
  expect(getByLabelText(/city/i).value).toBe('Town');
  expect(getByLabelText(/state/i).value).toBe('CA');
  expect(getByLabelText(/zip/i).value).toBe('12345');

  fireEvent.click(getByRole('button', /checkout/i))

  findByText('You have ordered some plants! Woo-hoo! First Last 555 Street Drive Town, CA 12345');
});