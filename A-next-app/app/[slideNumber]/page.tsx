import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SlideContainer from "@/components/port-slides/slide-container";

const SLIDE_COUNT = 39;

type Props = {
  params: Promise<{ slideNumber: string }>;
};

export function generateStaticParams() {
  return Array.from({ length: SLIDE_COUNT }, (_, index) => ({
    slideNumber: String(index + 1).padStart(2, "0"),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slideNumber } = await params;
  return {
    title: `作品集 ${slideNumber} | Rian Design`,
    description: `Rian Design 作品集第 ${slideNumber} 页`,
  };
}

export default async function NumberedSlidePage({ params }: Props) {
  const { slideNumber } = await params;
  const index = Number(slideNumber);

  if (!/^\d{2}$/.test(slideNumber) || index < 1 || index > SLIDE_COUNT) {
    notFound();
  }

  return <SlideContainer initialSlide={index - 1} />;
}
