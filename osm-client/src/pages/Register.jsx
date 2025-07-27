import React, { useState } from 'react';
import { createUser } from '@/services/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const RegisterForm = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createUser(form);
    if (res.error) setMessage(res.error);
    else setMessage('User registered successfully');
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <Label>Email</Label>
            <Input name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <Label>Password</Label>
            <Input name="password" type="password" value={form.password} onChange={handleChange} required />
          </div>
          <Button type="submit" className="w-full">Register</Button>
          {message && <p className="text-sm text-gray-500 mt-2">{message}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
