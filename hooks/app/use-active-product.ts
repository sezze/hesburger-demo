import Product from "@/types/Product";
import { useQuery } from "@tanstack/react-query";

export function useActiveProduct() {
  return useQuery<Product>(["products", "brg123"], () =>
    fetch("/api/products/brg123").then((res) => res.json() as Promise<Product>)
  );
}
