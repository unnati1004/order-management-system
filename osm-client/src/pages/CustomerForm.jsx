import React, { useState } from 'react';
import { createCustomer } from '../services/api';

function CustomerForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createCustomer({ name, email, phone });
    if (result.error) {
      alert(result.error);
    } else {
      alert('Customer created!');
      setName('');
      setEmail('');
      setPhone('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
      <button type="submit">Add Customer</button>
    </form>
  );
}

export default CustomerForm;