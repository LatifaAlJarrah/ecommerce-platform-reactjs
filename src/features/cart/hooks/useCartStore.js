import { create } from "zustand";

const useCartStore = create((set, get) => ({
    items: [],

    addToCart: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
            // Prevent exceeding stock
            if (existingItem.quantity >= product.stock) return;
            set({
                items: items.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            });
        } else {
            set({
                items: [...items, { ...product, quantity: 1 }],
            });
        }
    },

    removeFromCart: (productId) => {
        set({
            items: get().items.filter((item) => item.id !== productId),
        });
    },

    updateQuantity: (productId, newQuantity) => {
        const items = get().items;
        const item = items.find((i) => i.id === productId);

        if (!item) return;

        if (newQuantity < 1) return;
        if (newQuantity > item.stock) return;

        set({
            items: items.map((i) =>
                i.id === productId ? { ...i, quantity: newQuantity } : i
            ),
        });
    },

    clearCart: () => set({ items: [] }),

    get totalItems() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
    },

    get totalPrice() {
        return get().items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    },

    getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
    },

    getTotalPrice: () => {
        return get().items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    },
}));

export default useCartStore;
