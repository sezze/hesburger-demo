import Product from "@/types/Product";
import { useQuery } from "@tanstack/react-query";

export function useSaturatedProducts<T>(productIds: (T & { id: string })[]) {
  const first = productIds[0]; // We only use one because this mock app only has one product

  const { data } = useQuery<Product, unknown, (Product & T)[]>(
    ["products", "brg123"],
    () =>
      fetch("/api/products/brg123").then(
        (res) => res.json() as Promise<Product>
      ),
    {
      // map the result to the first product
      select: (data) => [
        {
          ...first,
          ...data,
        },
      ],
    }
  );

  return productIds.length === 0 ? [] : data;
}
