// components/ContactForm.js
import { useState } from 'react';

const ContactForm = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatus('Sending...');

        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.ok) {
                setStatus('Message sent!');
                setFormState({ name: '', email: '', message: '' });
            } else {
                setStatus('Something went wrong.');
            }
        } catch (error) {
            setStatus('Something went wrong.');
        }
    };

    return (
        <form
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            netlify-honeypot="bot-field"
        >
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
                <label>
                    Don’t fill this out if you're human: <input name="bot-field" onChange={handleChange} />
                </label>
            </p>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Message:
                <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                />
            </label>
            <button type="submit">Send</button>
            {status && <p>{status}</p>}
        </form>
    );
};

export default ContactForm;
