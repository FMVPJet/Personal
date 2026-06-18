"use client";

import React, { useEffect, useRef } from "react";
import maplibregl, { StyleSpecification } from "maplibre-gl";
import { useTheme } from "next-themes";
import Image from "next/image";

// Free CartoDB raster tiles — no API key required (attribution required)
const buildStyle = (dark: boolean): StyleSpecification => ({
  version: 8,
  sources: {
    carto: {
      type: "raster",
      tiles: [
        `https://a.basemaps.cartocdn.com/${dark ? "dark_all" : "light_all"}/{z}/{x}/{y}@2x.png`,
        `https://b.basemaps.cartocdn.com/${dark ? "dark_all" : "light_all"}/{z}/{x}/{y}@2x.png`,
        `https://c.basemaps.cartocdn.com/${dark ? "dark_all" : "light_all"}/{z}/{x}/{y}@2x.png`,
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
  },
  layers: [
    {
      id: "carto-layer",
      type: "raster",
      source: "carto",
      minzoom: 0,
      maxzoom: 22,
    },
  ],
});

const MapComponent: React.FC = () => {
  const { theme } = useTheme();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  // Create map once
  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: buildStyle(theme === "dark"),
      center: [113.6254, 34.7466],
      zoom: 10,
      attributionControl: { compact: true },
    });

    map.addControl(new maplibregl.NavigationControl(), "bottom-right");

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Switch tile theme without recreating the map
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setStyle(buildStyle(theme === "dark"));
  }, [theme]);

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden">
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />
      <div
        className="no-drag absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            flex items-center justify-center pointer-events-none
            w-14 h-14 md:w-20 md:h-20 rounded-full
            shadow-lg bg-blue-400/40 border-2 md:border-4 border-white/80 hover:animate-pulse"
      >
        <Image
          alt="Location"
          className="w-8 h-8 md:w-10 md:h-10"
          height={300}
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Hugging%20Face.png"
          width={300}
        />
      </div>
    </div>
  );
};

export default MapComponent;
