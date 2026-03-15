import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../features/cart/hooks/useCartStore";

export default function CheckoutPage() {
    const items = useCartStore((s) => s.items);
    const clearCart = useCartStore((s) => s.clearCart);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zipCode: "",
        country: "",
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [touched, setTouched] = useState({});

    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const validateForm = (values) => {
        const errs = {};
        const trimmed = (v) => (typeof v === "string" ? v.trim() : v);

        if (!trimmed(values.firstName)) errs.firstName = "First name is required";
        else if (trimmed(values.firstName).length < 2) errs.firstName = "At least 2 characters";

        if (!trimmed(values.lastName)) errs.lastName = "Last name is required";
        else if (trimmed(values.lastName).length < 2) errs.lastName = "At least 2 characters";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!trimmed(values.email)) errs.email = "Email is required";
        else if (!emailRegex.test(trimmed(values.email))) errs.email = "Enter a valid email";

        // Phone: accept digits, spaces, dashes, parentheses, + prefix
        const phone = (values.phone || "").trim();
        const phoneAllowedRegex = /^\+?[\d\s\-()]+$/;
        const phoneDigits = phone.replace(/\D/g, "");
        if (!phone.length) errs.phone = "Phone is required";
        else if (!phoneAllowedRegex.test(phone)) errs.phone = "Use only digits, spaces, dashes, parentheses, and +";
        else if (phoneDigits.length < 10) errs.phone = "Enter a valid phone number (at least 10 digits)";

        if (!trimmed(values.address)) errs.address = "Address is required";
        else if (trimmed(values.address).length < 5) errs.address = "Enter a full address";

        if (!trimmed(values.city)) errs.city = "City is required";

        if (!trimmed(values.zipCode)) errs.zipCode = "ZIP code is required";
        else if (!/^[\w\s-]{3,12}$/.test(trimmed(values.zipCode))) errs.zipCode = "Enter a valid ZIP code";

        if (!trimmed(values.country)) errs.country = "Please select a country";

        return errs;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const valuesForValidation = { ...form, [name]: value };
        const nextErrors = validateForm(valuesForValidation);
        setErrors((prev) => ({ ...prev, [name]: nextErrors[name] ?? "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        const nextErrors = validateForm(form);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;
        clearCart();
        setOrderPlaced(true);
    };

    const showError = (field) => (submitted || touched[field]) && errors[field];

    const inputClass = (field) =>
        `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white ${
            showError(field) ? "border-red-500" : "border-gray-200"
        }`;

    if (orderPlaced) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        className="w-10 h-10 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Order Placed Successfully!
                </h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Thank you for your purchase. Your order has been confirmed and will be
                    shipped shortly.
                </p>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Your cart is empty
                </h2>
                <p className="text-gray-500 mb-6">
                    Add some items to your cart before checking out.
                </p>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                <p className="text-gray-500 mt-1">
                    Complete your order by filling in the details below
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Shipping Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">
                                Shipping Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={inputClass("firstName")}
                                        placeholder="John"
                                    />
                                    {showError("firstName") && (
                                        <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={inputClass("lastName")}
                                        placeholder="Doe"
                                    />
                                    {showError("lastName") && (
                                        <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={inputClass("email")}
                                        placeholder="john@example.com"
                                    />
                                    {showError("email") && (
                                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={inputClass("phone")}
                                        placeholder="+1 (555) 000-0000"
                                    />
                                    {showError("phone") && (
                                        <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                                    )}
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={inputClass("address")}
                                        placeholder="123 Main Street"
                                    />
                                    {showError("address") && (
                                        <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={inputClass("city")}
                                        placeholder="New York"
                                    />
                                    {showError("city") && (
                                        <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        ZIP Code
                                    </label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={form.zipCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={inputClass("zipCode")}
                                        placeholder="10001"
                                    />
                                    {showError("zipCode") && (
                                        <p className="mt-1 text-xs text-red-500">{errors.zipCode}</p>
                                    )}
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Country
                                    </label>
                                    <select
                                        name="country"
                                        value={form.country}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={inputClass("country")}
                                    >
                                        <option value="">Select country</option>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="DE">Germany</option>
                                        <option value="FR">France</option>
                                        <option value="AU">Australia</option>
                                    </select>
                                    {showError("country") && (
                                        <p className="mt-1 text-xs text-red-500">{errors.country}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Your Order
                            </h3>
                            <div className="divide-y divide-gray-50">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-3 py-3">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800 line-clamp-1">
                                                {item.title}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900 shrink-0">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-emerald-600">Free</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Tax</span>
                                    <span>${(totalPrice * 0.08).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                                    <span>Total</span>
                                    <span>${(totalPrice * 1.08).toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-6 w-full py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
