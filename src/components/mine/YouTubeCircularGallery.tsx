// src/components/YouTubeCircularGallery.tsx
import React, { useRef, useState, useEffect, type MouseEvent } from "react";

interface YouTubeCircularGalleryProps {
  /**
   * An array of YouTube embed URLs (e.g. "https://www.youtube.com/embed/hafl3je4T7c")
   * The component will extract the video ID ("hafl3je4T7c") internally.
   */
  items: string[];
  /**
   * (Optional) Height of each thumbnail item.
   * Default is 200px. You can pass something like "h-48" if using Tailwind,
   * or any valid CSS height (e.g. "250px").
   */
  itemHeight?: string;
  /**
   * (Optional) Width of each thumbnail item.
   * Default is 320px. You can change to any Tailwind width (e.g. "w-56") or px value.
   */
  itemWidth?: string;
  /**
   * (Optional) Gap between each thumbnail.
   * Default is "gap-4" (1rem). You can use any Tailwind gap utility (e.g. "gap-6") or px value.
   */
  gapClass?: string;
}

/**
 * Utility: Given a YouTube embed URL (e.g. "https://www.youtube.com/embed/VIDEO_ID"),
 * extract just the VIDEO_ID. If the URL doesn’t match the expected pattern, returns null.
 */
function extractYouTubeID(embedUrl: string): string | null {
  try {
    // We expect a URL like "https://www.youtube.com/embed/<ID>"
    const parsed = new URL(embedUrl);
    // pathname might be "/embed/VIDEO_ID"
    const parts = parsed.pathname.split("/");
    const idx = parts.indexOf("embed");
    if (idx !== -1 && parts.length > idx + 1) {
      return parts[idx + 1];
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * YouTubeCircularGallery
 *
 * Renders a horizontally scrollable, drag‐to‐scroll gallery of YouTube thumbnails.
 * On hover → shows `cursor‐grab`. On mouse‐down (drag) → `cursor‐grabbing`.
 * Clicking a thumbnail → opens the video on youtube.com/watch?v=<ID> in a new tab.
 */
export default function YouTubeCircularGallery({
  items,
  itemHeight = "200px",
  itemWidth = "320px",
  gapClass = "gap-4",
}: YouTubeCircularGalleryProps) {
  // ref to the scrollable container
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track whether the user is currently dragging
  const [isDragging, setIsDragging] = useState(false);

  // Position where the mouse/touch started (in pageX)
  const [startX, setStartX] = useState(0);

  // ScrollLeft of the container at the moment dragging started
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  /**
   * onMouseDown (or onTouchStart):
   *   - Mark that dragging has started
   *   - Record the initial pageX
   *   - Record the container’s current scrollLeft
   */
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    e.preventDefault();

    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeftStart(containerRef.current.scrollLeft);
  };

  /**
   * onMouseMove (while dragging):
   *   - Compute how far the mouse has moved since onMouseDown
   *   - Scroll the container by that delta
   */
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();

    const dx = e.pageX - startX; // how far mouse moved from the start
    containerRef.current.scrollLeft = scrollLeftStart - dx;
  };

  /**
   * onMouseUp / onMouseLeave:
   *   - End dragging
   */
  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  /**
   * While scrolling with the wheel, we’ll let the default browser
   * scroll behavior happen (it’s already smooth in most modern browsers).
   * If you want to “tune” it, you can intercept the wheel event,
   * do `e.preventDefault()` and manually adjust `scrollLeft` (e.g. +20 px),
   * but most times you can just let the browser handle it natively.
   */

  /**
   * Compute a list of objects { id, thumbnail, watchUrl } by extracting each video ID.
   */
  const videos = items
    .map((embedUrl) => {
      const id = extractYouTubeID(embedUrl);
      if (!id) return null;
      return {
        id,
        // YouTube high‐quality thumbnail:
        thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
        // The clickable link to open on click:
        watchUrl: `https://www.youtube.com/watch?v=${id}`,
      };
    })
    .filter((x): x is { id: string; thumbnail: string; watchUrl: string } =>
      Boolean(x)
    );

  /**
   * Add/remove event listeners for mousemove and mouseup on the entire window,
   * so that even if the user drags outside the container, we can still end the drag.
   */
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      e.preventDefault();

      const dx = e.pageX - startX;
      containerRef.current.scrollLeft = scrollLeftStart - dx;
    };

    const handleWindowMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleWindowMouseMove as any);
      window.addEventListener("mouseup", handleWindowMouseUp);
    } else {
      window.removeEventListener("mousemove", handleWindowMouseMove as any);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove as any);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [isDragging, startX, scrollLeftStart]);

  return (
    <div
      ref={containerRef}
      // Container styles:
      //   - flex + inline‐flex so children line up in a row
      //   - overflow‐x‐auto for horizontal scroll
      //   - no vertical scroll
      //   - hide native scrollbar (optional)
      //   - `cursor‐grab` on hover, `cursor‐grabbing` while dragging
      className={`
        relative
        w-full
        overflow-x-auto
        overflow-y-hidden
        whitespace-nowrap
        select-none
        ${gapClass}
      `}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        // Hide scrollbar for WebKit / Chrome / Safari:
        scrollbarWidth: "none" /* Firefox */,
        msOverflowStyle: "none" /* IE 10+ */,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      // Note: We don’t need onMouseMove here because we delegate it to window during drag
      onWheel={(e) => {
        // Optional: we can leave it to the browser’s native smooth scroll.
        // But if you want to “slow it down,” uncomment the code below:
        // e.preventDefault();
        // const container = containerRef.current;
        // if (container) container.scrollLeft += e.deltaY; // deltaY is usually +/- 100
      }}
    >
      {videos.map((video) => (
        <div
          key={video.id}
          className="inline-block flex-shrink-0"
          style={{
            width: itemWidth,
            height: itemHeight,
            position: "relative",
            marginRight: "0", // we’ll use gapClass for spacing
          }}
        >
          <img
            src={video.thumbnail}
            alt={`Thumbnail for ${video.id}`}
            className={`
              w-full
              h-full
              object-cover
              rounded-lg
              transition-transform
              duration-200
              ease-in-out
              hover:scale-105
            `}
            onClick={() => {
              window.open(video.watchUrl, "_blank");
            }}
            style={{ userSelect: "none" }}
          />
        </div>
      ))}
    </div>
  );
}
