import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { FaChevronUp } from "react-icons/fa6";
import { useState } from "react";
import { PiLinkSimpleBold } from "react-icons/pi";

export const FloatingDockMobileCustom = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(true); // Open by default

  return (
    <div className="fixed top-3 right-4 z-110">
      <div className="flex items-center justify-center">
        <div className={cn("flex items-center gap-2", className)}>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-12 w-12 items-center shadow-sm justify-center rounded-full bg-white/75 gap-4"
          >
            {open ? (
              <FaChevronUp className="h-5 w-5 text-neutral-500" />
            ) : (
              <PiLinkSimpleBold className="h-5 w-5 text-black" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              layoutId="socialNav"
              className="absolute right-0 top-full mt-5 flex flex-col gap-2"
            >
              {items.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity: 1,
                    y: -10,
                    transition: {
                      delay: idx * 0.05,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 0,
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                >
                  <a
                    href={item.href}
                    key={item.title}
                    className="flex h-12 w-12 shadow-md items-center justify-center rounded-full bg-white/95"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center justify-center">
                      {item.icon}
                    </div>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
