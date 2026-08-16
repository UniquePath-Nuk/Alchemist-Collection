const features = [
  { icon: "⚡", title: "Raw Power", body: "Every engine is hand-assembled and bench-tested to exceed factory specs before installation." },
  { icon: "🏁", title: "Track Proven", body: "Each model is validated on world-class circuits by professional drivers for real-world performance." },
  { icon: "🔩", title: "Precision Built", body: "Tolerances measured in microns, aerospace-grade materials, construction that borders on obsession." },
  { icon: "🛡️", title: "Lifetime Support", body: "Dedicated concierge, global technician network, and guaranteed parts availability for life." },
];

export default function FeatureStrip() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-[1500px] px-4 sm:px-6 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {features.map((feature) => (
          <div key={feature.title} className="px-8 py-6">
            <span className="text-2xl">{feature.icon}</span>
            <div className="mt-4 font-display text-base font-bold text-text">{feature.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-text-dim">{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
