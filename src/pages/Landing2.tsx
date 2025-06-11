import { useState, useEffect } from "react";
import { AuroraBackground } from "../components/aceternity/aurora-background";
import ImageRodolfo3 from "../assets/rodolfo-image3.png";
import ImagePaperPlane from "../assets/paper-planes.png";
import ImageBoat from "../assets/paper-boat.png";
import ImagePuravida from "../assets/puravidafm.png";
import ImageGraciaPlus from "../assets/graciaplus.png";
import ImageTiktok from "../assets/rodolfotiktok.png";
import ImageLobster from "../assets/lobsterlabs_logo.png";
import Folder from "../components/reactbits/folder";
import Dock from "../components/reactbits/dock";
import InfiniteMenu from "../components/reactbits/infinite-menu";
import { MdOutlineEmail, MdMenu, MdClose } from "react-icons/md";
import {
  BiSolidBible,
  BiSolidHome,
  BiSolidUserPin,
  BiSolidCamera,
  BiSolidChurch,
  BiSolidIdCard,
  BiGlobe,
  BiRightArrowAlt,
  BiEnvelope,
  BiSolidMessageDetail,
} from "react-icons/bi";

import { PiWaveformBold } from "react-icons/pi";
import { motion, AnimatePresence } from "motion/react";
import {
  BiLogoInstagramAlt,
  BiLogoFacebookCircle,
  BiLogoTiktok,
  BiLogoYoutube,
  BiLogoSpotify,
  BiLogoPaypal,
  BiLogoAndroid,
  BiLogoApple,
} from "react-icons/bi";
import CustomIcon from "../components/mine/custom-icon-graciaplus";
import { FloatingDockMobileCustom } from "../components/aceternity/dock-mobile-custom";
import NextSectionIndicator from "../components/mine/next-section-indicator";

const Landing2 = () => {
  const [activeTab, setActiveTab] = useState<
    "section1" | "section2" | "section3" | "section4" | "section5" | "section6"
  >("section1");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentMobileSection, setCurrentMobileSection] = useState<
    "section1" | "section2" | "section3" | "section4" | "section5" | "section6"
  >("section1");

  //Classname for dock items
  const dockItemClassName = `text-black bg-transparent  shadow-lg text-xl hover:text-2xl hover:size-7 border-none cursor-pointer ${
    activeTab === "section2" || activeTab === "section3"
      ? "text-black shadow-black/25 shadow-xs hover:shadow-xl"
      : "hover:shadow-lg hover:shadow-black/25"
  }`;

  const dockItems = [
    {
      icon: <BiLogoFacebookCircle />,
      label: "Facebook",
      onClick: () => window.open("https://facebook.com", "_blank"),
      className: dockItemClassName,
    },
    {
      icon: <BiLogoInstagramAlt />,
      label: "Instagram",
      onClick: () => window.open("https://instagram.com", "_blank"),
      className: dockItemClassName,
    },

    {
      icon: <BiLogoTiktok />,
      label: "Tiktok",
      onClick: () => window.open("https://tiktok.com", "_blank"),
      className: dockItemClassName,
    },
    {
      icon: <BiLogoYoutube />,
      label: "Youtube",
      onClick: () => window.open("https://youtube.com", "_blank"),
      className: dockItemClassName,
    },
    {
      icon: <BiLogoSpotify />,
      label: "Spotify",
      onClick: () => window.open("https://spotify.com", "_blank"),
      className: dockItemClassName,
    },
    {
      icon: <BiLogoPaypal />,
      label: "Paypal",
      onClick: () => window.open("https://paypal.com", "_blank"),
      className: dockItemClassName,
    },
    {
      icon: <CustomIcon />,
      label: "Gracia Plus",
      onClick: () => window.open("https://graciaplus.com", "_blank"),
      className: dockItemClassName,
    },
  ];

  const dockMobileItems = [
    {
      icon: <BiLogoFacebookCircle className="text-xl" />,
      title: "Facebook",
      href: "https://facebook.com",
    },
    {
      icon: <BiLogoInstagramAlt className="text-xl" />,
      title: "Instagram",
      href: "https://instagram.com",
    },

    {
      icon: <BiLogoTiktok className="text-xl" />,
      title: "Tiktok",
      href: "https://tiktok.com",
    },
    {
      icon: <BiLogoYoutube className="text-xl" />,
      title: "Youtube",
      href: "https://youtube.com",
    },
    {
      icon: <BiLogoSpotify className="text-xl" />,
      title: "Spotify",
      href: "https://spotify.com",
    },
    {
      icon: <BiLogoPaypal className="text-xl" />,
      title: "Paypal",
      href: "https://paypal.com",
    },
    {
      icon: <CustomIcon className="text-xl" />,
      title: "Gracia Plus",
      href: "https://graciaplus.com",
    },
  ];

  const videoEmbeds = [
    "https://www.youtube.com/embed/hafl3je4T7c",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/5NV6Rdv1a3I",
    "https://www.youtube.com/embed/hafl3je4T7c",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/5NV6Rdv1a3I",
    // …etc
  ];

  const infiniteMenuItems = [
    {
      image:
        "https://mafisa-group-assets.nyc3.cdn.digitaloceanspaces.com/puravidafm/fofo&mike.jpg",
      link: "https://www.facebook.com/RodolfoAriasMinistry",
      title: "",
      description: "",
    },
    {
      image:
        "https://mafisa-group-assets.nyc3.cdn.digitaloceanspaces.com/puravidafm/fofo&mike.jpg",
      link: "https://www.facebook.com/RodolfoAriasMinistry",
      title: "",
      description: "",
    },
    {
      image:
        "https://mafisa-group-assets.nyc3.cdn.digitaloceanspaces.com/puravidafm/fofo&rastas.jpg",
      link: "https://www.facebook.com/RodolfoAriasMinistryhttps://google.com/",
      title: "Item 3",
      description: "",
    },
    {
      image:
        "https://mafisa-group-assets.nyc3.cdn.digitaloceanspaces.com/puravidafm/fofo_cabina.jpg",
      link: "https://www.facebook.com/RodolfoAriasMinistry",
      title: "",
      description: "",
    },
    {
      image:
        "https://mafisa-group-assets.nyc3.cdn.digitaloceanspaces.com/puravidafm/fofo_grupal.jpg",
      link: "https://www.facebook.com/RodolfoAriasMinistry",
      title: "",
      description: "",
    },
    {
      image:
        "https://mafisa-group-assets.nyc3.cdn.digitaloceanspaces.com/puravidafm/rodolfo&gorra.png",
      link: "https://www.facebook.com/RodolfoAriasMinistry",
      title: "",
      description: "",
    },
  ];

  const tabs = [
    { id: "section1", title: "Inicio" },
    { id: "section2", title: "Mensajes" },
    { id: "section3", title: "Biografía" },
    { id: "section4", title: "Galería" },
    { id: "section5", title: "Ministerio" },
    { id: "section6", title: "Contacto" },
  ];

  const mobileNavItems = [
    { id: "section1", icon: BiSolidHome, label: "Inicio" },
    { id: "section2", icon: BiSolidBible, label: "Mensajes" },
    { id: "section3", icon: BiSolidUserPin, label: "Biografía" },
    { id: "section4", icon: BiSolidCamera, label: "Galería" },
    { id: "section5", icon: BiSolidChurch, label: "Ministerio" },
    { id: "section6", icon: BiSolidIdCard, label: "Contacto" },
  ];

  // Create scrollable sections for mobile
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Get next section for mobile navigation
  const getNextSection = (currentSection: string) => {
    const sectionOrder = [
      "section1",
      "section2",
      "section3",
      "section4",
      "section5",
      "section6",
    ];
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex < sectionOrder.length - 1) {
      return sectionOrder[currentIndex + 1];
    }
    return null; // Last section
  };

  // Get next section name for display
  const getNextSectionName = (currentSection: string) => {
    const nextSection = getNextSection(currentSection);
    const sectionNames = {
      section2: "MENSAJES",
      section3: "BIOGRAFÍA",
      section4: "GALERÍA",
      section5: "MINISTERIO",
      section6: "CONTACTO",
    };

    if (!nextSection) {
      return "DIOS TE BENDIGA";
    }
    return sectionNames[nextSection as keyof typeof sectionNames];
  };

  // Handle next section navigation
  const handleNextSection = () => {
    const nextSection = getNextSection(currentMobileSection);
    if (nextSection) {
      scrollToSection(`mobile-${nextSection}`);
      setCurrentMobileSection(nextSection as typeof currentMobileSection);
    }
  };

  // Set up intersection observer for mobile sections
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Only set up observer for mobile (when window width is less than 1280px)
    const setupObserver = () => {
      if (window.innerWidth >= 1280) return; // xl breakpoint

      const sectionIds = [
        "section1",
        "section2",
        "section3",
        "section4",
        "section5",
        "section6",
      ];

      sectionIds.forEach((sectionId) => {
        const element = document.getElementById(`mobile-${sectionId}`);
        if (element) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  setCurrentMobileSection(
                    sectionId as typeof currentMobileSection
                  );
                }
              });
            },
            { threshold: 0.5 }
          );
          observer.observe(element);
          observers.push(observer);
        }
      });
    };

    setupObserver();

    // Clean up observers
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "section1":
        return (
          <div
            className={`pt-20 sm:pt-10 sm:pl-10 xl:pt-16 xl:pl-50 sm:flex-row  flex flex-col relative z-20 w-full  h-screen text-center `}
          >
            <div className="sm:self-stretch  sm:w-5/12 sm:flex-col xl:self-stretch  xl:w-5/12 xl:flex-col ">
              <div className=" flex flex-col  sm:mt-[25%]  px-6 sm:px-0    sm:justify-start sm:items-end items-center justify-center ">
                <h1 className="text-3xl lg:text-6xl xl:text-7xl  text-center sm:text-left font-bold text-black mb-2  ">
                  Rodolfo Arias
                  <p className="text-base lg:text-lg xl:text-xl sm:text-left sm:max-w-none text-center font-extralight tracking-tight text-black max-w-2xl">
                    Predicador apasionado por la palabra de Dios con un mensaje{" "}
                    <br className="hidden xl:block" />
                    de fe, esperanza y motivación.
                  </p>
                  <div className="mx-auto sm:mx-0  w-2/8 sm:w-1/6 h-1 mt-5 bg-black rounded-md " />
                </h1>
              </div>
            </div>
            <div className="  sm:absolute sm:top-0 sm:right-0 sm:w-9/12 sm:h-full xl:relative xl:flex-1 flex-1">
              <img
                src={ImageRodolfo3}
                alt="Rodolfo"
                className="w-full h-full object-cover sm:object-cover 2xl:object-contain "
              />
            </div>
          </div>
        );
      case "section2":
        return (
          <div
            className={`flex flex-col sm:flex-row items-start md:pt-25  w-screen  min-h-screen text-center `}
          >
            <div className="relative z-10 container mx-auto pt-5">
              <img
                src={ImagePaperPlane}
                alt="Paper Plane"
                className=" w-55 sm:w-65 md:w-70 mx-auto"
              />

              <div className="mt-16 w-full flex">
                <div className="flex flex-col w-1/2 flex-1 px-6 md:py-10 ">
                  <iframe
                    src="https://www.youtube.com/embed/hafl3je4T7c"
                    className="md:hidden w-full h-full rounded-lg aspect-video mb-10 md:mb-0"
                  ></iframe>
                  <h1 className="text-black text-sm md:text-lg tracking-tight font-medium text-start">
                    Mi último mensaje
                  </h1>
                  <h1 className="text-black text-3xl md:text-5xl tracking-tight font-bold text-start">
                    Dios te bendiga en tu peor momento
                  </h1>
                  <p className="text-black text-sm tracking-tight font-light mt-4 text-start w-10/12  ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, for example, when you are going through a
                    difficult time, you can find comfort in the fact that God is
                    with you.
                  </p>
                  <div className="bg-transparent py-10  rounded-lg flex space-x-4 ">
                    <Folder size={1} color="#1e202e" items={videoEmbeds} />
                    <Folder size={1} color="#1e202e" items={videoEmbeds} />
                  </div>
                </div>
                <iframe
                  src="https://www.youtube.com/embed/hafl3je4T7c"
                  className="hidden md:block w-1/2 h-full rounded-lg aspect-video"
                ></iframe>
              </div>
            </div>
          </div>
        );
      case "section3":
        return (
          <div
            className={`flex flex-col sm:flex-row   pt-25  w-screen px-2 md:px-0   min-h-screen text-center `}
          >
            <div className=" z-10 pt-5  w-full ">
              <img
                src={ImageBoat}
                alt="Paper Boat"
                className=" w-65 sm:w-65 md:w-70 mx-auto mb-10"
              />
              <div className="p-10 bg-white/10 backdrop-blur-6xl ring-1 ring-black/5 shadow-xl rounded-lg w-4/6 justify-center items-center mx-auto mt-6">
                <h1 className="text-black text-center text-3xl md:text-5xl tracking-tight font-bold">
                  Acerca del Ministerio
                </h1>
                <h3 className="text-black text-sm tracking-tight font-light mt-4 text-center  ">
                  "Neque porro quisquam est qui dolorem ipsum quia dolor sit
                  amet, consectetur, adipisci velit..."
                </h3>
                <p className="text-black text-sm tracking-tight font-light  mt-4 text-justify w-full md:w-10/12 mx-auto  ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  augue nibh, laoreet vel lacus lacinia, faucibus consectetur
                  libero. In finibus magna eu convallis consectetur. Donec eget
                  consectetur urna. Etiam feugiat sapien eu ligula blandit
                  porttitor. In hac habitasse platea dictumst. Maecenas sed diam
                  et ex sagittis consectetur et sit amet felis. Integer
                  ultricies, eros a fermentum tristique, libero leo lacinia
                  justo, eget molestie enim tortor non nulla. Nunc sed interdum
                  est. Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia curae; Maecenas erat mauris, tempor
                  aliquet odio eget, facilisis pharetra ipsum. Morbi mattis
                  interdum porta. Maecenas semper tincidunt ipsum, id hendrerit
                  metus semper non. Suspendisse sed justo vitae augue pretium
                  iaculis. Donec tempus ipsum nec nibh ultrices sagittis.
                  Vestibulum congue eget velit a pharetra. Duis nec tempor
                  ipsum, vitae vestibulum enim. Cras sem erat, placerat nec elit
                  nec, sagittis faucibus tellus. <br /> <br />
                  Maecenas ac tellus sed risus tristique volutpat. Nulla nec
                  pellentesque velit. Integer massa nisi, malesuada in tellus
                  et, rhoncus finibus enim. Nulla eget libero mauris. <br />{" "}
                  Mauris pellentesque, turpis vel vulputate pulvinar, lorem diam
                  condimentum ex, vel posuere elit quam a nibh. Mauris commodo
                  bibendum est nec scelerisque. Praesent dapibus rutrum tortor,
                  eget molestie lacus lacinia dignissim. Phasellus dignissim
                  erat id nisi peuam. In magna odio, aliquet et porta non,
                  ornare a lorem. Nulla tincidunt justo ante, eu vehicula purus
                  sodales sed. Quisque velit sem, rutrum sit amet velit sed,
                  pellentesque accumsan tellus.elit.
                  <br />
                  <br /> Curabitur pulvinar dolor ac dolor dictum, sed dapibus
                  ante dignissim. Nulla aliquet ligula eget porta volutpat.
                  Curabitur vitae sagittis metus. Phasellus sem arcu, egestas
                  mattis vulputate sed, fringilla in quam. In magna odio,
                  aliquet et porta non, ornare a lorem. Nulla tincidunt justo
                  ante, eu vehicula purus sodales sed. Quisque velit sem, rutrum
                  sit amet velit sed, pellentesque accumsan tellus.
                </p>
              </div>
            </div>
          </div>
        );
      case "section4":
        return (
          <div
            className={`flex flex-col  items-center justify-start md:pt-25 w-screen min-h-screen  text-center `}
          >
            <div className="z-10  flex flex-1 flex-col pt-5  container  ">
              <h1 className="text-black text-center text-3xl  md:text-5xl tracking-tight font-bold">
                Galería del Ministerio
              </h1>
              <h3 className="text-black text-sm w-3/4 mx-auto tracking-tight  font-light mt-2 md:mt-4 text-center  ">
                Observe los mejores momentos del ministerio de Rodolfo Arias
              </h3>
              <div
                id="infinite-menu-container"
                className="  flex-1  flex mt-10 "
              >
                <div className="px-4 h-120 md:h-130 md:px-20 relative mx-auto ">
                  <InfiniteMenu items={infiniteMenuItems} />
                </div>
              </div>
            </div>
          </div>
        );
      case "section5":
        return (
          <div
            className={`flex flex-col  items-center justify-start md:pt-25 w-screen min-h-screen  text-center `}
          >
            <div className="z-10  flex flex-1 flex-col pt-5  container  ">
              <h1 className="text-black text-center text-3xl  md:text-5xl tracking-tight font-bold">
                Ministerio
              </h1>
              <h3 className="text-black text-sm w-3/4 mx-auto tracking-tight  font-light mt-2 md:mt-4 text-center  ">
                Observe los mejores momentos del ministerio de Rodolfo Arias
              </h3>
              <div
                id="infinite-menu-container"
                className="  flex-1  flex mt-10 "
              >
                <div className="px-4 flex row h-120 md:h-130 md:px-20 w-full relative mx-auto gap-4 ">
                  {/* Pura Vida FM */}
                  <div className="bg-white/1 relative px-0  backdrop-blur-6xl ring-1 ring-black/5 shadow-xl rounded-lg w-full h-full">
                    <img
                      src={ImagePuravida}
                      alt="Puravida"
                      className="w-full rounded-lg opacity-75 h-[40%] object-fill"
                    />
                    <div className="flex flex-col  h[40%] p-4 ">
                      <h1 className="text-black text-3xl tracking-tight font-semibold text-start">
                        Puravida FM
                      </h1>

                      <span className="mt-4 text-black text-sm tracking-tight font-thin text-start  flex-1 overflow-y-auto min-h-40 max-h-40">
                        Loren ipsum dolor sit amet consectetur adipisicing
                        elit.Loren ipsum dolor sit amet consectetur adipisicing
                        elit.Loren ipsum dolor sit amet consectetur adipisicing
                        elit.Loren ipsum dolor sit amet consectetur adipisicing
                        elit. Loren ipsum dolor sit amet consectetur adipisicing
                        elit.Lom dolor sit amet consectetng elit. Loren ipsum
                        dolor sit amet consectetur adipisic
                      </span>
                    </div>
                    <div className="flex justify-end h-[12.5%] items-center   rounded-lg px-2">
                      <button
                        onClick={() =>
                          window.open(
                            "https://www.youtube.com/@graciaplus",
                            "_blank"
                          )
                        }
                        className="rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer flex mr-2 items-center justify-center shadow-xl ring ring-black/5 size-12"
                      >
                        <BiGlobe className="text-black text-2xl" />
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            "https://www.youtube.com/@graciaplus",
                            "_blank"
                          )
                        }
                        className="rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer flex mr-2 items-center justify-center shadow-xl ring ring-black/5 size-12"
                      >
                        <BiLogoFacebookCircle className="text-black text-2xl" />
                      </button>
                    </div>
                  </div>
                  {/* Tiktok */}
                  <div className="bg-white/1 relative px-0  backdrop-blur-6xl ring-1 ring-black/5 shadow-xl rounded-lg w-full h-full">
                    <img
                      src={ImageTiktok}
                      alt="Puravida"
                      className="w-ful rounded-lg h-[40%] object-fill opacity-75"
                    />
                    <div className="flex flex-col  h[40%] p-4 ">
                      <h1 className="text-black text-3xl tracking-tight font-semibold text-start">
                        Puravida FM
                      </h1>

                      <span className="mt-4 text-black text-sm tracking-tight font-thin text-start  flex-1 overflow-y-auto min-h-40 max-h-40">
                        Loren ipsum dolor sit amet consectetur adipisicing
                        elit.Loren ipsum dolor sit amet consectetur adipisicing
                        elit.Loren ipsum dolor sit amet consectetur adipisicing
                        elit.Loren ipsum dolor sit amet consectetur adipisicing
                        elit. Loren ipsum dolor sit amet consectetur adipisicing
                        elit.Lom dolor sit amet consectetng elit. Loren ipsum
                        dolor sit amet consectetur adipisic
                      </span>
                    </div>
                    <div className="flex justify-end h-[12.5%] items-center   rounded-lg px-2">
                      <button
                        onClick={() =>
                          window.open(
                            "https://www.youtube.com/@graciaplus",
                            "_blank"
                          )
                        }
                        className="rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer flex mr-2 items-center justify-center shadow-xl ring ring-black/5 size-12"
                      >
                        <BiLogoYoutube className="text-black text-2xl" />
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            "https://www.youtube.com/@graciaplus",
                            "_blank"
                          )
                        }
                        className="rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer flex mr-2 items-center justify-center shadow-xl ring ring-black/5 size-12"
                      >
                        <BiLogoFacebookCircle className="text-black text-2xl" />
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            "https://www.youtube.com/@graciaplus",
                            "_blank"
                          )
                        }
                        className="rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer flex mr-2 items-center justify-center shadow-xl ring ring-black/5 size-12"
                      >
                        <BiLogoTiktok className="text-black text-2xl" />
                      </button>
                    </div>
                  </div>
                  {/* Graciaplus */}
                  <div className="bg-white/1 relative px-0  backdrop-blur-6xl ring-1 ring-black/5 shadow-xl rounded-lg w-full h-full">
                    <img
                      src={ImageGraciaPlus}
                      alt="Puravida"
                      className="w-full rounded-lg opacity-75 h-[40%] object-fill"
                    />
                    <div className="flex flex-col  h[40%] p-4 ">
                      <h1 className="text-black text-3xl tracking-tight font-semibold text-start">
                        Puravida FM
                      </h1>

                      <span className="mt-4 text-black text-sm tracking-tight font-thin text-start  flex-1 overflow-y-auto min-h-40 max-h-40">
                        Loren ipsum dolor sit amet consectetur adipisicing
                        elit.Loren ipsum dolor sit amet consectetur adipisicing
                        elit.Loren ipsum dolor sit amet consectetur adipisicing
                        elit.Loren ipsum dolor sit amet consectetur adipisicing
                        elit. Loren ipsum dolor sit amet consectetur adipisicing
                        elit.Lom dolor sit amet consectetng elit. Loren ipsum
                        dolor sit amet consectetur adipisic
                      </span>
                    </div>
                    <div className="flex justify-end h-[12.5%] items-center   rounded-lg px-2">
                      <button
                        onClick={() =>
                          window.open(
                            "https://www.youtube.com/@graciaplus",
                            "_blank"
                          )
                        }
                        className="rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer flex mr-2 items-center justify-center shadow-xl ring ring-black/5 size-12"
                      >
                        <BiGlobe className="text-black text-2xl" />
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            "https://www.youtube.com/@graciaplus",
                            "_blank"
                          )
                        }
                        className="rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer flex mr-2 items-center justify-center shadow-xl ring ring-black/5 size-12"
                      >
                        <BiLogoAndroid className="text-black text-2xl" />
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            "https://www.youtube.com/@graciaplus",
                            "_blank"
                          )
                        }
                        className="rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer flex mr-2 items-center justify-center shadow-xl ring ring-black/5 size-12"
                      >
                        <BiLogoApple className="text-black text-2xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "section6":
        return (
          // <div
          //   className={`flex flex-col items-center justify-center w-screen min-h-screen text-center `}
          // >
          //   <div className="z-10 container mx-auto px-6">
          //     <h1 className="text-black text-center text-4xl md:text-6xl tracking-tight font-bold">
          //       Contacto
          //     </h1>
          //     <p className="text-black text-lg tracking-tight font-light mt-8 max-w-2xl mx-auto">
          //       ¿Tienes alguna pregunta o te gustaría ponerte en contacto con
          //       nosotros? Estaremos encantados de escucharte.
          //     </p>
          //     <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          //       <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
          //         <MdOutlineEmail className="inline mr-2" />
          //         Enviar mensaje
          //       </button>
          //     </div>
          //   </div>
          // </div>
          <div
            className={`flex flex-col items-center justify-center w-screen min-h-screen text-center `}
          >
            <button
              className="cursor-pointer"
              onClick={() => {
                window.open("https://lobsterlabs.net", "_blank");
              }}
            >
              <img
                src={ImageLobster}
                className="h-10 w-auto object-contain absolute  bottom-15 left-1/2 -translate-x-1/2"
              />
            </button>
            <div className="z-10 container  mx-auto px-20 flex  ">
              <div className="flex  w-1/2 pr-5 border-r-4 border-black ">
                <div className="flex w-1/4 pb-12">
                  <BiLogoPaypal className="text-black size-40 " />
                </div>
                <div className="flex relative flex-1 flex-col  items-start px-4 justify-center  ">
                  <h1 className="text-black text-center text-4xl tracking-tight font-bold">
                    Donaciones
                  </h1>
                  <span className="text-black text-sm tracking-tight font-light mt-2 text-start  ">
                    Puedes apoyar nuestro ministerio con una donación. Con tu
                    apoyo la palabra de de Dios se puede escuchar en todo el
                    mundo.
                  </span>
                  <button
                    className="size-10 rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer items-center justify-center flex bg-black mt-4 absolute bottom-2 right-2"
                    onClick={() =>
                      window.open(
                        "https://www.paypal.com/donate/?hosted_button_id=2242222222222222222222222222222222222222",
                        "_blank"
                      )
                    }
                  >
                    <BiRightArrowAlt className="text-white size-6 -rotate-45" />
                  </button>
                </div>
              </div>
              <div className="flex  w-1/2 pl-5  ">
                <div className="flex w-1/4 pb-12">
                  <BiSolidMessageDetail className="text-black size-40 " />
                </div>
                <div className="flex relative flex-1 flex-col  items-start px-4 justify-center  ">
                  <h1 className="text-black text-center text-4xl tracking-tight font-bold">
                    Contacto
                  </h1>
                  <span className="text-black text-sm tracking-tight font-light mt-2 text-start  ">
                    Si desea comunicarse con nosotros, puede hacerlo a través de
                    correo electrónico.
                  </span>
                  <button
                    className="size-10 rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer items-center justify-center flex bg-black mt-4 absolute bottom-2 right-2"
                    onClick={() =>
                      window.open(
                        "https://www.paypal.com/donate/?hosted_button_id=2242222222222222222222222222222222222222",
                        "_blank"
                      )
                    }
                  >
                    <BiEnvelope className="text-white size-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // For mobile, render all sections as scrollable
  const renderMobileContent = () => {
    return (
      <div className="xl:hidden">
        {tabs.map((tab) => (
          <div key={tab.id} id={`mobile-${tab.id}`} className="min-h-screen">
            {(() => {
              switch (tab.id) {
                case "section1":
                  return (
                    <div
                      className={`pt-20 sm:pt-10 sm:pl-10 xl:pt-16 xl:pl-50 sm:flex-row  flex flex-col relative z-20 w-full  h-screen text-center `}
                    >
                      <div className="sm:self-stretch   sm:w-5/12 sm:flex-col xl:self-stretch  xl:w-5/12 xl:flex-col ">
                        <div className=" flex flex-col  sm:mt-[25%]  px-6 sm:px-0    sm:justify-start sm:items-end items-center justify-center ">
                          <h1 className="text-3xl lg:text-6xl xl:text-7xl  text-center sm:text-left font-bold text-black mb-2  ">
                            Rodolfo Arias
                            <p className="text-base lg:text-lg xl:text-xl sm:text-left sm:max-w-none text-center font-extralight tracking-tight text-black max-w-2xl">
                              Predicador apasionado por la palabra de Dios con
                              un mensaje <br className="hidden xl:block" />
                              de fe, esperanza y motivación.
                            </p>
                            <div className="mx-auto sm:mx-0  w-2/8 sm:w-1/6 h-1 mt-5 bg-black rounded-md " />
                          </h1>
                        </div>
                      </div>
                      <div className="  sm:absolute  sm:top-0 sm:right-0 sm:w-9/12 sm:h-full xl:relative xl:flex-1 flex-1">
                        <img
                          src={ImageRodolfo3}
                          alt="Rodolfo"
                          className="w-full h-full object-cover sm:object-cover 2xl:object-contain "
                        />
                      </div>
                    </div>
                  );
                case "section2":
                  return (
                    <div
                      className={`flex flex-col sm:flex-row items-start  w-screen  min-h-screen text-center `}
                    >
                      <div className="relative z-10 container mx-auto pt-20">
                        <img
                          src={ImagePaperPlane}
                          alt="Paper Plane"
                          className=" w-55 sm:w-65 md:w-70 mx-auto"
                        />

                        <div className="mt-16 w-full flex">
                          <div className="flex flex-col w-1/2 flex-1 px-6 md:py-10 ">
                            <iframe
                              src="https://www.youtube.com/embed/hafl3je4T7c"
                              className="md:hidden w-full h-full rounded-lg aspect-video mb-10 md:mb-0"
                            ></iframe>
                            <h1 className="text-black text-sm md:text-lg tracking-tight font-medium text-start">
                              Mi último mensaje
                            </h1>
                            <h1 className="text-black text-3xl md:text-5xl tracking-tight font-bold text-start">
                              Dios te bendiga en tu peor momento
                            </h1>
                            <p className="text-black text-sm tracking-tight font-light mt-4 text-start w-10/12  ">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Quisquam, for example, when you are going
                              through a difficult time, you can find comfort in
                              the fact that God is with you.
                            </p>
                            <div className="bg-transparent py-10  rounded-lg flex space-x-4 ">
                              <Folder
                                size={1}
                                color="#1e202e"
                                items={videoEmbeds}
                              />
                              <Folder
                                size={1}
                                color="#1e202e"
                                items={videoEmbeds}
                              />
                            </div>
                          </div>
                          <iframe
                            src="https://www.youtube.com/embed/hafl3je4T7c"
                            className="hidden md:block w-1/2 h-full rounded-lg aspect-video"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  );
                case "section3":
                  return (
                    <div
                      className={`flex flex-col sm:flex-row justify-center  w-full px-6   min-h-screen text-center `}
                    >
                      <div className="z-10 pt-20  ">
                        <img
                          src={ImageBoat}
                          alt="Paper Boat"
                          className=" w-65 sm:w-65 md:w-70  mx-auto"
                        />
                        <div className="px-10 py-8 bg-white/10 backdrop-blur-6xl ring-1 ring-black/5 shadow-xl rounded-lg  container justify-center items-center mx-auto  mt-10">
                          <h1 className="text-black text-center text-3xl md:text-5xl tracking-tight font-bold">
                            Acerca del Ministerio
                          </h1>
                          <h3 className="text-black text-sm tracking-tight font-light mt-4 text-center  ">
                            "Neque porro quisquam est qui dolorem ipsum quia
                            dolor sit amet, consectetur, adipisci velit..."
                          </h3>
                          <p className="text-black text-sm tracking-tight font-light  mt-4 text-justify w-full md:w-10/12 mx-auto  ">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Morbi augue nibh, laoreet vel lacus lacinia,
                            faucibus consectetur libero. In finibus magna eu
                            convallis consectetur. Donec eget consectetur urna.
                            Etiam feugiat sapien eu ligula blandit porttitor. In
                            hac habitasse platea dictumst. Maecenas sed diam et
                            ex sagittis consectetur et sit amet felis. Integer
                            ultricies, eros a fermentum tristique, libero leo
                            lacinia justo, eget molestie enim tortor non nulla.
                            Nunc sed interdum est. Vestibulum ante ipsum primis
                            in faucibus orci luctus et ultrices posuere cubilia
                            curae; Maecenas erat mauris, tempor aliquet odio
                            eget, facilisis pharetra ipsum. Morbi mattis
                            interdum porta. Maecenas semper tincidunt ipsum, id
                            hendrerit metus semper non. Suspendisse sed justo
                            vitae augue pretium iaculis. Donec tempus ipsum nec
                            nibh ultrices sagittis. Vestibulum congue eget velit
                            a pharetra. Duis nec tempor ipsum, vitae vestibulum
                            enim. Cras sem erat, placerat nec elit nec, sagittis
                            faucibus tellus. <br /> <br />
                            Maecenas ac tellus sed risus tristique volutpat.
                            Nulla nec pellentesque velit. Integer massa nisi,
                            malesuada in tellus et, rhoncus finibus enim. Nulla
                            eget libero mauris. <br /> Mauris pellentesque,
                            turpis vel vulputate pulvinar, lorem diam
                            condimentum ex, vel posuere elit quam a nibh. Mauris
                            commodo bibendum est nec scelerisque. Praesent
                            dapibus rutrum tortor, eget molestie lacus lacinia
                            dignissim. Phasellus dignissim erat id nisi peuam.
                            In magna odio, aliquet et porta non, ornare a lorem.
                            Nulla tincidunt justo ante, eu vehicula purus
                            sodales sed. Quisque velit sem, rutrum sit amet
                            velit sed, pellentesque accumsan tellus.elit.
                            <br />
                            <br /> Curabitur pulvinar dolor ac dolor dictum, sed
                            dapibus ante dignissim. Nulla aliquet ligula eget
                            porta volutpat. Curabitur vitae sagittis metus.
                            Phasellus sem arcu, egestas mattis vulputate sed,
                            fringilla in quam. In magna odio, aliquet et porta
                            non, ornare a lorem. Nulla tincidunt justo ante, eu
                            vehicula purus sodales sed. Quisque velit sem,
                            rutrum sit amet velit sed, pellentesque accumsan
                            tellus.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                case "section4":
                  return (
                    <div
                      className={`flex flex-col items-center justify-start pt-20  w-screen min-h-screen  text-center `}
                    >
                      <div className="z-10 flex flex-1 flex-col   container ">
                        <h1 className="text-black text-center text-3xl  md:text-5xl tracking-tight font-bold">
                          Galería del Ministerio
                        </h1>
                        <h3 className="text-black text-sm w-3/4 mx-auto tracking-tight  font-light mt-2 md:mt-4 text-center  ">
                          Observe los mejores momentos del ministerio de Rodolfo
                          Arias
                        </h3>
                        <div
                          id="infinite-menu-container"
                          className="  flex-1  mt-10  flex"
                        >
                          <div className="px-4 h-120  md:h-130 md:px-20 relative mx-auto ">
                            <InfiniteMenu items={infiniteMenuItems} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                case "section5":
                  return (
                    <div
                      className={`flex flex-col items-center justify-start pt-20 w-screen min-h-screen text-center `}
                    >
                      <div className="z-10 container mx-auto px-4">
                        <h1 className="text-black text-center text-3xl md:text-5xl tracking-tight font-bold">
                          Ministerio
                        </h1>
                        <h3 className="text-black text-sm w-3/4 mx-auto tracking-tight font-light mt-4 text-center">
                          Observe los mejores momentos del ministerio de Rodolfo
                          Arias
                        </h3>

                        <div className="mt-8 space-y-6">
                          {/* Pura Vida FM */}
                          <div className="bg-white/10 backdrop-blur-md ring-1 ring-black/5 shadow-xl rounded-lg overflow-hidden">
                            <img
                              src={ImagePuravida}
                              alt="Puravida FM"
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                              <h2 className="text-black text-xl font-semibold text-left mb-2">
                                Puravida FM
                              </h2>
                              <p className="text-black text-sm text-left mb-4">
                                Estación de radio donde compartimos mensajes de
                                fe y esperanza para toda la familia.
                              </p>
                              <div className="flex justify-end gap-2">
                                <button className="rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 w-10 h-10 bg-white/50">
                                  <BiGlobe className="text-black text-lg" />
                                </button>
                                <button className="rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 w-10 h-10 bg-white/50">
                                  <BiLogoFacebookCircle className="text-black text-lg" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* TikTok Content */}
                          <div className="bg-white/10 backdrop-blur-md ring-1 ring-black/5 shadow-xl rounded-lg overflow-hidden">
                            <img
                              src={ImageTiktok}
                              alt="TikTok Content"
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                              <h2 className="text-black text-xl font-semibold text-left mb-2">
                                Contenido Digital
                              </h2>
                              <p className="text-black text-sm text-left mb-4">
                                Mensajes motivacionales y de fe a través de
                                redes sociales y plataformas digitales.
                              </p>
                              <div className="flex justify-end gap-2">
                                <button className="rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 w-10 h-10 bg-white/50">
                                  <BiLogoYoutube className="text-black text-lg" />
                                </button>
                                <button className="rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 w-10 h-10 bg-white/50">
                                  <BiLogoFacebookCircle className="text-black text-lg" />
                                </button>
                                <button className="rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 w-10 h-10 bg-white/50">
                                  <BiLogoTiktok className="text-black text-lg" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Gracia Plus */}
                          <div className="bg-white/10 backdrop-blur-md ring-1 ring-black/5 shadow-xl rounded-lg overflow-hidden">
                            <img
                              src={ImageGraciaPlus}
                              alt="Gracia Plus"
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                              <h2 className="text-black text-xl font-semibold text-left mb-2">
                                Gracia Plus
                              </h2>
                              <p className="text-black text-sm text-left mb-4">
                                Aplicación móvil con contenido cristiano,
                                mensajes y recursos para el crecimiento
                                espiritual.
                              </p>
                              <div className="flex justify-end gap-2">
                                <button className="rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 w-10 h-10 bg-white/50">
                                  <BiGlobe className="text-black text-lg" />
                                </button>
                                <button className="rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 w-10 h-10 bg-white/50">
                                  <BiLogoAndroid className="text-black text-lg" />
                                </button>
                                <button className="rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 w-10 h-10 bg-white/50">
                                  <BiLogoApple className="text-black text-lg" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                case "section6":
                  return (
                    <div
                      className={`flex flex-col items-center pt-20 w-screen min-h-screen text-center `}
                    >
                      <h1 className="text-black text-center text-3xl  md:text-5xl tracking-tight font-bold">
                        Otros recursos
                      </h1>
                      <h3 className="text-black mb-16 text-sm w-3/4 mx-auto tracking-tight  font-light mt-2 md:mt-4 text-center  ">
                        "Manos que dan nunca estarán vacías"
                      </h3>
                      <div className="z-10 container mx-auto px-6 flex flex-col gap-8">
                        {/* Donations Section */}
                        <div className="flex border-b-2 border-black pb-6">
                          <div className="flex w-1/4">
                            <BiLogoPaypal className="text-black w-20 h-20" />
                          </div>
                          <div className="flex relative flex-1 flex-col items-start px-4 justify-center">
                            <h1 className="text-black flex items-center gap-2 text-2xl tracking-tight font-bold text-left">
                              Donaciones{" "}
                              <button
                                className="w-10 h-10 rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer items-center justify-center flex bg-black "
                                onClick={() =>
                                  window.open(
                                    "https://www.paypal.com/donate/?hosted_button_id=2242222222222222222222222222222222222222",
                                    "_blank"
                                  )
                                }
                              >
                                <BiRightArrowAlt className="text-white w-6 h-6 -rotate-45" />
                              </button>
                            </h1>
                            <span className="text-black text-sm tracking-tight font-light mt-2 text-left">
                              Puedes apoyar nuestro ministerio con una donación.
                              Con tu apoyo la palabra de Dios se puede escuchar
                              en todo el mundo.
                            </span>
                          </div>
                        </div>

                        {/* Contact Section */}
                        <div className="flex pt-6">
                          <div className="flex w-1/4">
                            <BiSolidMessageDetail className="text-black w-20 h-20" />
                          </div>
                          <div className="flex relative flex-1 flex-col items-start px-4 justify-center">
                            <h1 className="text-black flex items-center gap-2 text-2xl tracking-tight font-bold text-left">
                              Contacto{" "}
                              <button
                                className="w-10 h-10 rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer items-center justify-center flex bg-black "
                                onClick={() =>
                                  window.open(
                                    "mailto:contact@rodolfoarias.com",
                                    "_blank"
                                  )
                                }
                              >
                                <BiEnvelope className="text-white w-6 h-6" />
                              </button>
                            </h1>
                            <span className="text-black text-sm tracking-tight font-light mt-2 text-left">
                              Si desea comunicarse con nosotros, puede hacerlo a
                              través de correo electrónico.
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col  flex-1 items-center justify-center">
                        <img
                          src={ImageLobster}
                          className="h-8 w-auto object-contain absolute left-4 bottom-25"
                        />
                      </div>
                    </div>
                  );
                default:
                  return null;
              }
            })()}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen xl:overflow-hidden">
      <AuroraBackground className="min-h-screen xl:overflow-hidden">
        <Dock
          items={dockItems}
          className="hidden xl:flex"
          magnification={65}
          position="left"
        />

        {/* Menu Button for Mobile (top left) */}
        <div className="xl:hidden fixed top-3 left-4 z-120">
          <div className="flex items-center gap-2">
            {/* Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-12 w-12 items-center shadow-sm justify-center rounded-full bg-white/75 transition-all duration-200"
            >
              {mobileMenuOpen ? (
                <MdClose className="h-5 w-5 text-neutral-500" />
              ) : (
                <MdMenu className="h-5 w-5 text-black" />
              )}
            </button>

            {/* Navigation Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  layoutId="mobileNav"
                  className="absolute left-0 top-full mt-2 flex flex-col gap-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileNavItems.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: {
                            delay: idx * 0.05,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          x: -20,
                        }}
                        transition={{
                          delay: (mobileNavItems.length - 1 - idx) * 0.05,
                        }}
                      >
                        <button
                          onClick={() => {
                            setActiveTab(
                              item.id as
                                | "section1"
                                | "section2"
                                | "section3"
                                | "section4"
                                | "section5"
                                | "section6"
                            );
                            scrollToSection(`mobile-${item.id}`);
                            setMobileMenuOpen(false);
                          }}
                          className={`flex h-12 w-12 shadow-md items-center justify-center rounded-full transition-all ${
                            activeTab === item.id
                              ? "bg-white/100 text-black"
                              : "bg-white/90 text-black/70 hover:bg-white/95 hover:text-black"
                          }`}
                          title={item.label}
                        >
                          <IconComponent className="size-5" />
                        </button>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Rodolfo Arias Badge - Center (Mobile) */}
        <div className="xl:hidden fixed top-3 left-1/2 transform -translate-x-1/2 z-110">
          <h1 className="text-base sm:text-lg h-12 px-4 flex items-center bg-white/90 shadow-sm rounded-full font-bold">
            Rodolfo Arias
          </h1>
        </div>

        {/* Modified FloatingDock for Mobile (top right, open by default) */}
        <div className="xl:hidden">
          <FloatingDockMobileCustom items={dockMobileItems} />
        </div>

        {/* Brand Logo - Top Left (XL+ screens only) */}
        <div className="hidden xl:flex absolute top-8 left-8 z-40 items-center">
          <PiWaveformBold className="text-2xl text-black" />
          <span className="text-2xl font-bold tracking-tight text-black ml-2">
            Rodolfo Arias
          </span>
        </div>

        {/* Message Icon - Top Right (XL+ screens only) */}
        <div className="hidden xl:flex absolute top-8 right-8 z-40">
          <button
            onClick={() => setActiveTab("section6")}
            className="text-2xl text-black cursor-pointer hover:text-black/65 transition-colors"
          >
            <MdOutlineEmail />
          </button>
        </div>

        {/* Desktop Tab Navigation (XL+ screens only) */}
        <div className="hidden xl:block absolute top-8 left-1/2 transform -translate-x-1/2 z-40">
          <div className="flex flex-row items-center justify-center bg-white/35 ring ring-black/3 overflow-x-hidden backdrop-blur-2xl shadow-xs rounded-full p-2  max-w-4xl ">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as
                      | "section1"
                      | "section2"
                      | "section3"
                      | "section4"
                      | "section5"
                      | "section6"
                  )
                }
                className="relative px-3 py-2 hover:bg-gray-100/75 hover:cursor-pointer rounded-full text-black font-medium transition-all duration-200 whitespace-nowrap text-sm"
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    className="absolute inset-0 bg-white/90 rounded-full"
                  />
                )}
                <span className="relative z-10">{tab.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="hidden xl:block">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {renderContent()}
          </motion.div>
        </div>

        {/* Mobile Scrollable Content */}
        {renderMobileContent()}

        {/* Next Section Indicator - Mobile Only */}
        <div className="xl:hidden">
          <NextSectionIndicator
            nextSectionName={getNextSectionName(currentMobileSection)}
            onClick={handleNextSection}
            textColor="dark"
            show={true}
          />
        </div>
      </AuroraBackground>
    </div>
  );
};

export default Landing2;
