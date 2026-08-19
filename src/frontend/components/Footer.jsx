import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 border-b border-border pb-10 sm:flex-row sm:justify-between">
          <div>
            <div className="font-display text-lg font-bold text-text">
              Alchem<span className="text-accent">ist</span>
            </div>
            <p className="mt-3 max-w-[200px] text-sm leading-relaxed text-text-faint">
              Where precision meets passion. Supercars for those who demand the best.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 sm:gap-12">
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-dim">Collection</h4>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-text-faint">
                <li><Link to="/#markets" className="transition-colors hover:text-text">Markets</Link></li>
                <li><Link to="/#spotlight" className="transition-colors hover:text-text">Spotlight</Link></li>
                <li><Link to="/#gallery" className="transition-colors hover:text-text">Gallery</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-dim">Company</h4>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-text-faint">
                <li><Link to="/about" className="transition-colors hover:text-text">About Us</Link></li>
                <li><Link to="/contact" className="transition-colors hover:text-text">Contact</Link></li>
                <li><Link to="/login" className="transition-colors hover:text-text">Dealer Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-dim">Follow</h4>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-text-faint">
                <li><a href="#" className="transition-colors hover:text-text">Instagram</a></li>
                <li><a href="#" className="transition-colors hover:text-text">YouTube</a></li>
                <li><a href="#" className="transition-colors hover:text-text">X / Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-faint">© 2026 Alchemist Supercars. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-text-faint">
            <a href="#" className="transition-colors hover:text-text-dim">Privacy</a>
            <a href="#" className="transition-colors hover:text-text-dim">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
