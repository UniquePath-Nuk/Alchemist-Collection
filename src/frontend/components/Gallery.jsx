import Ferrari from "../images/Ferrari.jpg";
import LamboginiAvif from "../images/Lambogini.avif";
import LamboginiJpg from "../images/Lambogini.jpg";
import Mclaren from "../images/Mclaren.avif";
import Bugatti from "../images/Bugatti.webp";

const galleryImages = [
  {
    src: Ferrari,
    alt: "Ferrari",
    big: true,
  },
  {
    src: LamboginiAvif,
    alt: "Lamborghini",
  },
  {
    src: LamboginiJpg,
    alt: "Lamborghini",
  },
  {
    src: Mclaren,
    alt: "McLaren",
  },
  {
    src: Bugatti,
    alt: "Bugatti",
  }
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 sm:py-12"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
        Visual Showcase
      </p>

      <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
        In Every Light
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {galleryImages.map((img) => (
          <div
            key={img.src}
            className={`overflow-hidden rounded-xl ${
              img.big
                ? "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                : ""
            }`}
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