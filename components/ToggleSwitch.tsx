"use client";
import { Switch } from "@headlessui/react";
import { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

export default function ToggleSwitch({
  enabled = false,
  onChange,
  unmanaged,
  className,
}: {
  enabled?: boolean;
  onChange?: (enabled: boolean) => void;
  unmanaged?: boolean;
  className?: string;
}) {
  const [selfEnabled, setSelfEnabled] = useState(enabled);

  const enabledValue = unmanaged ? selfEnabled : enabled;

  return (
    <Switch
      checked={unmanaged ? selfEnabled : enabled}
      onChange={unmanaged ? setSelfEnabled : onChange}
      className={clsx(
        enabledValue ? "bg-sky-500" : "bg-gray-200",
        "relative inline-flex h-6 w-11 items-center rounded-full shadow-inner transition duration-300",
        className
      )}
    >
      <motion.span
        className={clsx(
          enabledValue ? "translate-x-6" : "translate-x-1",
          "inline-block h-4 w-4 transform rounded-full bg-white transition shadow"
        )}
        animate={{
          translateX: enabledValue ? 24 : 4,
          scale: enabledValue ? [0.1, 1] : [0.101, 1],
        }}
        transition={{
          duration: 0.1,
        }}
      />
    </Switch>
  );
}
