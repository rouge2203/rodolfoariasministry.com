// import React, { useState } from "react";

// interface FolderProps {
//   /**
//    * An array of YouTube URLs (e.g. "https://www.youtube.com/watch?v=hafl3je4T7c"
//    * or "https://www.youtube.com/embed/hafl3je4T7c"). Each will render its thumbnail.
//    */
//   items?: string[];
//   /** Base color of the folder (hex). */
//   color?: string;
//   /** Scale factor for the entire folder. */
//   size?: number;
//   /** Additional tailwind or custom classes. */
//   className?: string;
// }

// const darkenColor = (hex: string, percent: number): string => {
//   let color = hex.startsWith("#") ? hex.slice(1) : hex;
//   if (color.length === 3) {
//     color = color
//       .split("")
//       .map((c) => c + c)
//       .join("");
//   }
//   const num = parseInt(color, 16);
//   let r = (num >> 16) & 0xff;
//   let g = (num >> 8) & 0xff;
//   let b = num & 0xff;
//   r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
//   g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
//   b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
//   return (
//     "#" +
//     ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
//   );
// };

// /**
//  * Extracts a YouTube video ID from either a "watch?v=ID" URL or an "/embed/ID" URL.
//  * Returns null if no ID could be found.
//  */
// function extractYouTubeID(url: string): string | null {
//   try {
//     const parsed = new URL(url);
//     // watch?v=ID
//     if (parsed.searchParams.has("v")) {
//       return parsed.searchParams.get("v");
//     }
//     // /embed/ID
//     const paths = parsed.pathname.split("/");
//     const embedIdx = paths.indexOf("embed");
//     if (embedIdx !== -1 && paths.length > embedIdx + 1) {
//       return paths[embedIdx + 1];
//     }
//     return null;
//   } catch {
//     return null;
//   }
// }

// const Folder: React.FC<FolderProps> = ({
//   color = "#00d8ff",
//   size = 1,
//   items = [],
//   className = "",
// }) => {
//   const maxItems = 3;
//   // Take up to 3 YouTube URLs (fill with empty strings to ensure length = 3)
//   const urls = items.slice(0, maxItems);
//   while (urls.length < maxItems) {
//     urls.push("");
//   }

//   const [open, setOpen] = useState(false);
//   const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
//     Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
//   );

//   const folderBackColor = darkenColor(color, 0.08);
//   const paper1 = darkenColor("#ffffff", 0.1);
//   const paper2 = darkenColor("#ffffff", 0.05);
//   const paper3 = "#ffffff";

//   const handleClick = () => {
//     setOpen((prev) => !prev);
//     if (open) {
//       // Reset offsets when closing
//       setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
//     }
//   };

//   const handlePaperMouseMove = (
//     e: React.MouseEvent<HTMLDivElement, MouseEvent>,
//     index: number
//   ) => {
//     if (!open) return;
//     const rect = e.currentTarget.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
//     const offsetX = (e.clientX - centerX) * 0.15;
//     const offsetY = (e.clientY - centerY) * 0.15;
//     setPaperOffsets((prev) => {
//       const newOffsets = [...prev];
//       newOffsets[index] = { x: offsetX, y: offsetY };
//       return newOffsets;
//     });
//   };

//   const handlePaperMouseLeave = (
//     e: React.MouseEvent<HTMLDivElement, MouseEvent>,
//     index: number
//   ) => {
//     setPaperOffsets((prev) => {
//       const newOffsets = [...prev];
//       newOffsets[index] = { x: 0, y: 0 };
//       return newOffsets;
//     });
//   };

//   const folderStyle: React.CSSProperties = {
//     "--folder-color": color,
//     "--folder-back-color": folderBackColor,
//     "--paper-1": paper1,
//     "--paper-2": paper2,
//     "--paper-3": paper3,
//   } as React.CSSProperties;

//   // Scale wrapper
//   const scaleStyle = { transform: `scale(${size})` };

//   const getOpenTransform = (index: number) => {
//     if (index === 0) return "translate(-120%, -70%) rotate(-15deg)";
//     if (index === 1) return "translate(10%, -70%) rotate(15deg)";
//     if (index === 2) return "translate(-50%, -100%) rotate(5deg)";
//     return "";
//   };

//   return (
//     <div style={scaleStyle} className={className}>
//       <div
//         className={`group relative transition-all duration-200 ease-in cursor-pointer ${
//           !open ? "hover:-translate-y-2" : ""
//         }`}
//         style={{
//           ...folderStyle,
//           transform: open ? "translateY(-8px)" : undefined,
//         }}
//         onClick={handleClick}
//       >
//         <div
//           className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
//           style={{ backgroundColor: folderBackColor }}
//         >
//           <span
//             className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"
//             style={{ backgroundColor: folderBackColor }}
//           />

//           {/* Render up to 3 “paper” thumbnails */}
//           {urls.map((youtubeUrl, i) => {
//             // Compute thumbnail URL or fallback to empty string
//             const videoID = extractYouTubeID(youtubeUrl);
//             const thumbnailURL = videoID
//               ? `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`
//               : "";

//             // Size classes for each of the three “papers”
//             let sizeClasses = "";
//             if (i === 0)
//               sizeClasses = open ? "w-[70%] h-[80%]" : "w-[70%] h-[80%]";
//             if (i === 1)
//               sizeClasses = open ? "w-[80%] h-[80%]" : "w-[80%] h-[70%]";
//             if (i === 2)
//               sizeClasses = open ? "w-[90%] h-[80%]" : "w-[90%] h-[60%]";

//             // If folder is open, apply 3D offset + rotation + mouse‐move offset
//             const transformStyle = open
//               ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${
//                   paperOffsets[i].y
//                 }px)`
//               : undefined;

//             // Paper background colors
//             const paperColor = i === 0 ? paper1 : i === 1 ? paper2 : paper3;

//             return (
//               <div
//                 key={i}
//                 onMouseMove={(e) => handlePaperMouseMove(e, i)}
//                 onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
//                 className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out ${
//                   !open
//                     ? "transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0"
//                     : "hover:scale-110"
//                 } ${sizeClasses}`}
//                 style={{
//                   ...(!open ? {} : { transform: transformStyle }),
//                   backgroundColor: paperColor,
//                   borderRadius: "10px",
//                   overflow: "hidden",
//                 }}
//               >
//                 {thumbnailURL ? (
//                   <img
//                     src={thumbnailURL}
//                     alt={`YouTube thumbnail ${i + 1}`}
//                     className="w-full h-full object-cover"
//                     draggable={false}
//                   />
//                 ) : null}
//               </div>
//             );
//           })}

//           {/* Folder Top‐Skew Layers */}
//           <div
//             className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
//               !open ? "group-hover:[transform:skew(15deg)_scaleY(0.6)]" : ""
//             }`}
//             style={{
//               backgroundColor: color,
//               borderRadius: "5px 10px 10px 10px",
//               ...(open && { transform: "skew(15deg) scaleY(0.6)" }),
//             }}
//           />
//           <div
//             className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
//               !open ? "group-hover:[transform:skew(-15deg)_scaleY(0.6)]" : ""
//             }`}
//             style={{
//               backgroundColor: color,
//               borderRadius: "5px 10px 10px 10px",
//               ...(open && { transform: "skew(-15deg) scaleY(0.6)" }),
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Folder;

// src/components/reactbits/Folder.tsx

// src/components/reactbits/Folder.tsx

import React, { useState } from "react";
import { RiYoutubeFill } from "react-icons/ri";

interface FolderProps {
  /**
   * An array of YouTube URLs (e.g. "https://www.youtube.com/watch?v=hafl3je4T7c"
   * or "https://www.youtube.com/embed/hafl3W9WgXcQ"). Each will render its thumbnail.
   */
  items?: string[];
  /** Base color of the folder (hex). */
  color?: string;
  /** Scale factor for the entire folder. */
  size?: number;
  /** Additional Tailwind (or custom) classes. */
  className?: string;
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

/**
 * Extracts a YouTube video ID from either a "watch?v=ID" URL or an "/embed/ID" URL.
 * Returns null if no ID could be found.
 */
function extractYouTubeID(url: string): string | null {
  try {
    const parsed = new URL(url);
    // watch?v=ID
    if (parsed.searchParams.has("v")) {
      return parsed.searchParams.get("v");
    }
    // /embed/ID
    const paths = parsed.pathname.split("/");
    const embedIdx = paths.indexOf("embed");
    if (embedIdx !== -1 && paths.length > embedIdx + 1) {
      return paths[embedIdx + 1];
    }
    return null;
  } catch {
    return null;
  }
}

const Folder: React.FC<FolderProps> = ({
  color = "#00d8ff",
  size = 1,
  items = [],
  className = "",
}) => {
  const maxItems = 3;
  // Take up to 3 YouTube URLs (pad with empty strings if fewer)
  const urls = items.slice(0, maxItems);
  while (urls.length < maxItems) {
    urls.push("");
  }

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor("#ffffff", 0.1);
  const paper2 = darkenColor("#ffffff", 0.05);
  const paper3 = "#ffffff";

  const handleClick = () => {
    setOpen((prev) => !prev);
    if (open) {
      // Reset offsets when closing
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setPaperOffsets((prev) => {
      console.log("...", e);
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const folderStyle: React.CSSProperties = {
    "--folder-color": color,
    "--folder-back-color": folderBackColor,
    "--paper-1": paper1,
    "--paper-2": paper2,
    "--paper-3": paper3,
  } as React.CSSProperties;

  // Scale wrapper
  const scaleStyle = { transform: `scale(${size})` };

  const getOpenTransform = (index: number) => {
    if (index === 0) return "translate(-120%, -70%) rotate(-15deg)";
    if (index === 1) return "translate(10%, -70%) rotate(15deg)";
    if (index === 2) return "translate(-50%, -100%) rotate(5deg)";
    return "";
  };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={`group relative transition-all duration-200 ease-in cursor-pointer ${
          !open ? "hover:-translate-y-2" : ""
        }`}
        style={{
          ...folderStyle,
          transform: open ? "translateY(-8px)" : undefined,
        }}
        onClick={handleClick}
      >
        {/* Centered YouTube logo (white) */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
          <RiYoutubeFill className="text-white w-8 h-8" />
        </div>

        <div
          className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"
            style={{ backgroundColor: folderBackColor }}
          />

          {/* Render up to 3 “paper” thumbnails */}
          {urls.map((youtubeUrl, i) => {
            // Compute video ID and thumbnail URL
            const videoID = youtubeUrl ? extractYouTubeID(youtubeUrl) : null;
            const thumbnailURL = videoID
              ? `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`
              : "";

            // Build the watch URL (if embed, convert to watch; if already watch, use it)
            let watchURL = "";
            if (videoID) {
              if (youtubeUrl.includes("watch?v=")) {
                watchURL = youtubeUrl;
              } else {
                watchURL = `https://www.youtube.com/watch?v=${videoID}`;
              }
            }

            // Size classes for each of the three “papers”
            let sizeClasses = "";
            if (i === 0)
              sizeClasses = open ? "w-[70%] h-[80%]" : "w-[70%] h-[80%]";
            if (i === 1)
              sizeClasses = open ? "w-[80%] h-[80%]" : "w-[80%] h-[70%]";
            if (i === 2)
              sizeClasses = open ? "w-[90%] h-[80%]" : "w-[90%] h-[60%]";

            // If folder is open, apply 3D offset + rotation + mouse‐move offset
            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${
                  paperOffsets[i].y
                }px)`
              : undefined;

            // Paper background colors
            const paperColor = i === 0 ? paper1 : i === 1 ? paper2 : paper3;

            return (
              <div
                key={i}
                onMouseMove={(e) => handlePaperMouseMove(e, i)}
                onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
                className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out ${
                  !open
                    ? "transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0"
                    : "hover:scale-110"
                } ${sizeClasses}`}
                style={{
                  ...(!open ? {} : { transform: transformStyle }),
                  backgroundColor: paperColor,
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (watchURL) window.open(watchURL, "_blank");
                }}
              >
                {thumbnailURL ? (
                  <img
                    src={thumbnailURL}
                    alt={`YouTube thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : null}
              </div>
            );
          })}

          {/* Folder Top‐Skew Layers */}
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? "group-hover:[transform:skew(15deg)_scaleY(0.6)]" : ""
            }`}
            style={{
              backgroundColor: color,
              borderRadius: "5px 10px 10px 10px",
              ...(open && { transform: "skew(15deg) scaleY(0.6)" }),
            }}
          />
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? "group-hover:[transform:skew(-15deg)_scaleY(0.6)]" : ""
            }`}
            style={{
              backgroundColor: color,
              borderRadius: "5px 10px 10px 10px",
              ...(open && { transform: "skew(-15deg) scaleY(0.6)" }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Folder;
