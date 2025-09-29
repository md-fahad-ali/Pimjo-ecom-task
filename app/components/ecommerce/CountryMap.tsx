"use client";
import React, { useEffect, useState } from "react";
import { worldMill } from "@react-jvectormap/world";
import dynamic from "next/dynamic";

const VectorMap = dynamic(
  () => import("@react-jvectormap/core").then((mod) => mod.VectorMap),
  { ssr: false }
);

// Define the component props
interface CountryMapProps {
  mapColor?: string;
  mobileScale?: number;   // default zoom for small screens
  desktopScale?: number;  // default zoom for >= sm screens
}

type MarkerStyle = {
  initial: {
    fill: string;
    r: number; // Radius for markers
  };
};

type Marker = {
  latLng: [number, number];
  name: string;
  style?: {
    fill: string;
    borderWidth: number;
    borderColor: string;
    stroke?: string;
    strokeOpacity?: number;
  };
};

const CountryMap: React.FC<CountryMapProps> = ({ mapColor, mobileScale = 0.3, desktopScale = 1 }) => {
  const [scale, setScale] = useState<number>(mobileScale);

  useEffect(() => {
    // Match Tailwind's sm breakpoint (640px)
    const mq = window.matchMedia("(min-width: 640px)");
    const apply = (e: MediaQueryList | MediaQueryListEvent) => {
      const isDesktop = "matches" in e ? e.matches : (e as MediaQueryList).matches;
      setScale(isDesktop ? desktopScale : mobileScale);
    };
    apply(mq);
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, [mobileScale, desktopScale]);

  return (
    <div className="w-full h-full">
      <VectorMap
        map={worldMill}
        backgroundColor="transparent"
        focusOn={{ x: 0.5, y: 0.5, scale, animate: false }}
        markerStyle={
        {
          initial: {
            fill: "#465FFF",
            r: 4, // Custom radius for markers
          }, // Type assertion to bypass strict CSS property checks
        } as MarkerStyle
        }
        markersSelectable={true}
        markers={
        [
          {
            latLng: [37.2580397, -104.657039],
            name: "United States",
            style: {
              fill: "#465FFF",
              borderWidth: 1,
              borderColor: "white",
              stroke: "#383f47",
            },
          },
          {
            latLng: [20.7504374, 73.7276105],
            name: "India",
            style: { fill: "#465FFF", borderWidth: 1, borderColor: "white" },
          },
          {
            latLng: [53.613, -11.6368],
            name: "United Kingdom",
            style: { fill: "#465FFF", borderWidth: 1, borderColor: "white" },
          },
          {
            latLng: [-25.0304388, 115.2092761],
            name: "Sweden",
            style: {
              fill: "#465FFF",
              borderWidth: 1,
              borderColor: "white",
              strokeOpacity: 0,
            },
          },
        ] as Marker[]
        }
        zoomOnScroll={false}
        zoomMax={8}
        zoomMin={1}
        zoomAnimate={true}
        zoomStep={1.5}
        regionStyle={{
        initial: {
          fill: mapColor || "#D0D5DD",
          fillOpacity: 1,
          fontFamily: "Outfit",
          stroke: "none",
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          cursor: "pointer",
          fill: "#465fff",
          stroke: "none",
        },
        selected: {
          fill: "#465FFF",
        },
        selectedHover: {},
        }}
        regionLabelStyle={{
        initial: {
          fill: "#35373e",
          fontWeight: 500,
          fontSize: "13px",
          stroke: "none",
        },
        hover: {},
        selected: {},
        selectedHover: {},
        }}
      />
    </div>
  );
};

export default CountryMap;