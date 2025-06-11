import React, { useEffect, useState, useRef } from "react";
import { AuroraBackground } from "../components/aceternity/aurora-background";
import Folder from "../components/reactbits/folder";
import NavigationBar from "../components/mine/navigation-bar";
import NextSectionIndicator from "../components/mine/next-section-indicator";
import Dock from "../components/reactbits/dock";
import Portal from "../components/Portal";
import CustomIcon from "../components/mine/custom-icon-graciaplus";
import ImageRodolfo3 from "../assets/rodolfo-image3.png";
import ImagePaperPlane from "../assets/paper-planes.png";
import ImageBoat from "../assets/paper-boat.png";
import InfiniteMenu from "../components/reactbits/infinite-menu";
import {
  BiLogoInstagramAlt,
  BiLogoFacebookCircle,
  BiLogoTiktok,
  BiLogoYoutube,
  BiLogoSpotify,
  BiLogoPaypal,
} from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { FloatingDock } from "../components/aceternity/dock-mobile";

const Landing: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMdUp, setIsMdUp] = useState(window.innerWidth >= 640);
  const [isScrolling, setIsScrolling] = useState(false);

  // Carousel opacities (for md screens and up)
  const [carouselSection1Opacity, setCarouselSection1Opacity] = useState(1);
  const [carouselSection2Opacity, setCarouselSection2Opacity] = useState(0);
  const [carouselSection3Opacity, setCarouselSection3Opacity] = useState(0);
  const [carouselSection4Opacity, setCarouselSection4Opacity] = useState(0);
  const [carouselSection5Opacity, setCarouselSection5Opacity] = useState(0);
  const [carouselSection6Opacity, setCarouselSection6Opacity] = useState(0);

  // Mobile section opacities (for screens smaller than md)
  const [mobileSection1Opacity, setMobileSection1Opacity] = useState(1);

  const [activeSectionName, setActiveSectionName] = useState<
    "section1" | "section2" | "section3" | "section4" | "section5" | "section6"
  >("section1");

  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  const section6Ref = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  //Classname for dock items
  const dockItemClassName = `text-black bg-transparent  shadow-lg text-xl hover:text-2xl hover:size-7 border-none cursor-pointer ${
    activeSectionName === "section2" || activeSectionName === "section3"
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

  useEffect(() => {
    const updateMedia = () => {
      setIsMdUp(window.innerWidth >= 768);
    };
    window.addEventListener("resize", updateMedia);
    updateMedia(); // Initial check
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      setScrollY(currentScrollY);

      // Detect scrolling for mobile
      if (!isMdUp) {
        setIsScrolling(true);

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Set new timeout to detect when scrolling stops
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150); // 150ms delay after scrolling stops
      }

      if (isMdUp) {
        // Carousel logic for md and up
        const s1Fade = Math.max(0, 1 - currentScrollY / (windowHeight * 0.8));
        setCarouselSection1Opacity(s1Fade);

        const s2FadeStart = windowHeight * 0.2;
        const s2FadeDuration = windowHeight * 0.8;
        const s2Fade = Math.min(
          1,
          Math.max(0, (currentScrollY - s2FadeStart) / s2FadeDuration)
        );
        setCarouselSection2Opacity(s2Fade);

        // Add section 3 fade calculation
        const s3FadeStart = windowHeight * 1.2; // Start after section 2
        const s3FadeDuration = windowHeight * 0.8;
        const s3Fade = Math.min(
          1,
          Math.max(0, (currentScrollY - s3FadeStart) / s3FadeDuration)
        );
        setCarouselSection3Opacity(s3Fade);

        // Add section 4 fade calculation
        const s4FadeStart = windowHeight * 2.2; // Start after section 3
        const s4FadeDuration = windowHeight * 0.8;
        const s4Fade = Math.min(
          1,
          Math.max(0, (currentScrollY - s4FadeStart) / s4FadeDuration)
        );
        setCarouselSection4Opacity(s4Fade);

        // Add section 5 fade calculation
        const s5FadeStart = windowHeight * 3.2; // Start after section 4
        const s5FadeDuration = windowHeight * 1.5;
        const s5Fade = Math.min(
          1,
          Math.max(0, (currentScrollY - s5FadeStart) / s5FadeDuration)
        );
        setCarouselSection5Opacity(s5Fade);

        // Add section 6 fade calculation
        const s6FadeStart = windowHeight * 4.2; // Start after section 5
        const s6FadeDuration = windowHeight * 1.5;
        const s6Fade = Math.min(
          1,
          Math.max(0, (currentScrollY - s6FadeStart) / s6FadeDuration)
        );
        setCarouselSection6Opacity(s6Fade);

        if (s1Fade >= 0.5) {
          setActiveSectionName("section1");
        } else if (s2Fade >= 0.5 && s3Fade < 0.5) {
          setActiveSectionName("section2");
        } else if (s3Fade >= 0.5 && s4Fade < 0.5) {
          setActiveSectionName("section3");
        } else if (s4Fade >= 0.5 && s5Fade < 0.5) {
          setActiveSectionName("section4");
        } else if (s5Fade >= 0.5 && s6Fade < 0.5) {
          setActiveSectionName("section5");
        } else if (s6Fade >= 0.5) {
          setActiveSectionName("section6");
        }

        setMobileSection1Opacity(1);
      } else {
        // Scroll-triggered fade-in and active section for smaller screens
        let currentActive:
          | "section1"
          | "section2"
          | "section3"
          | "section4"
          | "section5"
          | "section6" = "section1";

        if (section1Ref.current) {
          setMobileSection1Opacity(1);
        }
        if (section2Ref.current) {
          const section2Top = section2Ref.current.offsetTop;
          // Section 2 becomes active when we've scrolled past 50% of section 2's top
          if (currentScrollY >= section2Top - windowHeight / 2) {
            currentActive = "section2";
          }
        }

        if (section3Ref.current) {
          const section3Top = section3Ref.current.offsetTop;
          if (currentScrollY >= section3Top - windowHeight / 2) {
            currentActive = "section3";
          }
        }

        if (section4Ref.current) {
          const section4Top = section4Ref.current.offsetTop;
          if (currentScrollY >= section4Top - windowHeight / 2) {
            currentActive = "section4";
          }
        }

        if (section5Ref.current) {
          const section5Top = section5Ref.current.offsetTop;
          if (currentScrollY >= section5Top - windowHeight / 2) {
            currentActive = "section5";
          }
        }

        if (section6Ref.current) {
          const section6Top = section6Ref.current.offsetTop;
          if (currentScrollY >= section6Top - windowHeight / 2) {
            currentActive = "section6";
          }
        }

        setActiveSectionName(currentActive);

        setCarouselSection1Opacity(1);
        setCarouselSection2Opacity(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isMdUp]);

  const handleScrollToSection = (
    sectionId:
      | "section1"
      | "section2"
      | "section3"
      | "section4"
      | "section5"
      | "section6"
  ) => {
    if (isMdUp) {
      if (sectionId === "section1") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (sectionId === "section2") {
        // Scroll to ensure section 2 fade is complete
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      } else if (sectionId === "section3") {
        // Scroll to ensure section 3 fade is complete
        window.scrollTo({ top: window.innerHeight * 2, behavior: "smooth" });
      } else if (sectionId === "section4") {
        // Scroll to ensure section 4 fade is complete
        window.scrollTo({ top: window.innerHeight * 3, behavior: "smooth" });
      } else if (sectionId === "section5") {
        // Scroll to ensure section 5 fade is complete
        window.scrollTo({ top: window.innerHeight * 4, behavior: "smooth" });
      } else if (sectionId === "section6") {
        // Scroll to ensure section 6 fade is complete
        window.scrollTo({ top: window.innerHeight * 5, behavior: "smooth" });
      }
    } else {
      // Mobile view scrolling
      if (sectionId === "section1" && section1Ref.current) {
        section1Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (sectionId === "section2" && section2Ref.current) {
        section2Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (sectionId === "section3" && section3Ref.current) {
        section3Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (sectionId === "section4" && section4Ref.current) {
        section4Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (sectionId === "section5" && section5Ref.current) {
        section5Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (sectionId === "section6" && section6Ref.current) {
        section6Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const commonSection1Content = (
    <AuroraBackground className="0">
      <div
        className={`flex flex-col sm:flex-row   items-start  w-screen  h-screen text-center mt-16 ${
          isMdUp ? "pt-16 sm:pt-20" : ""
        }`}
      >
        <div className="flex md:ml-25   sm:ml-8  h-1/3   sm:w-5/12 sm:h-full sm:flex-col 2xl:translate-y-2/12 sm:translate-y-1/12 ">
          <div className=" flex flex-col  px-4 sm:px-0   sm:justify-start sm:items-start items-center justify-center  lg:translate-x-1/8 ">
            <h1 className="text-5xl  text-center sm:text-left  md:text-5xl lg:text-7xl 2xl:text-8xl  font-bold text-black mb-2  ">
              Rodolfo Arias
            </h1>
            <p className="text-md text-center sm:text-left md:text-lg 2xl:text-xl font-extralight tracking-tight text-black max-w-2xl sm:max-w-none">
              Predicador apasionado por la palabra de Dios con un mensaje{" "}
              <br className="hidden xl:block" />
              de fe, esperanza y motivación.
            </p>
            <div className="h-1 mt-5 bg-black rounded-md   w-1/6" />
          </div>
        </div>
        <div className="flex-1 mb-8    sm:w-7/12 z-100 sm:h-screen">
          <img
            src={ImageRodolfo3}
            alt="Rodolfo"
            className="w-full h-full xl:aspect-square  xl:object-cover object-cover  sm:object-cover lg:object-contain sm:absolute sm:-right-50 xl:static "
          />
        </div>
      </div>
    </AuroraBackground>
  );

  const commonSection2Content = (
    <AuroraBackground className="0">
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, for example, when you are going through a difficult
                time, you can find comfort in the fact that God is with you.
              </p>
              {/* <div className="bg-transparent p-4 rounded-lg border">
                <CircularGallery items={videoEmbeds} />
              </div> */}
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
    </AuroraBackground>
  );

  const commonSection3Content = (
    <AuroraBackground className="0">
      <div
        className={`flex flex-col sm:flex-row items-center  w-full px-2 md:px-0 md:w-4/6  min-h-screen text-center `}
      >
        <div className="m-4 z-10 pt-10 ">
          <img
            src={ImageBoat}
            alt="Paper Plane"
            className=" w-65 sm:w-65 md:w-70 mx-auto mb-10"
          />
          <div className="p-10 bg-white/10 backdrop-blur-6xl ring-1 ring-black/5 shadow-xl rounded-lg  container justify-center items-center mx-auto mt-6">
            <h1 className="text-black text-center text-3xl md:text-5xl tracking-tight font-bold">
              Mi vida
            </h1>
            <h3 className="text-black text-sm tracking-tight font-light mt-4 text-center  ">
              "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit..."
            </h3>
            <p className="text-black text-sm tracking-tight font-light  mt-4 text-justify w-full md:w-10/12 mx-auto  ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              augue nibh, laoreet vel lacus lacinia, faucibus consectetur
              libero. In finibus magna eu convallis consectetur. Donec eget
              consectetur urna. Etiam feugiat sapien eu ligula blandit
              porttitor. In hac habitasse platea dictumst. Maecenas sed diam et
              ex sagittis consectetur et sit amet felis. Integer ultricies, eros
              a fermentum tristique, libero leo lacinia justo, eget molestie
              enim tortor non nulla. Nunc sed interdum est. Vestibulum ante
              ipsum primis in faucibus orci luctus et ultrices posuere cubilia
              curae; Maecenas erat mauris, tempor aliquet odio eget, facilisis
              pharetra ipsum. Morbi mattis interdum porta. Maecenas semper
              tincidunt ipsum, id hendrerit metus semper non. Suspendisse sed
              justo vitae augue pretium iaculis. Donec tempus ipsum nec nibh
              ultrices sagittis. Vestibulum congue eget velit a pharetra. Duis
              nec tempor ipsum, vitae vestibulum enim. Cras sem erat, placerat
              nec elit nec, sagittis faucibus tellus. <br /> <br />
              Maecenas ac tellus sed risus tristique volutpat. Nulla nec
              pellentesque velit. Integer massa nisi, malesuada in tellus et,
              rhoncus finibus enim. Nulla eget libero mauris. <br /> Mauris
              pellentesque, turpis vel vulputate pulvinar, lorem diam
              condimentum ex, vel posuere elit quam a nibh. Mauris commodo
              bibendum est nec scelerisque. Praesent dapibus rutrum tortor, eget
              molestie lacus lacinia dignissim. Phasellus dignissim erat id nisi
              peuam. In magna odio, aliquet et porta non, ornare a lorem. Nulla
              tincidunt justo ante, eu vehicula purus sodales sed. Quisque velit
              sem, rutrum sit amet velit sed, pellentesque accumsan tellus.elit.
              <br />
              <br /> Curabitur pulvinar dolor ac dolor dictum, sed dapibus ante
              dignissim. Nulla aliquet ligula eget porta volutpat. Curabitur
              vitae sagittis metus. Phasellus sem arcu, egestas mattis vulputate
              sed, fringilla in quam. In magna odio, aliquet et porta non,
              ornare a lorem. Nulla tincidunt justo ante, eu vehicula purus
              sodales sed. Quisque velit sem, rutrum sit amet velit sed,
              pellentesque accumsan tellus.
            </p>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );

  const commonSection4Content = (
    <AuroraBackground className="0">
      <div
        className={`flex flex-col items-center justify-start md:mt-20 w-screen min-h-screen  text-center `}
      >
        <div className="z-10  flex flex-1 flex-col pt-10  container ">
          <h1 className="text-black text-center text-3xl  md:text-5xl tracking-tight font-bold">
            Galería del Ministerio
          </h1>
          <h3 className="text-black text-sm w-3/4 mx-auto tracking-tight  font-light mt-2 md:mt-4 text-center  ">
            Observe los mejores momentos del ministerio de Rodolfo Arias
          </h3>
          <div id="infinite-menu-container" className="  flex-1  flex mt-10 ">
            <div className="px-4 h-120 md:h-130 md:px-20 relative mx-auto ">
              <InfiniteMenu items={infiniteMenuItems} />
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );

  const commonSection5Content = (
    <AuroraBackground className="0">
      <div
        className={`flex flex-col items-center justify-center w-screen min-h-screen text-center `}
      >
        <div className="z-10 container mx-auto">
          <h1 className="text-black text-center text-4xl md:text-6xl tracking-tight font-bold">
            Ministerio
          </h1>
        </div>
      </div>
    </AuroraBackground>
  );

  const commonSection6Content = (
    <AuroraBackground className="0">
      <div
        className={`flex flex-col items-center justify-center w-screen min-h-screen text-center `}
      >
        <div className="z-10 container mx-auto">
          <h1 className="text-black text-center text-4xl md:text-6xl tracking-tight font-bold">
            Contacto
          </h1>
        </div>
      </div>
    </AuroraBackground>
  );

  if (isMdUp) {
    return (
      <div className="relative ">
        <Portal>
          <Dock
            items={dockItems}
            className="border-none"
            magnification={65}
            position="left"
          />
        </Portal>
        {isMdUp && (
          <NavigationBar
            activeSection={activeSectionName}
            scrollToSection={handleScrollToSection}
          />
        )}

        {/* Next Section Indicators */}
        {carouselSection1Opacity > 0.5 && (
          <NextSectionIndicator
            nextSectionName="Mensajes"
            textColor="dark"
            onClick={() => handleScrollToSection("section2")}
          />
        )}
        {carouselSection2Opacity > 0.5 && carouselSection3Opacity <= 0.5 && (
          <NextSectionIndicator
            nextSectionName="BIOGRAFÍA"
            textColor="dark"
            onClick={() => handleScrollToSection("section3")}
          />
        )}
        {carouselSection3Opacity > 0.5 && carouselSection4Opacity <= 0.5 && (
          <NextSectionIndicator
            nextSectionName="GALERÍA"
            textColor="dark"
            onClick={() => handleScrollToSection("section4")}
          />
        )}
        {carouselSection4Opacity > 0.5 && carouselSection5Opacity <= 0.5 && (
          <NextSectionIndicator
            nextSectionName="MINISTERIO"
            textColor="dark"
            onClick={() => handleScrollToSection("section5")}
          />
        )}
        {carouselSection5Opacity > 0.5 && carouselSection6Opacity <= 0.5 && (
          <NextSectionIndicator
            nextSectionName="CONTACTO"
            textColor="dark"
            onClick={() => handleScrollToSection("section6")}
          />
        )}
        {carouselSection6Opacity > 0.5 && (
          <NextSectionIndicator
            nextSectionName="DIOS TE BENDIGA"
            textColor="dark"
          />
        )}

        <div
          className="h-screen w-screen fixed top-0 left-0 z-10"
          style={{
            opacity: carouselSection1Opacity,
            pointerEvents: carouselSection1Opacity > 0 ? "auto" : "none",
          }}
        >
          {commonSection1Content}
        </div>

        <div
          className="h-screen w-screen fixed top-0 left-0 z-5"
          style={{
            opacity: carouselSection2Opacity,
            pointerEvents: carouselSection2Opacity > 0 ? "auto" : "none",
          }}
        >
          {commonSection2Content}
        </div>

        <div
          className="h-screen w-screen fixed top-0 left-0 z-5"
          style={{
            opacity: carouselSection3Opacity,
            pointerEvents: carouselSection3Opacity > 0 ? "auto" : "none",
          }}
        >
          {commonSection3Content}
        </div>

        <div
          className="h-screen w-screen fixed top-0 left-0 z-5"
          style={{
            opacity: carouselSection4Opacity,
            pointerEvents: carouselSection4Opacity > 0 ? "auto" : "none",
          }}
        >
          {commonSection4Content}
        </div>

        <div
          className="h-screen w-screen fixed top-0 left-0 z-5"
          style={{
            opacity: carouselSection5Opacity,
            pointerEvents: carouselSection5Opacity > 0 ? "auto" : "none",
          }}
        >
          {commonSection5Content}
        </div>

        <div
          className="h-screen w-screen fixed top-0 left-0 z-5"
          style={{
            opacity: carouselSection6Opacity,
            pointerEvents: carouselSection6Opacity > 0 ? "auto" : "none",
          }}
        >
          {commonSection6Content}
        </div>

        {/* Spacer for carousel scrolling MD+ */}
        <div className="h-[600vh] relative z-0"></div>

        {/* Scroll indicator for carousel MD+ */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div
            className="w-1 h-20 bg-white/30 rounded-full overflow-hidden"
            style={{
              opacity:
                carouselSection1Opacity > 0.1 ||
                carouselSection2Opacity > 0.1 ||
                carouselSection3Opacity > 0.1
                  ? 1
                  : 0,
            }}
          >
            <div
              className="w-full bg-white rounded-full transition-all duration-300"
              style={{
                height: `${Math.min(
                  100,
                  (scrollY / (window.innerHeight * 3)) * 100
                )}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  } else {
    // Mobile view: Stacked sections
    return (
      <div className="relative  overflow-x-hidden">
        <FloatingDock items={dockMobileItems} />
        <div className="fixed top-4 right-4 z-110">
          <button
            onClick={() => handleScrollToSection("section6")}
            className={`flex  items-center  mb-3 justify-center rounded-full  h-12  ${
              activeSectionName != "section1"
                ? "bg-white/90 shadow-sm w-12 "
                : "bg-transparent shadow-md px-3 gap-1"
            }`}
          >
            <MdOutlineEmail className="h-5 w-5 text-black " />
            {activeSectionName === "section1" ? (
              <h1 className="text-black text-sm">Contacto</h1>
            ) : null}
          </button>
        </div>

        {/* Next Section Indicators for Mobile with Tailwind fade animation */}
        <NextSectionIndicator
          nextSectionName="ÚLTIMOS MENSAJES"
          textColor="dark"
          onClick={() => handleScrollToSection("section2")}
          show={!isScrolling && activeSectionName === "section1"}
        />
        <NextSectionIndicator
          nextSectionName="BIOGRAFÍA"
          textColor="dark"
          onClick={() => handleScrollToSection("section3")}
          show={!isScrolling && activeSectionName === "section2"}
        />
        <NextSectionIndicator
          nextSectionName="GALERÍA"
          textColor="dark"
          onClick={() => handleScrollToSection("section4")}
          show={!isScrolling && activeSectionName === "section3"}
        />
        <NextSectionIndicator
          nextSectionName="MINISTERIO"
          textColor="dark"
          onClick={() => handleScrollToSection("section5")}
          show={!isScrolling && activeSectionName === "section4"}
        />
        <NextSectionIndicator
          nextSectionName="CONTACTO"
          textColor="dark"
          onClick={() => handleScrollToSection("section6")}
          show={!isScrolling && activeSectionName === "section5"}
        />
        <NextSectionIndicator
          nextSectionName="DIOS TE BENDIGA"
          textColor="dark"
          show={!isScrolling && activeSectionName === "section6"}
        />

        {/* NavigationBar is not rendered on mobile */}
        <section
          ref={section1Ref}
          className="h-screen w-screen flex flex-col justify-center items-center transition-opacity duration-700 ease-in-out relative"
          style={{ opacity: mobileSection1Opacity }}
          id="section-1-mobile"
        >
          {commonSection1Content}
        </section>

        <section
          ref={section2Ref}
          className="min-h-screen z-100  w-screen flex flex-col justify-center items-center transition-opacity duration-700 ease-in-out relative"
          style={{}}
          id="section-2-mobile"
        >
          {commonSection2Content}
        </section>
        <section
          ref={section3Ref}
          className="min-h-screen z-100  w-screen flex flex-col justify-center items-center transition-opacity duration-700 ease-in-out relative"
          style={{}}
          id="section-3-mobile"
        >
          {commonSection3Content}
        </section>
        <section
          ref={section4Ref}
          className="min-h-screen z-100  w-screen flex flex-col justify-center items-center transition-opacity duration-700 ease-in-out relative"
          style={{}}
          id="section-4-mobile"
        >
          {commonSection4Content}
        </section>
        <section
          ref={section5Ref}
          className="min-h-screen z-100  w-screen flex flex-col justify-center items-center transition-opacity duration-700 ease-in-out relative"
          style={{}}
          id="section-5-mobile"
        >
          {commonSection5Content}
        </section>
        <section
          ref={section6Ref}
          className="min-h-screen z-100  w-screen flex flex-col justify-center items-center transition-opacity duration-700 ease-in-out relative"
          style={{}}
          id="section-6-mobile"
        >
          {commonSection6Content}
        </section>
      </div>
    );
  }
};

export default Landing;
