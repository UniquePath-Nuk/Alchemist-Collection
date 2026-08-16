const galleryImages = [
  { src: "https://images.unsplash.com/photo-1676744544740-9fd75a5aed85?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Supercar gallery 1", big: true },
  { src: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1200&q=85", alt: "Supercar gallery 2" },
  { src: "https://supercarblondie.com/wp-content/uploads/Bugatti-Chiron-with-Tangerine-interior.webp", alt: "Supercar gallery 3" },
  { src: "https://images.unsplash.com/photo-1577473403731-a36ec9087f44?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80", alt: "Supercar gallery 4" },
  { src: "https://images.unsplash.com/photo-1633650915549-f69463863651?w=1200&q=85", alt: "Supercar gallery 5" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 sm:py-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Visual Showcase</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">In Every Light</h2>

      <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
  {galleryImages.map((img) => (
    <div
      key={img.src}
      className={`overflow-hidden rounded-xl ${img.big ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}`}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        style={{ minHeight: img.big ? 200 : 140 }}
      />
    </div>
  ))}
</div>
    </section>
  );
}
