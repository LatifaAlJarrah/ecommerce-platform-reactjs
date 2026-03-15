import { Link } from "react-router-dom";
import useCartStore from "../features/cart/hooks/useCartStore";

export default function CartPage() {
    const items = useCartStore((s) => s.items);
    const updateQuantity = useCartStore((s) => s.updateQuantity);
    const removeFromCart = useCartStore((s) => s.removeFromCart);
    const clearCart = useCartStore((s) => s.clearCart);

    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <svg
                    className="w-24 h-24 text-gray-200 mx-auto mb-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                </svg>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Your cart is empty
                </h2>
                <p className="text-gray-500 mb-6">
                    Looks like you haven&apos;t added any items yet.
                </p>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                    <p className="text-gray-500 mt-1">
                        {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
                    </p>
                </div>
                <button
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                    Clear All
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4"
                        >
                            <Link
                                to={`/products/${item.id}`}
                                className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0"
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </Link>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <Link
                                            to={`/products/${item.id}`}
                                            className="font-semibold text-gray-800 hover:text-primary-600 transition-colors line-clamp-1"
                                        >
                                            {item.title}
                                        </Link>
                                        <p className="text-sm text-gray-500 mt-0.5">
                                            {item.category}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-1 items-center justify-between mt-3">
                                    <div className="flex items-center border border-gray-200 rounded-lg">
                                        {/* BUG: Quantity can go to 0 or negative */}
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity - 1)
                                            }
                                            disabled={item.quantity <= 1}
                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary-600 transition-colors disabled:text-gray-300 disabled:cursor-not-allowed"
                                        >
                                            −
                                        </button>
                                        <span className="w-10 text-center text-sm font-medium text-gray-800">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity + 1)
                                            }
                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary-600 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="font-bold text-gray-900">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Order Summary
                        </h3>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal ({totalItems} items)</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Shipping</span>
                                <span className="text-emerald-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Tax</span>
                                <span>${(totalPrice * 0.08).toFixed(2)}</span>
                            </div>
                            <div className="border-t border-gray-100 pt-3 flex justify-between">
                                <span className="font-bold text-gray-900">Total</span>
                                <span className="font-bold text-gray-900 text-lg">
                                    ${(totalPrice * 1.08).toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <Link
                            to="/checkout"
                            className="block w-full py-3.5 bg-primary-600 text-white text-center font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                        >
                            Proceed to Checkout
                        </Link>
                        <Link
                            to="/products"
                            className="block w-full mt-3 py-3 text-center text-sm text-primary-600 font-medium hover:text-primary-700 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
