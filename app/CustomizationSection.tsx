"use client";

import CountInput from "@/components/CountInput";
import ToggleSwitch from "@/components/ToggleSwitch";
import { useCartStore } from "@/store/cart";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { motion } from "framer-motion";
import { useActiveProduct } from "@/hooks/app/use-active-product";

const DEFAULT_BUTTON_TEXT = "Lisää ostoskoriin";

export default function CustomizationSection() {
  const addToCart = useCartStore((s) => s.addItem);
  const [canAddToCart, setCanAddToCart] = useState(true);
  const [buttonText, setButtonText] = useState(DEFAULT_BUTTON_TEXT);

  const { data: activeProduct } = useActiveProduct();

  const handleAddToCart = () => {
    if (!activeProduct) return;

    addToCart(activeProduct.id, 1); // TODO: Get the actual count number

    setCanAddToCart(false);
    setButtonText("Lisätty!");
    setTimeout(() => {
      setCanAddToCart(true);
      setButtonText(DEFAULT_BUTTON_TEXT);
    }, 1000);
  };

  return (
    <section className="flex flex-col sm:bg-white sm:border-t-2 border-slate-100 sm:shadow-xl sm:rounded-2xl overflow-hidden sm:w-96 sm:mb-4 sm:place-self-center lg:justify-self-start">
      <div className="grid grid-cols-[1fr,auto] mx-4 my-6 items-center">
        <div className="text-lg">Kappalemäärä</div>
        <CountInput unmanaged min={0} className="justify-self-end" />
        <div className="flex flex-col">
          <span className="text-lg">Isommat ranskalaiset</span>{" "}
          <span className="font-bold -mt-2">+0,50 €</span>
        </div>
        <ToggleSwitch unmanaged className="justify-self-end" />
        <div className="flex flex-col">
          <span className="text-lg">Isompi juoma</span>{" "}
          <span className="font-bold -mt-2">+0,50 €</span>
        </div>
        <ToggleSwitch unmanaged className="justify-self-end" />
      </div>
      <button
        className="relative text-white font-extrabold text-lg uppercase overflow-hidden"
        onClick={handleAddToCart}
        disabled={!canAddToCart}
        style={
          {
            "--bg-color":
              buttonText === DEFAULT_BUTTON_TEXT
                ? "rgb(14 165 233)"
                : "rgb(34 197 94)",
          } as React.CSSProperties
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="8"
          className="transition duration-500 fill-[var(--bg-color)]"
        >
          <defs>
            <pattern
              id="bg"
              patternUnits="userSpaceOnUse"
              width="12"
              height="8"
            >
              <path d="M 0 9 L 12 9 L 6 0 Z" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg)" />
        </svg>
        <div className="p-4 pt-3 transition duration-500 bg-[var(--bg-color)] flex items-center justify-center h-16">
          <AnimatePresence initial={false}>
            <motion.span
              className="absolute"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", bounce: 0.25 }}
              key={buttonText}
            >
              {buttonText}
            </motion.span>
          </AnimatePresence>
        </div>
      </button>
    </section>
  );
}
