import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Cart {
  items: {
    id: string;
    count: number;
  }[];
  addItem: (id: string, count: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useCartStore = create<Cart>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        addItem: (id, count) =>
          set(
            produce((state: Cart) => {
              const item = state.items.find((item) => item.id === id);
              if (item) {
                item.count += count;
              } else {
                state.items.push({ id, count });
              }
            })
          ),
        removeItem: (id) =>
          set(
            produce((state: Cart) => {
              const itemIndex = state.items.findIndex((item) => item.id === id);
              if (itemIndex !== -1) {
                state.items.splice(itemIndex, 1);
              }
            })
          ),
        clear: () =>
          set(
            produce((state: Cart) => {
              state.items = [];
            })
          ),
      }),
      {
        name: "cart",
      }
    )
  )
);
