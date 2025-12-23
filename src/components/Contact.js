import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ message: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_7s7cg8k';
    const templateId = 'template_72g1uyf';
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'HNRogh4CYv8Bv_VT0';

    const templateParams = {
      name: form.name,
      email: form.email,
      title: form.subject,
      message: form.message
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus({ message: 'Message sent successfully!', isError: false });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Email send error:', err);
      setStatus({
        message: `Failed to send: ${err?.text || err?.message || 'Unknown error'}`,
        isError: true
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus({ message: '', isError: false }), 4000);
    }
  };

  return (
    <section className="contact">
      <div className="container">
        <h2>Get In Touch</h2>
        <p>Ready to start your next project? Let's discuss.</p>

        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Subject
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="6"
              required
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {status.message && (
            <div className={`submit-status ${status.isError ? 'error' : 'success'}`}>
              {status.isError ? '✖' : '✓'} {status.message}
            </div>
          )}
        </form>

        <div className="contact-info">
          <p><strong>Email:</strong> <a href="mailto:rfazim662@gmail.com">rfazim662@gmail.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+916382676699">+91 63826 76699</a></p>
          <p><strong>Location:</strong> India (Remote & On-site)</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;