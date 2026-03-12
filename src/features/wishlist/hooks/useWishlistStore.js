import { create } from "zustand";

const useWishlistStore = create((set, get) => ({
    items: [],

    addToWishlist: (product) => {
        const items = get().items;
        const exists = items.find((item) => item.id === product.id);
        if (exists) return;
        set({ items: [...items, product] });
    },

    // Partial implementation — students should complete this
    removeFromWishlist: (productId) => { // eslint-disable-line no-unused-vars
        // TODO: Implement removal logic
        const items = get().items;
        const updatedWishlist = items.filter(item => item.id !== productId);
        set({ items: updatedWishlist });
    },

    isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
    },
}));

export default useWishlistStore;
