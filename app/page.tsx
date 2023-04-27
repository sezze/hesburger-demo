import Image from "next/image";
import CartPopover from "@/app/CartPopover";
import CustomizationSection from "./CustomizationSection";
import ClientProviders from "./ClientProviders";
import { fetchProduct } from "@/utils/server/fetch-products";
import { formatCurrency } from "@/utils/format-currency";
import GithubIcon from "@/components/icons/GithubIcon";

export default async function Home() {
  const product = await fetchProduct("brg123");

  return (
    <ClientProviders>
      <main className="grid grid-rows-[auto_1fr_auto] lg:grid-cols-2 lg:gap-4 min-h-screen tracking-tight font-semibold">
        <div className="fixed inset-0 bg-[url('/pattern-bg.webp')] bg-[length:512px] -z-10" />
        <section className="flex justify-between mx-4 my-6 lg:col-span-2">
          <div className="flex flex-col">
            <h1 className="uppercase font-extrabold text-3xl sm:text-5xl lg:text-7xl tracking-tighter">
              {product.name}
            </h1>
            <p className="font-bold text-sky-400 text-5xl sm:text-6xl lg:text-7xl tracking-tighter">
              {formatCurrency(product.price)}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/sezze/hesburger-demo"
                className="text-sm font-semibold text-gray-400 hover:text-gray-500"
              >
                <GithubIcon className="fill-current transition" />
              </a>
              <CartPopover />
            </div>
          </div>
        </section>
        <section className="grow flex justify-center items-center lg:justify-self-end">
          <Image
            className="drop-shadow-2xl sm:h-[40vh] sm:w-auto sm:min-h-[300px] h-auto w-96"
            src="/kerroshampurilainen.webp"
            alt="Kerroshampurilainen"
            width={512}
            height={512}
            sizes="(max-width: 640px) 100vw, 640px"
          />
        </section>
        <CustomizationSection />
      </main>
    </ClientProviders>
  );
}
