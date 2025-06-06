import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { PiHandWaving } from "react-icons/pi";

interface NextSectionIndicatorProps {
  nextSectionName: string;
  onClick?: () => void;
  textColor?: "light" | "dark";
  show?: boolean;
}

const NextSectionIndicator: React.FC<NextSectionIndicatorProps> = ({
  nextSectionName,
  onClick,
  textColor = "dark",
  show = true,
}) => {
  const colorClasses = textColor === "light" ? "text-white" : "text-black";

  return (
    <div
      className={`fixed z-120 bottom-8 right-8 flex flex-col items-center cursor-pointer group transition-all duration-300 hover:transform hover:-translate-y-1 ${colorClasses} ${
        show ? "opacity-100 animate-fade-in" : "opacity-0 animate-fade-out"
      }`}
      onClick={onClick}
    >
      {/* Vertical text */}
      <div
        className="flex flex-col items-center mb-4"
        style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
      >
        <span className="text-sm font-medium tracking-widest uppercase">
          {nextSectionName}
        </span>
      </div>

      {/* Arrow */}
      {nextSectionName != "DIOS TE BENDIGA" ? (
        <div className="animate-bounce">
          <BsChevronDown className="w-6 h-6 group-hover:w-7 group-hover:h-7 transition-all duration-300 text-black" />
        </div>
      ) : (
        <div className="animate-wiggle-more animate-infinite">
          <PiHandWaving className="w-6 h-6 group-hover:w-7 group-hover:h-7 transition-all duration-300 text-black" />
        </div>
      )}
    </div>
  );
};

export default NextSectionIndicator;
