import { create } from "zustand";

const MAX_COMPARE_ITEMS = 2;

const useCompareStore = create((set, get) => ({
    items: [],

    addToCompare: (product) => {
        const items = get().items;
        const exists = items.some((item) => item.id === product.id);
        if (exists) return;
        if (items.length >= MAX_COMPARE_ITEMS) {
            set({ items: [...items.slice(1), product] });
        } else {
            set({ items: [...items, product] });
        }
    },

    removeFromCompare: (productId) => {
        set({
            items: get().items.filter((item) => item.id !== productId),
        });
    },

    setCompareSlot: (index, product) => {
        const items = [...get().items];
        const existing = items.findIndex((item) => item.id === product.id);
        if (existing >= 0) items.splice(existing, 1);
        items[index] = product;
        set({ items: items.slice(0, MAX_COMPARE_ITEMS) });
    },

    clearCompareSlot: (index) => {
        const items = get().items.filter((_, i) => i !== index);
        set({ items });
    },

    isInCompare: (productId) => {
        return get().items.some((item) => item.id === productId);
    },

    clearCompare: () => set({ items: [] }),
}));

export default useCompareStore;
