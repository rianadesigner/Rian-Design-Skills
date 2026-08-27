import type { Metadata } from "next";

import { ColorCorridor } from "@/components/color-corridor";

import "./color-corridor.css";

export const metadata: Metadata = {
  title: "Creative Image Corridor | Rian Design",
  description: "A looping, perspective-driven image corridor prototype.",
};

export default function ColorCorridorPage() {
  return <ColorCorridor />;
}
