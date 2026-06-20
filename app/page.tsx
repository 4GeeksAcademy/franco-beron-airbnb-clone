import { PropertyCarousel } from "@/components/property";
import { SearchBar } from "@/components/search";
import { getFeaturedSections } from "@/services";

export default async function Home() {
  const sections = await getFeaturedSections();

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-visible bg-[radial-gradient(circle_at_top_left,_rgba(251,113,133,0.18),_transparent_32%),linear-gradient(180deg,#fff8f6_0%,#fcfcfb_44%,#fafaf9_100%)]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-4 pb-16 pt-8 md:px-6 md:pb-20 md:pt-10 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-rose-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600 shadow-sm backdrop-blur">
                Escapadas curadas por StaySphere
              </span>
              <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-6xl">
                Encontrá alojamientos con ritmo de vacaciones y detalles de
                hogar.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600 md:text-lg">
                Explorá estadías urbanas, casas de playa y rincones tranquilos
                con una experiencia mobile-first lista para crecer hacia
                catálogo y detalle.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:justify-items-end">
              <StatCard value="17" label="propiedades listas" />
              <StatCard value="7" label="destinos cubiertos" />
              <StatCard value="400ms" label="delay simulado API" />
            </div>
          </div>

          <SearchBar />
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-[1400px] flex-col gap-12 px-4 py-10 md:px-6 md:py-14 lg:px-8">
        {sections.map((section) => (
          <PropertyCarousel key={section.title} section={section} />
        ))}
      </section>

      <div className="pointer-events-none sticky bottom-5 z-30 mx-auto mb-5 w-fit rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(244,63,94,0.35)]">
        Los precios incluyen todas las tarifas
      </div>
    </div>
  );
}

interface StatCardProps {
  value: string;
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="rounded-[24px] border border-white/60 bg-white/80 px-5 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <p className="text-2xl font-semibold text-neutral-950">{value}</p>
      <p className="mt-1 text-sm text-neutral-500">{label}</p>
    </div>
  );
}
