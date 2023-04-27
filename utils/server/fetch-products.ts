import Product from "@/types/Product";

export function fetchProduct(id: string): Promise<Product> {
  // Return a static product and mock the time it takes to fetch it
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "brg123",
        name: "Kerrosateria",
        image: "/kerroshampurilainen.webp",
        price: 9.99,
      });
    }, 30);
  });
}
