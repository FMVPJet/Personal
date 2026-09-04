import AboutSection from "@/components/about-section";
import GalleryShell from "@/components/gallery-shell";
import DeviceGrid from "@/components/device-grid";

export default function Page() {
  return (
    <GalleryShell>
      <main className="g-combined-page">
        <AboutSection />
        <section className="g-devices-section" id="devices">
          <DeviceGrid />
        </section>
      </main>
    </GalleryShell>
  );
}
