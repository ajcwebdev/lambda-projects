import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ContactForm from './ContactForm'

test('render ContactForm', () =>{
    render(<ContactForm />)
})

test('can fill in and submit form information', () =>{
    const { getByLabelText, getByRole } = render(<ContactForm />)
    
    const firstName = getByLabelText(/first name/i);
    const lastName = getByLabelText(/last name/i);
    const email = getByLabelText(/email/i);
    const message = getByLabelText(/message/i);
    const button = getByRole('button', /submit/i);

    fireEvent.change(firstName, { target: { value: 'First'} })
    fireEvent.change(lastName, { target: { value: 'Last'} })
    fireEvent.change(email, { target: { value: 'email@mail.com'} })
    fireEvent.change(message, { target: { value: 'Test message'} })
    fireEvent.click(button)
})