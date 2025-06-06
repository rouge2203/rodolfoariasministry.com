import React from "react";
import { PiWaveformBold } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";

interface NavigationBarProps {
  activeSection:
    | "section1"
    | "section2"
    | "section3"
    | "section4"
    | "section5"
    | "section6";
  scrollToSection: (
    sectionId:
      | "section1"
      | "section2"
      | "section3"
      | "section4"
      | "section5"
      | "section6"
  ) => void;
  isMobile?: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  activeSection,
  scrollToSection,
}) => {
  const navItems = [
    {
      id: "section1" as
        | "section1"
        | "section2"
        | "section3"
        | "section4"
        | "section5"
        | "section6",
      label: "Inicio",
    },
    {
      id: "section2" as
        | "section1"
        | "section2"
        | "section3"
        | "section4"
        | "section5"
        | "section6",
      label: "Mensajes",
    },
    {
      id: "section3" as
        | "section1"
        | "section2"
        | "section3"
        | "section4"
        | "section5"
        | "section6",
      label: "Biografía",
    },
    {
      id: "section4" as
        | "section1"
        | "section2"
        | "section3"
        | "section4"
        | "section5"
        | "section6",
      label: "Galería",
    },
    {
      id: "section5" as
        | "section1"
        | "section2"
        | "section3"
        | "section4"
        | "section5"
        | "section6",
      label: "Ministerio",
    },
    {
      id: "section6" as
        | "section1"
        | "section2"
        | "section3"
        | "section4"
        | "section5"
        | "section6",
      label: "Contacto",
    },
  ];

  const navBackgroundClass =
    activeSection === "section1" ? "bg-transparent" : "bg-transparent";

  return (
    <nav
      className={`fixed top-0 left-4 right-4 z-30 p-4 transition-all duration-300 ease-in-out 
                  flex items-center justify-between 
                  ${navBackgroundClass}`}
    >
      <div className="flex items-center">
        {/* You can use an actual image/logo here if you have one */}
        <PiWaveformBold
          className={`text-2xl ${
            activeSection === "section1" ? "text-black" : "text-black"
          }`}
        />
        <span
          className={`text-2xl font-bold tracking-tight ${
            activeSection === "section1" ? "text-black" : "text-black"
          } ml-2`}
        >
          Rodolfo Arias
        </span>
      </div>
      <div className="flex items-center space-x-4 ">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 cursor-pointer 
                        ${
                          activeSection === item.id
                            ? `${
                                activeSection === "section1"
                                  ? "text-black"
                                  : "text-black"
                              } underline underline-offset-4 decoration-2 decoration-black-500`
                            : `${
                                activeSection === "section1"
                                  ? "text-black hover:text-black/65"
                                  : "text-black hover:text-black/65"
                              }`
                        }
                       `}
          >
            {item.label}
          </button>
        ))}
        <MdOutlineEmail
          className={`text-2xl ${
            activeSection === "section1"
              ? "text-black cursor-pointer hover:text-black/65"
              : "text-black cursor-pointer hover:text-black/65"
          }`}
          onClick={() => scrollToSection("section6")}
        />
      </div>
    </nav>
  );
};

export default NavigationBar;
