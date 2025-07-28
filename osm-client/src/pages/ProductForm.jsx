import React, { useState } from "react";
import { createProduct } from "../services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProductForm = () => {
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, price, stock } = form;
    if (!name || !price || !stock) return "All fields are required.";
    if (parseFloat(price) <= 0) return "Price must be greater than 0.";
    if (parseInt(stock) < 0) return "Stock cannot be negative.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError);
      setError(true);
      return;
    }

    try {
      await createProduct({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      });

      setMessage("✅ Product added successfully");
      setError(false);
      setForm({ name: "", sku: "", price: "", stock: "" });
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Error adding product");
      setError(true);
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-16 shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">📦 Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {["name", "price", "stock"].map((field) => (
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
                type={field === "price" || field === "stock" ? "number" : "text"}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          ))}

          <Button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition duration-200"
          >
            ➕ Add Product
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

export default ProductForm;
