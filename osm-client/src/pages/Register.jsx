import React, { useState } from "react";
import { createUser } from "@/services/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [message, setMessage] = useState("");
  // Inside RegisterForm component:
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createUser(form);
    console.log("client response", res);
    if (res.error) setMessage(res.error);
    else setMessage("🎉 User registered successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-md rounded-xl border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label className="text-sm text-gray-700">Full Name</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Unnati Gandhi"
                required
              />
            </div>
            <div>
              <Label className="text-sm text-gray-700">Email</Label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="unnatigandhi@example.com"
                required
              />
            </div>
            <div className="relative">
              <Label className="text-sm text-gray-700">Password</Label>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div>
              <Label className="text-sm text-gray-700">Role</Label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 text-gray-700 bg-white"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Register
            </Button>
            {message && (
              <p className="text-sm text-center text-green-600 mt-2">
                {message}
              </p>
            )}
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
