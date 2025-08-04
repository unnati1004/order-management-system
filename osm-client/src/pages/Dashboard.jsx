import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
const CustomerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // 👈 Loading for product fetch
  const [orderLoading, setOrderLoading] = useState(false); // Optional: For order placing

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.user.role !== "customer") {
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load products");

        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, [navigate, user]);

  const handlePlaceOrder = async (productId) => {
    try {
      setOrderLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          customerId: user.user.id,
          products: [{ productId, quantity: 1 }],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to place order");

      toast.success("✅ Order Placed", {
        description: `Order ID: ${data._id}`,
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">🛍️ All Products</h2>
      {error && <p className="text-red-600 text-center mb-6">{error}</p>}

      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-500">
          <Loader2 className="animate-spin mr-2 h-5 w-5" />
          Loading products...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-indigo-600 font-medium mb-1">
                  Price: ₹{product.price}
                </p>
                <p className="text-gray-500 text-sm line-clamp-3">
                  {product.description || "No description available."}
                </p>
              </div>
              <div className="mt-4">
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => handlePlaceOrder(product._id)}
                  disabled={orderLoading} // Optional: Prevent rapid clicks
                >
                  {orderLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Placing...
                    </div>
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
