import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SynapseLanding } from "@/components/synapsexr/synapse-landing";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SynapseXR | Expand Your Mind",
  description:
    "SynapseXR pricing and plan comparison — glass-native XR cognition interfaces with conversion-focused layouts.",
};

export default function SynapseXRPage() {
  return (
    <div className={`${inter.className} min-h-dvh bg-[#060607]`}>
      <SynapseLanding />
    </div>
  );
}
