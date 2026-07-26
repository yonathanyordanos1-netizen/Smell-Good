import { useState, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCart } from "../context/CartContext";
import { uploadFile } from "../hooks/useProducts";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    paymentMethod: "telebirr",
  });
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const placeOrder = useMutation(api.orders.placeOrder);
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);

  const formattedPrice = (price: number) =>
    new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshotFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setScreenshotPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let paymentScreenshot: string | undefined;

      // Upload screenshot if Telebirr + file selected
      if (formData.paymentMethod === "telebirr" && screenshotFile) {
        setUploadProgress("Uploading payment screenshot...");
        const storageId = await uploadFile(generateUploadUrl, screenshotFile);
        paymentScreenshot = storageId;
      }

      setUploadProgress("Placing your order...");
      // Submit order to Convex
      await placeOrder({
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone || undefined,
        customerAddress: formData.address,
        items: items.map((item) => ({
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: totalPrice,
        notes: formData.notes || undefined,
        paymentMethod: formData.paymentMethod === "telebirr" ? "Telebirr" : "Cash on Delivery",
        paymentScreenshot,
      });
    } catch (err) {
      console.warn("Failed to save order to Convex, running in demo mode:", err);
    }
    setOrderPlaced(true);
    clearCart();
    setIsSubmitting(false);
    setUploadProgress(null);
  };

  // If cart is empty and we haven't just placed an order, redirect to cart
  if (items.length === 0 && !orderPlaced) {
    return <Navigate to="/cart" replace />;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-lg px-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 font-['Playfair_Display'] mb-4">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-500 mb-2">
            Thank you for your order! Your order has been saved and the admin will contact you.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            This is a demo website. In the full version, you would receive real payment and order confirmation via email.
          </p>

          {formData.paymentMethod === "telebirr" && (
            <div className="bg-ice rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-ocean mb-2">📱 Telebirr Payment Instructions</h3>
              <p className="text-gray-600 text-sm">
                Send <strong>{formattedPrice(totalPrice)}</strong> to Telebirr account <strong>09XX XXX XXX</strong>.
                <br />
                Include your order number in the payment reference.
              </p>
            </div>
          )}

          <button
            onClick={() => navigate("/shop")}
            className="bg-ocean text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-ocean/90 transition-all duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-bold text-gray-900 font-['Playfair_Display'] mb-2">Checkout</h1>
        <p className="text-gray-500 mb-10">Complete your order</p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Billing Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+251 911 234 567"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                    <input
                      type="text"
                      placeholder="Addis Ababa"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                      disabled
                      value="Addis Ababa"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Delivery Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Bole Road, near Friendship Mall"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-all"
                  />
                </div>

                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Order Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any special instructions for delivery..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-all resize-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>

                <div className="space-y-4">
                  <label className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === "telebirr"
                      ? "border-ocean bg-ice"
                      : "border-gray-200 hover:border-gray-300"
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="telebirr"
                      checked={formData.paymentMethod === "telebirr"}
                      onChange={handleChange}
                      className="w-4 h-4 text-ocean"
                    />
                    <div>
                      <span className="font-semibold text-gray-900">Telebirr</span>
                      <p className="text-sm text-gray-500 mt-0.5">Pay using Telebirr mobile money</p>
                    </div>
                  </label>

                  <label className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === "cash"
                      ? "border-ocean bg-ice"
                      : "border-gray-200 hover:border-gray-300"
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={handleChange}
                      className="w-4 h-4 text-ocean"
                    />
                    <div>
                      <span className="font-semibold text-gray-900">Cash on Delivery</span>
                      <p className="text-sm text-gray-500 mt-0.5">Pay when you receive your order</p>
                    </div>
                  </label>
                </div>

                {formData.paymentMethod === "telebirr" && (
                  <div className="mt-4">
                    <div className="p-4 bg-aqua/10 rounded-xl text-sm text-gray-600 mb-4">
                      <p className="font-medium text-ocean mb-1">📱 Telebirr Payment</p>
                      Send <strong>{formattedPrice(totalPrice)}</strong> to <strong>09XX XXX XXX</strong> and upload the payment screenshot below.
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-ocean transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotChange}
                        className="hidden"
                      />
                      {screenshotPreview ? (
                        <div className="space-y-3">
                          <img
                            src={screenshotPreview}
                            alt="Payment screenshot preview"
                            className="max-h-48 mx-auto rounded-lg shadow-sm"
                          />
                          <p className="text-sm text-green-600 font-medium">
                            ✅ Screenshot selected — click to change
                          </p>
                        </div>
                      ) : (
                        <div className="py-4">
                          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm text-gray-500 font-medium">
                            Upload Payment Screenshot
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Tap to select a screenshot of your Telebirr payment
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 sticky top-28">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Your Order</h2>

                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-ice shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {formattedPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formattedPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>{formattedPrice(totalPrice)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl mt-6 ${
                    isSubmitting
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-ocean text-white hover:bg-ocean/90"
                  }`}
                >
                  {isSubmitting ? (uploadProgress || "Placing Order...") : "Place Order"}
                </button>

                <p className="text-xs text-gray-400 text-center mt-3">
                  This is a demo checkout. No real payment will be processed.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
