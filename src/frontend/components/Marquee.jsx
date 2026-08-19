const marqueeItems = [
  "Aerodynamics",
  "Carbon Fibre Monocoque",
  "Twin-Turbo V8",
  "Hybrid Powertrain",
  "Active Suspension",
  "Ceramic Brakes",
  "Track-Tuned",
  "Bespoke Interior",
];

function MarqueeRow({ ariaHidden }) {
  return (
    <div className="flex gap-10" aria-hidden={ariaHidden || undefined}>
      {marqueeItems.map((item, i) => (
        <span key={i} className="flex items-center gap-2 whitespace-nowrap text-xs font-medium text-text-dim">
          <span className="num text-up">●</span> {item}
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden border-b border-border bg-surface py-3">
      <div className="flex w-max animate-marquee gap-10">
        <MarqueeRow />
        <MarqueeRow ariaHidden="true" />
      </div>
    </div>
  );
}
