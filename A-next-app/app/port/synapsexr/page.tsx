import type { Metadata } from "next";
import { SynapseLanding } from "@/components/synapsexr/synapse-landing";

export const metadata: Metadata = {
  title: "SynapseXR | Expand Your Mind",
  description:
    "SynapseXR pricing and plan comparison — glass-native XR cognition interfaces with conversion-focused layouts.",
};

export default function SynapseXRPage() {
  return (
    <div className="min-h-dvh bg-[#060607] font-sans antialiased">
      <SynapseLanding />
    </div>
  );
}
