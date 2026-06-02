import EmptyFolderCard from "@/components/ui/empty-folder-card";
import EmptyTestimonial from "@/components/ui/empty-testimonial";

export default function DemoPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-16 bg-background p-8">
      <EmptyFolderCard />
      <EmptyTestimonial />
    </div>
  );
}
