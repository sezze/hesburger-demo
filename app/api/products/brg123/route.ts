import Product from "@/types/Product";

export async function GET(request: Request) {
  return new Response(
    JSON.stringify({
      id: "brg123",
      name: "Kerrosateria",
      image: "/kerroshampurilainen.webp",
      price: 9.99,
    } satisfies Product)
  );
}
