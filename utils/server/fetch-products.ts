import Product from "@/types/Product";
import baseAddress from "./base-address";

export function fetchProduct(id: string): Promise<Product> {
  return fetch(`${baseAddress}/api/products/${id}`).then((res) => res.json());
}
