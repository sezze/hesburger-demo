"use client";

import { useSaturatedProducts } from "@/hooks/app/use-saturated-products";
import { useIsFirstRender } from "@/hooks/utils";
import { useCartStore } from "@/store/cart";
import { formatCurrency } from "@/utils/format-currency";
import { Popover } from "@headlessui/react";
import { ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";

export default function CartPopover() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clear);

  let saturatedItems = useSaturatedProducts(items);

  const isFirstRender = useIsFirstRender(true);

  const totalCost = useMemo(
    () =>
      saturatedItems
        ? saturatedItems.reduce((acc, item) => acc + item.count * item.price, 0)
        : 0,
    [saturatedItems]
  );

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 text-white">
            <ShoppingBagIcon className="w-6 h-6" />
            {!isFirstRender && items.length > 0 && (
              <motion.span
                className="absolute top-0 right-0 block w-3 h-3 bg-red-500 rounded-full"
                animate={{
                  scale: [0, 1],
                }}
              />
            )}
          </Popover.Button>
          <AnimatePresence>
            {open && (
              <Popover.Panel
                className="absolute right-0 z-10 w-96 p-4 mt-2 bg-white rounded-2xl shadow-lg"
                as={motion.div}
                static
                initial={{ opacity: 0, scale: 0.9, originY: 0, originX: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Ostoskori</h2>
                    <button
                      className="text-gray-400 hover:text-gray-500"
                      onClick={clearCart}
                    >
                      Tyhjennä
                    </button>
                  </div>
                  <div className="flex flex-col mt-4 space-y-4">
                    <AnimatePresence mode="wait" initial={false}>
                      {saturatedItems ? (
                        saturatedItems.length === 0 ? (
                          <motion.span
                            key="_empty_"
                            className="font-normal text-slate-500"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                          >
                            Oho! Ostoskorisi on tyhjä, meneppä valitsemaan
                            jotain!
                          </motion.span>
                        ) : (
                          saturatedItems.map((item) => (
                            <motion.div
                              className="flex items-center justify-between"
                              key={item.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                  <Image
                                    className="w-20 h-20 rounded-lg"
                                    src={item.image}
                                    alt={item.name}
                                    width={80}
                                    height={80}
                                    sizes="80px"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">
                                      {item.name}
                                    </h3>
                                  </div>
                                  <p className="text-sm text-gray-500">
                                    {item.count} × {formatCurrency(item.price)}
                                  </p>
                                </div>
                              </div>
                              <button
                                className="text-gray-400 hover:text-gray-500"
                                onClick={() => removeItem(item.id)}
                              >
                                <span className="sr-only">Remove</span>
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            </motion.div>
                          ))
                        )
                      ) : (
                        <span key="_loading_">Loading...</span>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <p className="text-sm font-medium text-gray-900">
                      Yhteensä
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(totalCost)}
                    </p>
                  </div>
                  <a
                    href="#"
                    className="flex items-center justify-center w-full px-6 py-3 mt-6 transition font-semibold text-white bg-sky-500 rounded-md hover:bg-sky-600"
                  >
                    Siirry kassalle
                  </a>
                </div>
              </Popover.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
}
