import Link from "next/link";

const navigationItems = [
  { label: "Alojamientos", href: "/", active: true },
  { label: "Experiencias", href: "#", badge: "Nuevo" },
  { label: "Servicios", href: "#", badge: "Nuevo" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(244,63,94,0.25)]">
            S
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-neutral-950">StaySphere</p>
            <p className="text-xs text-neutral-500">escapadas y estadías</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-black/5 bg-neutral-50 p-1 md:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium transition",
                item.active
                  ? "bg-white text-neutral-950 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900",
              ].join(" ")}
            >
              <span>{item.label}</span>
              {item.badge ? (
                <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button className="hidden rounded-full px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 md:inline-flex">
            Convertirte en anfitrión
          </button>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-700 shadow-sm transition hover:-translate-y-0.5">
            <span className="text-base">◎</span>
          </button>
          <button className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-3 py-2 shadow-sm transition hover:-translate-y-0.5">
            <span className="text-lg leading-none">≡</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700">
              FB
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
