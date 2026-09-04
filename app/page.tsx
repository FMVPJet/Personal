import HomeExperience from "@/components/home-experience";
import GalleryShell from "@/components/gallery-shell";

export default function Page() {
  return (
    <GalleryShell>
      <main className="g-combined-page">
        <HomeExperience />
      </main>
    </GalleryShell>
  );
}
