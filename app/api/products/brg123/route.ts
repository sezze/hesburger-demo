import { fetchProduct } from "@/utils/server/fetch-products";

export async function GET(request: Request) {
  return new Response(JSON.stringify(await fetchProduct("brg123")));
}
