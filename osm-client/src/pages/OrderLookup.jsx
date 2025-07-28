// client/src/pages/OrderLookup.jsx
'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function OrderLookup() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`import.meta.env.BASE_URL/api/orders/${orderId}`);
      setOrder(res.data);
    } catch (err) {
      alert("Order not found.");
      setOrder(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Lookup Order</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="order-id">Order ID</Label>
            <Input
              id="order-id"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID"
            />
          </div>
          <Button onClick={fetchOrder}>Search</Button>
        </CardContent>
      </Card>

      {order && (
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Customer ID:</strong> {order.customerId}</p>
            <div>
              <strong>Products:</strong>
              <ul className="list-disc list-inside">
                {order.products.map((p, i) => (
                  <li key={i}>
                    Product: {p.productId} — Qty: {p.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default OrderLookup;
