export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">About Us</p>
      <h1 className="mt-2 max-w-3xl font-display text-3xl font-bold text-text sm:text-4xl">
        Where precision meets passion.
      </h1>

      <div className="mt-5 max-w-3xl space-y-5 text-[15px] leading-relaxed text-text-dim">
        <p>
          Alchemist Supercars is a premium automotive platform built for people who
          appreciate exceptional performance, engineering, and design. We make it
          simple to explore, compare, and discover some of the world&apos;s most
          remarkable supercars.
        </p>
        <p>
          Our platform brings together detailed vehicle information, market listings,
          and featured cars in one clean experience. From power and acceleration to
          top speed and pricing, we give enthusiasts the information they need to
          explore extraordinary cars with confidence.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Who We Are</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-text">
            Built around the love of extraordinary cars.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-text-dim">
            We are a team of automotive enthusiasts focused on making the supercar
            market easier to explore. Alchemist is designed to bring precision,
            performance, and passion together in one place.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">What We Offer</p>
          <ul className="mt-4 space-y-4 text-[15px] leading-relaxed text-text-dim">
            <li><span className="font-semibold text-text">Curated Supercars</span><br />A selection of luxury and high-performance vehicles.</li>
            <li><span className="font-semibold text-text">Detailed Specifications</span><br />Power, acceleration, top speed, pricing, and key vehicle information.</li>
            <li><span className="font-semibold text-text">Market Listings</span><br />Explore current vehicles and discover featured cars through Spotlight.</li>
          </ul>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-surface-2 p-6 sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Our Mission</p>
        <blockquote className="mt-3 max-w-3xl font-display text-xl font-semibold leading-relaxed text-text sm:text-2xl">
          “To bring precision, performance, and passion together in one place.”
        </blockquote>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-text-dim">
          Whether you are searching for your dream supercar or simply passionate
          about automotive engineering, Alchemist Supercars is built to make
          discovering extraordinary cars easier.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface px-5 py-5">
          <div className="num text-2xl font-bold text-text">10+</div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-text-faint">Cars Sold</div>
        </div>
        <div className="rounded-xl border border-border bg-surface px-5 py-5">
          <div className="num text-2xl font-bold text-text">14</div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-text-faint">Markets</div>
        </div>
        <div className="rounded-xl border border-border bg-surface px-5 py-5">
          <div className="num text-2xl font-bold text-text">2026</div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-text-faint">Founded</div>
        </div>
      </div>

      <section className="mt-14 border-t border-border pt-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Get In Touch</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">Contact</h2>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-text-dim">
          Questions about a listing, a quote, or just want to talk cars? Reach us directly.
        </p>

        <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface-2 px-5 py-4">
            <div className="text-[10px] font-medium uppercase tracking-wider text-text-faint">Email</div>
            <div className="num mt-1 text-base font-semibold text-text">hello@alchemist.cars</div>
          </div>
          <div className="rounded-xl border border-border bg-surface-2 px-5 py-4">
            <div className="text-[10px] font-medium uppercase tracking-wider text-text-faint">Phone</div>
            <div className="num mt-1 text-base font-semibold text-text">+885 (111) 1111-1111</div>
          </div>
          <div className="rounded-xl border border-border bg-surface-2 px-5 py-4 sm:col-span-2">
            <div className="text-[10px] font-medium uppercase tracking-wider text-text-faint">Showroom</div>
            <div className="mt-1 text-base font-semibold text-text">Phnom Penh, RUPP</div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Follow Along</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-text">Stay connected</h2>

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 text-sm font-bold text-accent">IG</span>
              <div className="text-sm font-semibold text-text">Instagram</div>
            </div>
            <span className="text-text-faint">@alchemist.cars</span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 text-sm font-bold text-accent">X</span>
              <div className="text-sm font-semibold text-text">X / Twitter</div>
            </div>
            <span className="text-text-faint">@alchemistcars</span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 text-sm font-bold text-accent">YT</span>
              <div className="text-sm font-semibold text-text">YouTube</div>
            </div>
            <span className="text-text-faint">Alchemist Supercars</span>
          </div>
        </div>
      </section>
    </div>
  );
}