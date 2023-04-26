import { useStoredProducts } from "@/store/products";
import { useEffectOnce } from "react-use";

export default function useProducts() {
  const products = useStoredProducts((s) => s.products);
  const setProducts = useStoredProducts((s) => s.setProducts);

  useEffectOnce(() => {
    if (products.length > 0) return;

    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  });

  return products;
}
