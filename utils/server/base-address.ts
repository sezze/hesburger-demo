const baseAddress =
  process.env.VERCEL_URL ?? process.env.BASE_ADDRESS ?? "http://localhost:3000";

export default baseAddress;
