import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Products {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

interface Product {
  name: string;
}

export const useStoredProducts = create<Products>()(
  devtools(
    (set) => ({
      products: [],
      setProducts: (products: Product[]) => set({ products }),
    }),
    {
      name: "products",
    }
  )
);
