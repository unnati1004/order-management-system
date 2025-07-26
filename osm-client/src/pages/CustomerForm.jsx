import React, { useState } from "react";
import { createCustomer } from "../services/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const CustomerForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createCustomer(form);
      if (result.error) {
        setMessage(result.error);
        setError(true);
      } else {
        setMessage("✅ Customer created successfully!");
        setError(false);
        setForm({ name: "", email: "", phone: "" });
      }
    } catch (err) {
      setMessage("❌ Something went wrong.");
      setError(true);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-16 shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">👤 Add Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {["name", "email", "phone"].map((field) => (
            <div key={field}>
              <Label htmlFor={field} className="text-sm font-medium text-gray-700 capitalize">
                {field}
              </Label>
              <Input
                id={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
                type={field === "email" ? "email" : "text"}
                required={field !== "phone"}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          ))}

          <Button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition duration-200"
          >
            ➕ Add Customer
          </Button>

          {message && (
            <Alert
              variant={error ? "destructive" : "default"}
              className={`mt-4 border-l-4 ${
                error ? "border-red-500" : "border-green-500"
              } bg-gray-50`}
            >
              <AlertTitle className={error ? "text-red-700" : "text-green-700"}>
                {error ? "Error" : "Success"}
              </AlertTitle>
              <AlertDescription className="text-sm text-gray-600">{message}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomerForm;
