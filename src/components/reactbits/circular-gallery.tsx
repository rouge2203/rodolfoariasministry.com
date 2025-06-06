import React, { useRef, useEffect, useState, type MouseEvent } from "react";

interface CircularGalleryProps {
  /**
   * An array of YouTube URLs. These can be either:
   *  - Standard watch URLs, e.g. "https://www.youtube.com/watch?v=hafl3je4T7c"
   *  - Embed URLs, e.g.     "https://www.youtube.com/embed/hafl3je4T7c"
   *
   * The component will extract the video ID (hafl3je4T7c) automatically,
   * build the thumbnail URL, and render it.
   */
  items: string[];
  /**
   * (Optional) Tailwind class for the width of each thumbnail container.
   * Default is "w-64" (16rem, or 256px). You can pass any other Tailwind width
   * utility (e.g. "w-48", "w-80") or a custom CSS string like "300px".
   */
  itemWidthClass?: string;
  /**
   * (Optional) Padding around each thumbnail. Default is "p-2" (0.5rem).
   */
  itemPaddingClass?: string;
  /**
   * (Optional) Gap between thumbnails. Default is "gap-4" (1rem).
   * You can override to "gap-2" or "gap-6", etc.
   */
  gapClass?: string;
  /**
   * (Optional) If true, the gallery will scroll in a continuous loop
   * (i.e. after the last thumbnail it jumps back to the first). Default is false.
   * NOTE: Enabling looping requires duplicating the thumbnails and some extra logic.
   * For now, we’ll leave it false for simplicity.
   */
  loop?: boolean;
}

export default function CircularGallery({
  items,
  itemWidthClass = "w-64", // default: 16rem width
  itemPaddingClass = "p-2", // default: 0.5rem padding
  gapClass = "gap-4", // default: 1rem gap between items
  loop = false, // no looping by default
}: CircularGalleryProps) {
  // -------------------------------------------------------------
  // 1) Refs & State to handle dragging‐to‐scroll
  // -------------------------------------------------------------
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Are we currently dragging?
  const [isDragging, setIsDragging] = useState(false);

  // The X‐coordinate where the drag started (in pageX)
  const [startX, setStartX] = useState(0);

  // The container’s scrollLeft at the moment the drag started
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  // -------------------------------------------------------------
  // 2) Utility: Extract YouTube Video ID from a URL
  // -------------------------------------------------------------
  function extractYouTubeID(url: string): string | null {
    try {
      const parsed = new URL(url);
      // If it's a "watch?v=ID" URL
      if (parsed.searchParams.has("v")) {
        return parsed.searchParams.get("v");
      }
      // If it's an "/embed/ID" URL
      const paths = parsed.pathname.split("/");
      const embedIndex = paths.indexOf("embed");
      if (embedIndex !== -1 && paths.length > embedIndex + 1) {
        return paths[embedIndex + 1];
      }
      return null;
    } catch {
      return null;
    }
  }

  // -------------------------------------------------------------
  // 3) Build a list of videos: { id, thumbnailURL, watchURL }
  // -------------------------------------------------------------
  const videoList = items
    .map((rawUrl) => {
      const id = extractYouTubeID(rawUrl.trim());
      if (!id) return null;

      return {
        id,
        // YouTube's high‐quality default thumbnail:
        thumbnailURL: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
        // The actual watch URL:
        watchURL: `https://www.youtube.com/watch?v=${id}`,
      };
    })
    .filter((x): x is { id: string; thumbnailURL: string; watchURL: string } =>
      Boolean(x)
    );

  // If loop = true, we duplicate the array so scrolling can wrap.
  // (For simplicity, though, we won’t implement full “infinite wrap” logic here.
  // That requires detecting if the user scrolled past halfway and teleporting back.
  // Most apps simply duplicate the thumbnails end‐to‐start so that visually it loops.)
  const displayVideos = loop ? [...videoList, ...videoList] : videoList;

  // -------------------------------------------------------------
  // 4) Drag‐to‐Scroll Handlers
  // -------------------------------------------------------------
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeftStart(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const dx = e.pageX - startX; // how far we’ve moved since the drag started
    containerRef.current.scrollLeft = scrollLeftStart - dx;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // -------------------------------------------------------------
  // 5) Attach window‐level listeners so that if we drag outside the
  //    container, we still correctly end the drag.
  // -------------------------------------------------------------
  useEffect(() => {
    function onWindowMouseMove(e: MouseEvent) {
      if (!isDragging || !containerRef.current) return;
      e.preventDefault();
      const dx = e.pageX - startX;
      containerRef.current.scrollLeft = scrollLeftStart - dx;
    }
    function onWindowMouseUp() {
      setIsDragging(false);
    }

    if (isDragging) {
      window.addEventListener("mousemove", onWindowMouseMove as any);
      window.addEventListener("mouseup", onWindowMouseUp);
    } else {
      window.removeEventListener("mousemove", onWindowMouseMove as any);
      window.removeEventListener("mouseup", onWindowMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onWindowMouseMove as any);
      window.removeEventListener("mouseup", onWindowMouseUp);
    };
  }, [isDragging, startX, scrollLeftStart]);

  // -------------------------------------------------------------
  // 6) Render
  // -------------------------------------------------------------
  return (
    <div
      ref={containerRef}
      className={`
        relative
        w-full
        overflow-x-auto
        overflow-y-hidden
        whitespace-nowrap
        select-none
        ${gapClass}           /* e.g. gap-4 between items */
      `}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        // Hide native scrollbar (Webkit, Firefox, IE10+)
        scrollbarWidth: "none" /* Firefox */,
        msOverflowStyle: "none" /* IE 10+ */,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      // You can leave onWheel to default, or uncomment below to manually tweak:
      // onWheel={(e) => {
      //   e.preventDefault();
      //   if (containerRef.current) {
      //     containerRef.current.scrollLeft += e.deltaY;
      //   }
      // }}
    >
      {/* Map over each video and render a thumbnail */}
      {displayVideos.map((video) => (
        <div
          key={video.id + (loop ? Math.random().toString() : "")}
          /* If loop=true, we want unique keys for the duplicates, so append random */
          className={`
            inline-block
            flex-shrink-0
            ${itemWidthClass}       /* e.g. w-64 */
            aspect-video             /* enforce 16:9 aspect ratio */
            ${itemPaddingClass}      /* e.g. p-2 */
          `}
        >
          {/* 
            We wrap <img> in a <button>‐like <div> so that 
            clicking the entire area (including any overlay) triggers navigation.
          */}
          <div
            className="w-full h-full relative cursor-pointer overflow-hidden rounded-lg
                       shadow-md transition-transform duration-200 ease-in-out
                       hover:scale-105"
            onClick={() => {
              window.open(video.watchURL, "_blank");
            }}
          >
            <img
              src={video.thumbnailURL}
              alt={`YouTube thumbnail for ${video.id}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* 
              Optionally, you can overlay a play‐icon at center 
              so it looks more “video‐like.” For example: 
            */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                className="w-12 h-12 text-white opacity-80"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
