import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion";
import React, {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  itemClassName?: string;
  distance?: number;
  panelWidth?: number;
  baseItemSize?: number;
  dockMaxWidth?: number;
  magnification?: number;
  spring?: SpringOptions;
  position?: "left" | "right";
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseY: MotionValue;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
};

function DockItem({
  children,
  className = "",
  onClick,
  mouseY,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseY, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      y: 0,
      height: baseItemSize,
    };
    return val - rect.y - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full bg-[#060606] border-neutral-700 border-2 shadow-md ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return cloneElement(
            child as React.ReactElement<{ isHovered?: MotionValue<number> }>,
            {
              isHovered,
            }
          );
        }
        return child;
      })}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
  dockPosition?: "left" | "right";
};

function DockLabel({
  children,
  className = "",
  isHovered,
  dockPosition = "left",
}: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isHovered) {
      const unsubscribe = isHovered.on("change", (latest) => {
        setIsVisible(latest === 1);
      });
      return () => unsubscribe();
    }
    setIsVisible(false);
  }, [isHovered]);

  const positionClasses =
    dockPosition === "left"
      ? "left-full ml-3 top-1/2 -translate-y-1/2"
      : "right-full mr-3 top-1/2 -translate-y-1/2";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: dockPosition === "left" ? -10 : 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dockPosition === "left" ? -10 : 10 }}
          transition={{ duration: 0.2 }}
          className={`${className} ${positionClasses} absolute w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#060606] px-2 py-0.5 text-xs text-white`}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockIcon({ children, className = "" }: DockIconProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

export default function Dock({
  items,
  className = "",
  itemClassName = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 100,
  panelWidth = 64,
  dockMaxWidth = 256,
  baseItemSize = 50,
  position = "left",
}: DockProps) {
  const mouseY = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxWidthCalc = useMemo(
    () => Math.max(dockMaxWidth, magnification + magnification / 2 + 4),
    [dockMaxWidth, magnification]
  );
  const widthRow = useTransform(isHovered, [0, 1], [panelWidth, maxWidthCalc]);
  const currentWidth = useSpring(widthRow, spring);

  const dockPositionClasses =
    position === "left"
      ? "left-4 top-5/12 lg:-translate-y-3/6 xl:-translate-y-1/2 -translate-y-6/12"
      : "right-4 top-1/2 -translate-y-1/2";

  return (
    <motion.div
      style={{ scrollbarWidth: "none" }}
      className={`fixed ${dockPositionClasses} h-fit flex flex-col items-center z-50`}
    >
      <motion.div
        onMouseMove={({ clientY }) => {
          isHovered.set(1);
          mouseY.set(clientY);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseY.set(Infinity);
        }}
        className={`${className} flex flex-col items-center w-fit gap-3 rounded-2xl border-neutral-700 border-2 py-4 px-2`}
        style={{ width: panelWidth }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={itemClassName || item.className}
            mouseY={mouseY}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel dockPosition={position}>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
