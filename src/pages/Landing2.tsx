import { useState, useEffect } from "react";
import { AuroraBackground } from "../components/aceternity/aurora-background";
import ImageRodolfo3 from "../assets/rodolfo10.webp";
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
import { supabase } from "../lib/supabase";

interface ImageData {
  url: string;
}

interface VideoData {
  link: string;
  title: string;
  description: string;
}

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
  const [galleryImages, setGalleryImages] = useState<ImageData[]>([]);
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const [latestVideo, setLatestVideo] = useState<VideoData | null>(null);

  // Helper function to convert YouTube URLs to embed format
  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    // If it's already an embed URL, return as is
    if (url.includes("/embed/")) {
      return url;
    }

    // Convert watch URL to embed URL
    if (url.includes("watch?v=")) {
      const videoId = url.split("watch?v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Convert youtu.be URL to embed URL
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Return original URL if no conversion needed
    return url;
  };

  // Handle URL search params for direct section navigation
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get("section");
    if (
      section &&
      [
        "section1",
        "section2",
        "section3",
        "section4",
        "section5",
        "section6",
      ].includes(section)
    ) {
      setActiveTab(section as typeof activeTab);
      setCurrentMobileSection(section as typeof currentMobileSection);

      // For mobile, scroll to the section
      if (window.innerWidth < 1280) {
        setTimeout(() => {
          scrollToSection(`mobile-${section}`);
        }, 100);
      }
    }
  }, []);

  // Fetch gallery images from Supabase
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const { data, error } = await supabase
          .from("image")
          .select("url")
          .eq("type", "rodolfo-bio");

        if (error) {
          console.error("Error fetching gallery images:", error);
          return;
        }

        if (data) {
          setGalleryImages(data);
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    };

    fetchGalleryImages();
  }, []);

  // Fetch video data from Supabase
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const { data, error } = await supabase
          .from("video")
          .select("link, title, description")
          .eq("type", "rodolfo-bio")
          .order("created_at", { ascending: false })
          .limit(7);

        if (error) {
          console.error("Error fetching video data:", error);
          return;
        }

        if (data && data.length > 0) {
          // Set the latest video (first record)
          setLatestVideo(data[0]);

          // Set the remaining 6 videos for videoEmbeds
          const remainingVideos = data.slice(1, 7);
          setVideoData(remainingVideos);
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, []);

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
      onClick: () =>
        window.open("https://www.facebook.com/RodolfoAriasMinistry", "_blank"),
      className: dockItemClassName,
    },
    {
      icon: <BiLogoInstagramAlt />,
      label: "Instagram",
      onClick: () =>
        window.open("https://www.instagram.com/rodolfoarias77/", "_blank"),
      className: dockItemClassName,
    },

    {
      icon: <BiLogoTiktok />,
      label: "Tiktok",
      onClick: () =>
        window.open("https://www.tiktok.com/@rodolfoarias77", "_blank"),
      className: dockItemClassName,
    },
    {
      icon: <BiLogoYoutube />,
      label: "Youtube",
      onClick: () =>
        window.open("https://www.youtube.com/@RodolfoArias77", "_blank"),
      className: dockItemClassName,
    },
    {
      icon: <BiLogoSpotify />,
      label: "Spotify",
      onClick: () =>
        window.open(
          "https://open.spotify.com/show/4dWEpfB9KDGkQfjsiT8WAH?si=1060c6c6e1944a48",
          "_blank"
        ),
      className: dockItemClassName,
    },
    {
      icon: <BiLogoPaypal />,
      label: "Paypal",
      onClick: () =>
        window.open(
          "https://www.paypal.com/paypalme/ofrendayaenlinea?fbclid=PAZXh0bgNhZW0CMTEAAacKsCflfjoHsLt5rb9iRcpe84t49wBdI-F6MKqQhRLbUc9JxC3X_nPe8t8YvA_aem_0pVWiUFaSaYpNcZPnW4Rxw",
          "_blank"
        ),
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
      href: "https://www.facebook.com/RodolfoAriasMinistry",
    },
    {
      icon: <BiLogoInstagramAlt className="text-xl" />,
      title: "Instagram",
      href: "https://www.instagram.com/rodolfoarias77/",
    },

    {
      icon: <BiLogoTiktok className="text-xl" />,
      title: "Tiktok",
      href: "https://www.tiktok.com/@rodolfoarias77",
    },
    {
      icon: <BiLogoYoutube className="text-xl" />,
      title: "Youtube",
      href: "https://www.youtube.com/@RodolfoArias77",
    },
    {
      icon: <BiLogoSpotify className="text-xl" />,
      title: "Spotify",
      href: "https://open.spotify.com/show/4dWEpfB9KDGkQfjsiT8WAH?si=1060c6c6e1944a48",
    },
    {
      icon: <BiLogoPaypal className="text-xl" />,
      title: "Paypal",
      href: "https://www.paypal.com/paypalme/ofrendayaenlinea?fbclid=PAZXh0bgNhZW0CMTEAAacKsCflfjoHsLt5rb9iRcpe84t49wBdI-F6MKqQhRLbUc9JxC3X_nPe8t8YvA_aem_0pVWiUFaSaYpNcZPnW4Rxw",
    },
    {
      icon: <CustomIcon className="text-xl" />,
      title: "Gracia Plus",
      href: "https://graciaplus.com",
    },
  ];

  // Create video embeds from fetched data
  const videoEmbeds1 =
    videoData.length > 0
      ? videoData.slice(0, 3).map((video) => getEmbedUrl(video.link))
      : [
          "https://www.youtube.com/embed/ePxS7VW1eGc",
          "https://www.youtube.com/embed/ipym7qWmhck",
          "https://www.youtube.com/embed/Qvjv53w6Qe4", //CENTER
        ];

  const videoEmbeds2 =
    videoData.length > 3
      ? videoData.slice(3, 6).map((video) => getEmbedUrl(video.link))
      : [
          "https://www.youtube.com/embed/1yJIxiv_bcM",
          "https://www.youtube.com/embed/f-5XlB7EusQ",
          "https://www.youtube.com/embed/J59K9i3vxIU", //CENTER
        ];

  // Create infiniteMenuItems from fetched gallery images
  const infiniteMenuItems =
    galleryImages.length > 0
      ? galleryImages.map((image, index) => ({
          image: image.url,
          link: "https://www.facebook.com/RodolfoAriasMinistry",
          title: "",
          description: "",
        }))
      : [
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
            className={`pt-20 sm:pt-10  sm:pl-10 xl:pt-16 xl:pl-50 sm:flex-row  flex flex-col relative z-20 w- xl:w-screen  h-screen text-center `}
          >
            <div className="sm:self-stretch   sm:w-5/12 sm:flex-col xl:self-stretch  xl:w-5/12 xl:flex-col ">
              <div className=" flex flex-col  sm:mt-[25%]  px-6 sm:px-0    sm:justify-start sm:items-end items-center justify-center ">
                <h1 className="text-3xl lg:text-6xl xl:text-7xl  text-center sm:text-left font-bold text-black mb-2  ">
                  Rodolfo Arias
                  <p className="text-base lg:text-lg xl:text-xl mt-4 sm:text-left sm:max-w-none text-center font-extralight tracking-tight text-black max-w-2xl">
                    Predicador apasionado por la palabra <br /> de Dios con un
                    mensaje de
                    <br className="hidden xl:block" />
                    fe, esperanza y motivación.
                  </p>
                  <div className="mx-auto sm:mx-0  w-2/8 sm:w-1/6 h-1 mt-5 bg-black rounded-md " />
                </h1>
              </div>
            </div>
            <div className="  sm:absolute sm:top-0 sm:right-0 sm:w-9/12 sm:h-full xl:relative xl:flex-1 flex-1">
              <img
                src={ImageRodolfo3}
                alt="Rodolfo"
                className="w-full h-full object-cover sm:object-contain 2xl:object-contain "
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
                    src={
                      getEmbedUrl(latestVideo?.link || "") ||
                      "https://www.youtube.com/embed/hafl3je4T7c"
                    }
                    className="md:hidden w-full h-full rounded-lg aspect-video mb-10 md:mb-0"
                  ></iframe>
                  <h1 className="text-black text-sm md:text-lg tracking-tight font-medium text-start">
                    Mi último mensaje
                  </h1>
                  <h1 className="text-black text-3xl md:text-5xl tracking-tight font-bold text-start">
                    {latestVideo?.title || "Dios te bendiga en tu peor momento"}
                  </h1>
                  <p className="text-black text-sm tracking-tight font-light mt-4 text-start w-10/12  ">
                    {latestVideo?.description ||
                      "En los peores momentos, Dios prepara sus mayores victorias. Como David en el Salmo 34, podemos levantar adoración en medio de la prueba, sabiendo que lo mejor está por venir. ¡No te rindas, la promesa sigue en pie!"}
                  </p>
                  <div className="bg-transparent py-10  rounded-lg flex space-x-4 ">
                    <Folder size={1} color="#1e202e" items={videoEmbeds1} />
                    <Folder size={1} color="#1e202e" items={videoEmbeds2} />
                  </div>
                </div>
                <iframe
                  src={
                    getEmbedUrl(latestVideo?.link || "") ||
                    "https://www.youtube.com/embed/hafl3je4T7c"
                  }
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
            <div className=" z-10 pt-5 mb-10 w-full ">
              <img
                src={ImageBoat}
                alt="Paper Boat"
                className=" w-65 sm:w-65 md:w-70 mx-auto mb-10"
              />
              <div className="p-10 bg-white/10 backdrop-blur-6xl ring-1 ring-black/5 shadow-xl rounded-lg w-4/6 justify-center items-center mx-auto mt-6">
                <h1 className="text-black text-center text-3xl md:text-5xl tracking-tight font-bold">
                  Ministerio Rodolfo Arias
                </h1>
                <h3 className="text-black w-8/12 mx-auto text-sm tracking-tight font-light mt-4 text-center  ">
                  "Confía en el Señor de todo corazón y no te apoyes en tu
                  propia inteligencia. Reconócelo en todos tus caminos y él
                  enderezará tus sendas."
                </h3>
                <p className="text-black text-sm tracking-tight font-light mt-4 text-justify w-full md:w-10/12 mx-auto">
                  Rodolfo Arias es un joven costarricense apasionado por Dios,
                  convencido de que la verdadera transformación de la vida
                  comienza cuando el ser humano entrega su corazón completamente
                  a Cristo. Su fe no es una tradición, es una convicción
                  profunda: Dios es real, su amor es eterno, y su llamado es
                  para todos. Rodolfo cree firmemente que Jesús es el camino, la
                  verdad y la vida, y que sólo en Él hay salvación, restauración
                  y propósito.
                  <br />
                  <br />
                  Desde temprana edad, su pasión por conocer a Dios lo llevó a
                  sumergirse en la lectura constante de la Biblia y a
                  desarrollar una sensibilidad especial para comunicar el
                  mensaje del Evangelio de forma clara, directa y cercana. Hoy,
                  a través de los medios digitales, Dios ha abierto puertas
                  sorprendentes: sus mensajes diarios en TikTok y semanales en
                  YouTube alcanzan millones de personas, llevando luz y
                  esperanza a corazones que quizás nunca entrarían a un templo,
                  pero que desde sus dispositivos reciben palabra de vida.{" "}
                  <i>"Id, y haced discípulos a todas las naciones"</i> — Mateo
                  28:19.
                  <br />
                  <br />
                  Además, forma parte del ministerio de <i>Pura Vida FM</i>,
                  emisora cristiana con más de 8 años al aire en Costa Rica
                  (106.3 FM), desde donde miles de personas han sido edificadas
                  a lo largo de los años, tanto en transmisiones como en
                  eventos, conciertos y campañas de oración que han reunido a
                  más de 200,000 personas. No se trata solo de una radio, sino
                  de un movimiento de fe que sigue creciendo.
                  <br />
                  <br />
                  Con el deseo de poner herramientas prácticas en manos de los
                  creyentes, nace también <i>Gracia Plus</i>, una aplicación
                  móvil disponible en Apple y Android, donde los usuarios pueden
                  leer la Biblia, recibir versículos e imágenes diarias,
                  oraciones, escuchar la radio en vivo e interactuar con
                  distintos ministerios. Todo con un mismo propósito: que cada
                  persona tenga acceso a la Palabra y pueda crecer
                  espiritualmente, porque Rodolfo cree firmemente que la
                  relación con Dios es personal, diaria y transformadora.
                  <br />
                  <br />
                  Para Rodolfo, el amor es el fundamento del Evangelio. No
                  importa el trasfondo, la denominación, o la historia personal
                  de cada uno: Dios nos llama a amar sin condiciones, tal como
                  Jesús lo hizo.{" "}
                  <i>
                    "En esto conocerán todos que sois mis discípulos, si tenéis
                    amor los unos por los otros"
                  </i>{" "}
                  — Juan 13:35.
                  <br />
                  <br />
                  Su llamado es claro: levantar una generación que conozca a
                  Dios de verdad, no por religión, sino por experiencia;
                  personas dispuestas a vivir para Cristo y reflejar su gloria.
                  Porque como declara la Escritura:{" "}
                  <i>
                    "Porque yo sé los planes que tengo para vosotros, planes de
                    bienestar y no de mal, para daros un futuro y una esperanza"
                  </i>{" "}
                  — Jeremías 29:11.
                  <br />
                  <br />
                  Este es el corazón de Rodolfo Arias: predicar a Cristo,
                  levantar discípulos, y llevar esperanza a todo lugar donde
                  Dios abra una puerta. Y esto, apenas está comenzando.
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
                Disfrute de los mejores momentos del ministerio en la galería de
                fotos de Rodolfo Arias.
              </h3>
              <div
                id="infinite-menu-container"
                className="  flex-1  flex mt-10 "
              >
                <div className="px-4 w-full h-130 xl:h-150 md:px-20 relative mx-auto ">
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
                  <div className="bg-white/1  hover:scale-102 transition-all duration-300 relative px-0  backdrop-blur-6xl ring-1 ring-black/5 shadow-xl rounded-lg w-full h-full">
                    <img
                      src={ImagePuravida}
                      alt="Puravida"
                      className="w-full rounded-lg opacity-90 h-[40%] object-fill"
                    />
                    <div className="flex flex-col  h[40%] p-4 ">
                      <h1 className="text-black text-3xl tracking-tight font-semibold text-start">
                        Pura Vida FM
                      </h1>

                      <span className="mt-4 text-black text-sm tracking-tight font-thin text-start  flex-1 overflow-y-auto min-h-40 max-h-40">
                        Pura Vida FM 106.3 lleva más de 8 años al aire en Costa
                        Rica, compartiendo mensajes de fe, esperanza y buena
                        música para toda la familia. Estamos 24/7 acompañando a
                        miles de personas, con actividades que reúnen a muchos
                        en un mismo sentir. Más que una radio, somos una voz de
                        bendición cada día.
                      </span>
                    </div>
                    <div className="flex justify-end h-[12.5%] items-center   rounded-lg px-2">
                      <button
                        onClick={() =>
                          window.open("https://www.puravidafm.cr", "_blank")
                        }
                        className="rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer flex mr-2 items-center justify-center shadow-xl ring ring-black/5 size-12"
                      >
                        <BiGlobe className="text-black text-2xl" />
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            "https://www.facebook.com/PuraVida1063",
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
                  <div className="bg-white/1 hover:scale-102 transition-all duration-300 relative px-0  backdrop-blur-6xl ring-1 ring-black/5 shadow-xl rounded-lg w-full h-full">
                    <img
                      src={ImageTiktok}
                      alt="Puravida"
                      className="w-ful rounded-lg h-[40%] object-fill opacity-85"
                    />
                    <div className="flex flex-col  h[40%] p-4 ">
                      <h1 className="text-black text-3xl tracking-tight font-semibold text-start">
                        Contenido Digital
                      </h1>

                      <span className="mt-4 text-black text-sm tracking-tight font-thin text-start  flex-1 overflow-y-auto min-h-40 max-h-40">
                        Llevamos el mensaje de fe a cada plataforma. Creamos
                        TikToks con millones de vistas, podcasts en Spotify,
                        transmisiones en vivo por Facebook, TikTok y YouTube.
                        Con videos cortos y mensajes completos buscamos
                        inspirar, edificar y acercar más personas a Dios cada
                        día.
                      </span>
                    </div>
                    <div className="flex justify-end h-[12.5%] items-center   rounded-lg px-2">
                      <button
                        onClick={() =>
                          window.open(
                            "https://www.youtube.com/@RodolfoArias77",
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
                            "https://www.facebook.com/RodolfoAriasMinistry",
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
                            "https://www.tiktok.com/@rodolfoarias77",
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
                  <div className="bg-white/1 hover:scale-102 transition-all duration-300 relative px-0  backdrop-blur-6xl ring-1 ring-black/5 shadow-xl rounded-lg w-full h-full">
                    <img
                      src={ImageGraciaPlus}
                      alt="Puravida"
                      className="w-full rounded-lg opacity-85 h-[40%] object-fill"
                    />
                    <div className="flex flex-col  h[40%] p-4 ">
                      <h1 className="text-black text-3xl tracking-tight font-semibold text-start">
                        Puravida FM
                      </h1>

                      <span className="mt-4 text-black text-sm tracking-tight font-thin text-start  flex-1 overflow-y-auto min-h-40 max-h-40">
                        Gracia Plus es una aplicación móvil con miles de
                        descargas, diseñada para acompañarte cada día. Puedes
                        leer la Biblia, recibir imágenes y versículos diarios,
                        interactuar con nuestra radio en vivo y los programas al
                        aire. Además, encontrarás oraciones diarias que
                        fortalecen tu fe y te acercan más a Dios. Todo en un
                        solo lugar, siempre al alcance de tu mano.
                      </span>
                    </div>
                    <div className="flex justify-end h-[12.5%] items-center   rounded-lg px-2">
                      <button
                        onClick={() =>
                          window.open("https://graciaplus.com", "_blank")
                        }
                        className="rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer flex mr-2 items-center justify-center shadow-xl ring ring-black/5 size-12"
                      >
                        <BiGlobe className="text-black text-2xl" />
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            "https://play.google.com/store/apps/details?id=com.lobster.graciaplus&hl=es_CR",
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
                            "https://apps.apple.com/cr/app/gracia-plus/id6742936528?l=es-GB",
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
                    Puede apoyar nuestro ministerio a seguir creciendo e
                    inspirar a muchas más personas a conocer a Dios.
                  </span>
                  <button
                    className="size-10 rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer items-center justify-center flex bg-black mt-4 absolute bottom-2 right-2"
                    onClick={() =>
                      window.open(
                        "https://www.paypal.com/paypalme/ofrendayaenlinea",
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
                      alert(
                        "Puedes escribirnos al correo rodolfoarias77@gmail.com"
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
                      className={`pt-20 sm:pt-10 sm:pl-10 xl:pt-16 xl:pl-50 sm:flex-row  flex flex-col relative z-20 w-full  h-screen  text-center `}
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
                      <div className=" relative flex-1 overflow-hidden mt-2">
                        <img
                          src={ImageRodolfo3}
                          alt="Rodolfo"
                          className="w-full h-full object-contain sm:object-cover md:object-contain"
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
                              src={
                                getEmbedUrl(latestVideo?.link || "") ||
                                "https://www.youtube.com/embed/hafl3je4T7c"
                              }
                              className="md:hidden w-full h-full rounded-lg aspect-video mb-10 md:mb-0"
                            ></iframe>
                            <h1 className="text-black text-sm md:text-lg tracking-tight font-medium text-start">
                              Mi último mensaje
                            </h1>
                            <h1 className="text-black text-3xl md:text-5xl tracking-tight font-bold text-start">
                              {latestVideo?.title ||
                                "Dios te bendiga en tu peor momento"}
                            </h1>
                            <p className="text-black text-sm tracking-tight font-light mt-4 text-start w-10/12  ">
                              {latestVideo?.description ||
                                "En los peores momentos, Dios prepara sus mayores victorias. Como David en el Salmo 34, podemos levantar adoración en medio de la prueba, sabiendo que lo mejor está por venir. ¡No te rindas, la promesa sigue en pie!"}
                            </p>
                            <div className="bg-transparent py-10  rounded-lg flex space-x-4 ">
                              <Folder
                                size={1}
                                color="#1e202e"
                                items={videoEmbeds1}
                              />
                              <Folder
                                size={1}
                                color="#1e202e"
                                items={videoEmbeds2}
                              />
                            </div>
                          </div>
                          <iframe
                            src={
                              getEmbedUrl(latestVideo?.link || "") ||
                              "https://www.youtube.com/embed/hafl3je4T7c"
                            }
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
                            Ministerio <br /> Rodolfo Arias
                          </h1>
                          <h3 className="text-black text-sm tracking-tight font-light mt-4 text-center  ">
                            "Confía en el Señor de todo corazón y no te apoyes
                            en tu propia inteligencia. Reconócelo en todos tus
                            caminos y él enderezará tus sendas."
                          </h3>
                          <p className="text-black text-sm tracking-tight font-light  mt-4 text-justify w-full md:w-10/12 mx-auto  ">
                            Rodolfo Arias es un joven costarricense apasionado
                            por Dios, convencido de que la verdadera
                            transformación de la vida comienza cuando el ser
                            humano entrega su corazón completamente a Cristo. Su
                            fe no es una tradición, es una convicción profunda:
                            Dios es real, su amor es eterno, y su llamado es
                            para todos. Rodolfo cree firmemente que Jesús es el
                            camino, la verdad y la vida, y que sólo en Él hay
                            salvación, restauración y propósito.
                            <br />
                            <br />
                            Desde temprana edad, su pasión por conocer a Dios lo
                            llevó a sumergirse en la lectura constante de la
                            Biblia y a desarrollar una sensibilidad especial
                            para comunicar el mensaje del Evangelio de forma
                            clara, directa y cercana. Hoy, a través de los
                            medios digitales, Dios ha abierto puertas
                            sorprendentes: sus mensajes diarios en TikTok y
                            semanales en YouTube alcanzan millones de personas,
                            llevando luz y esperanza a corazones que quizás
                            nunca entrarían a un templo, pero que desde sus
                            dispositivos reciben palabra de vida.{" "}
                            <i>
                              "Id, y haced discípulos a todas las naciones"
                            </i>{" "}
                            — Mateo 28:19.
                            <br />
                            <br />
                            Además, forma parte del ministerio de{" "}
                            <i>Pura Vida FM</i>, emisora cristiana con más de 8
                            años al aire en Costa Rica (106.3 FM), desde donde
                            miles de personas han sido edificadas a lo largo de
                            los años, tanto en transmisiones como en eventos,
                            conciertos y campañas de oración que han reunido a
                            más de 200,000 personas. No se trata solo de una
                            radio, sino de un movimiento de fe que sigue
                            creciendo.
                            <br />
                            <br />
                            Con el deseo de poner herramientas prácticas en
                            manos de los creyentes, nace también{" "}
                            <i>Gracia Plus</i>, una aplicación móvil disponible
                            en Apple y Android, donde los usuarios pueden leer
                            la Biblia, recibir versículos e imágenes diarias,
                            oraciones, escuchar la radio en vivo e interactuar
                            con distintos ministerios. Todo con un mismo
                            propósito: que cada persona tenga acceso a la
                            Palabra y pueda crecer espiritualmente, porque
                            Rodolfo cree firmemente que la relación con Dios es
                            personal, diaria y transformadora.
                            <br />
                            <br />
                            Para Rodolfo, el amor es el fundamento del
                            Evangelio. No importa el trasfondo, la denominación,
                            o la historia personal de cada uno: Dios nos llama a
                            amar sin condiciones, tal como Jesús lo hizo.{" "}
                            <i>
                              "En esto conocerán todos que sois mis discípulos,
                              si tenéis amor los unos por los otros"
                            </i>{" "}
                            — Juan 13:35.
                            <br />
                            <br />
                            Su llamado es claro: levantar una generación que
                            conozca a Dios de verdad, no por religión, sino por
                            experiencia; personas dispuestas a vivir para Cristo
                            y reflejar su gloria. Porque como declara la
                            Escritura:{" "}
                            <i>
                              "Porque yo sé los planes que tengo para vosotros,
                              planes de bienestar y no de mal, para daros un
                              futuro y una esperanza"
                            </i>{" "}
                            — Jeremías 29:11.
                            <br />
                            <br />
                            Este es el corazón de Rodolfo Arias: predicar a
                            Cristo, levantar discípulos, y llevar esperanza a
                            todo lugar donde Dios abra una puerta. Y esto,
                            apenas está comenzando.
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
                          Disfrute de los mejores momentos del ministerio en la
                          galería de fotos de Rodolfo Arias.
                        </h3>
                        <div
                          id="infinite-menu-container"
                          className="  flex-1  mt-10  flex"
                        >
                          <div className="px-4 h-120 w-full  md:h-130 md:px-20 relative mx-auto ">
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
                              className="w-full aspect-video object-fit"
                            />
                            <div className="p-4">
                              <h2 className="text-black text-xl font-semibold text-left mb-2">
                                Pura Vida FM
                              </h2>
                              <p className="text-black text-sm text-left mb-4">
                                Pura Vida FM 106.3 lleva más de 8 años al aire
                                en Costa Rica, compartiendo mensajes de fe,
                                esperanza y buena música para toda la familia.
                                Estamos 24/7 acompañando a miles de personas,
                                con actividades que reúnen a muchos en un mismo
                                sentir. Más que una radio, somos una voz de
                                bendición cada día.
                              </p>
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() =>
                                    window.open(
                                      "https://www.puravidafm.cr",
                                      "_blank"
                                    )
                                  }
                                  className="rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 w-10 h-10 bg-white/50"
                                >
                                  <BiGlobe className="text-black text-lg" />
                                </button>
                                <button
                                  onClick={() =>
                                    window.open(
                                      "https://www.facebook.com/PuraVida1063",
                                      "_blank"
                                    )
                                  }
                                  className="rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 w-10 h-10 bg-white/50"
                                >
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
                              className="w-full aspect-video object-fit"
                            />
                            <div className="p-4">
                              <h2 className="text-black text-xl font-semibold text-left mb-2">
                                Contenido Digital
                              </h2>
                              <p className="text-black text-sm text-left mb-4">
                                Llevamos el mensaje de fe a cada plataforma.
                                Creamos TikToks con millones de vistas, podcasts
                                en Spotify, transmisiones en vivo por Facebook,
                                TikTok y YouTube. Con videos cortos y mensajes
                                completos buscamos inspirar, edificar y acercar
                                más personas a Dios cada día.
                              </p>
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() =>
                                    window.open(
                                      "https://www.youtube.com/@RodolfoArias77",
                                      "_blank"
                                    )
                                  }
                                  className="rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 w-10 h-10 bg-white/50"
                                >
                                  <BiLogoYoutube className="text-black text-lg" />
                                </button>
                                <button
                                  onClick={() =>
                                    window.open(
                                      "https://www.facebook.com/RodolfoAriasMinistry",
                                      "_blank"
                                    )
                                  }
                                  className="rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 w-10 h-10 bg-white/50"
                                >
                                  <BiLogoFacebookCircle className="text-black text-lg" />
                                </button>
                                <button
                                  onClick={() =>
                                    window.open(
                                      "https://www.tiktok.com/@rodolfoarias77",
                                      "_blank"
                                    )
                                  }
                                  className="rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 w-10 h-10 bg-white/50"
                                >
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
                              className="w-full aspect-video object-fit"
                            />
                            <div className="p-4">
                              <h2 className="text-black text-xl font-semibold text-left mb-2">
                                Gracia Plus
                              </h2>
                              <p className="text-black text-sm text-left mb-4">
                                Gracia Plus es una aplicación móvil que permite
                                leer la Biblia, recibir versículos e imágenes
                                diarias, oraciones, escuchar la radio en vivo e
                                interactuar con distintos ministerios. Todo con
                                un mismo propósito: que cada persona tenga
                                acceso a la Palabra y pueda crecer
                                espiritualmente.
                              </p>
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() =>
                                    window.open(
                                      "https://graciaplus.com",
                                      "_blank"
                                    )
                                  }
                                  className="rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 w-10 h-10 bg-white/50"
                                >
                                  <BiGlobe className="text-black text-lg" />
                                </button>
                                <button
                                  onClick={() =>
                                    window.open(
                                      "https://play.google.com/store/apps/details?id=com.lobster.graciaplus&hl=es_CR",
                                      "_blank"
                                    )
                                  }
                                  className="rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 w-10 h-10 bg-white/50"
                                >
                                  <BiLogoAndroid className="text-black text-lg" />
                                </button>
                                <button
                                  onClick={() =>
                                    window.open(
                                      "https://apps.apple.com/cr/app/gracia-plus/id6742936528?l=es-GB",
                                      "_blank"
                                    )
                                  }
                                  className="rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5 w-10 h-10 bg-white/50"
                                >
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
                        Con tus donaciones, puedes apoyar nuestro ministerio a
                        seguir creciendo y expandir el mensaje de Dios a todo el
                        mundo.
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
                                    "https://www.paypal.com/paypalme/ofrendayaenlinea",
                                    "_blank"
                                  )
                                }
                              >
                                <BiRightArrowAlt className="text-white w-6 h-6 -rotate-45" />
                              </button>
                            </h1>
                            <span className="text-black text-sm tracking-tight font-light mt-2 text-left">
                              Puede apoyar nuestro ministerio a seguir creciendo
                              e inspirar a muchas más personas a conocer a Dios.
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
                                  alert(
                                    "Puedes escribirnos al correo rodolfoarias77@gmail.com"
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
                          className="h-8 w-auto object-contain absolute left-4 bottom-15"
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
        <div
          className={`${
            currentMobileSection == "section1"
              ? "hidden"
              : "block xl:hidden fixed top-3 left-1/2 transform -translate-x-1/2 z-110"
          }`}
        >
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
