"use client";
import { useState } from "react";
import clsx from "clsx";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { motion, AnimatePresence } from "framer-motion";
import { usePrevious } from "react-use";

const variants = {
  visible: {
    rotateY: 0,
    opacity: 1,
  },
  exit: (x?: number) =>
    x === undefined
      ? {}
      : {
          rotateY: x ? -90 : 90,
          opacity: 0,
        },
};

export default function CountInput({
  count = 1,
  onChange,
  unmanaged,
  min,
  max,
  className,
}: {
  count?: number;
  onChange?: (count: number) => void;
  unmanaged?: boolean;
  min?: number;
  max?: number;
  className?: string;
}) {
  const [selfCount, setSelfCount] = useState(count);
  const prevNumber = usePrevious(selfCount) ?? 0;

  const countValue = unmanaged ? selfCount : count;

  const handleCountChange = (count: number) => {
    if (min && count < min) count = min;
    if (max && count > max) count = max;

    if (unmanaged) setSelfCount(count);
    else onChange?.(count);
  };

  return (
    <div className={clsx("flex items-center relative", className)}>
      <button
        className={clsx(
          "p-1 disabled:text-gray-500 rounded-full transition",
          countValue === 1 ? "text-red-500" : "text-sky-500"
        )}
        onClick={() => handleCountChange(countValue - 1)}
        disabled={min !== undefined && countValue <= min}
      >
        <MinusIcon className="w-8 h-8" />
      </button>
      <div
        className="relative flex items-center justify-center w-10 h-full"
        style={{ perspective: 300 }}
      >
        <AnimatePresence initial={false} custom={prevNumber < countValue}>
          <motion.span
            className="mx-1 text-lg pointer-events-none absolute"
            key={countValue}
            variants={variants}
            initial={{
              rotateY: prevNumber < countValue ? 90 : -90,
              opacity: 0,
            }}
            style={{
              transformOrigin: "50% 50% -20px",
            }}
            exit="exit"
            animate="visible"
            transition={{ duration: 0.3 }}
          >
            {countValue}
          </motion.span>
        </AnimatePresence>
      </div>
      <button
        className="p-1 text-sky-500 rounded-full"
        onClick={() => handleCountChange(countValue + 1)}
      >
        <PlusIcon className="w-8 h-8" />
      </button>
    </div>
  );
}
