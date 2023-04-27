let baseAddress =
  process.env.VERCEL_URL ?? process.env.BASE_ADDRESS ?? "http://localhost:3000";

if (!baseAddress.startsWith("http")) {
  baseAddress = `https://${baseAddress}`;
}

export default baseAddress;
