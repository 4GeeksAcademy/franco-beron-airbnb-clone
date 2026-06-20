import Link from "next/link";

const supportLinks = [
  "Centro de ayuda",
  "AirCover",
  "Antidiscriminación",
  "Accesibilidad",
  "Cancelaciones",
  "Problemas en la zona",
];

const hostingLinks = [
  "Hazlo con StaySphere",
  "AirCover para anfitriones",
  "Recursos para anfitriones",
  "Foro de la comunidad",
  "Clases gratuitas",
  "Invitar a un coanfitrión",
];

const companyLinks = [
  "Lanzamientos",
  "Prensa",
  "Empleo",
  "Inversores",
  "Tarjetas de regalo",
  "StaySphere.org",
];

const nearbyDestinations = [
  "Pocitos",
  "Carrasco",
  "Punta del Este",
  "José Ignacio",
  "Piriápolis",
  "Colonia",
  "Carmelo",
  "Rocha",
  "Buenos Aires",
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 bg-[#f4f1ea] text-neutral-800">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-12 px-4 py-12 md:px-6 lg:px-8">
        <section className="rounded-[32px] bg-white px-6 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-rose-500">
            Descubre más
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-950 md:text-3xl">
            Otras opciones en Montevideo y sus alrededores
          </h2>
          <p className="mt-3 text-sm text-neutral-500">
            StaySphere &gt; Uruguay &gt; Montevideo &gt; Costa Sur
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {nearbyDestinations.map((destination) => (
              <div
                key={destination}
                className="rounded-2xl border border-black/5 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-700"
              >
                {destination}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-t border-black/8 pt-10 md:grid-cols-3">
          <FooterColumn title="Asistencia" links={supportLinks} />
          <FooterColumn title="Cómo ser anfitrión" links={hostingLinks} />
          <FooterColumn title="StaySphere" links={companyLinks} />
        </section>

        <section className="flex flex-col gap-4 border-t border-black/8 pt-6 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 StaySphere</span>
            <span>Privacidad</span>
            <span>Términos</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span>Español (UY)</span>
            <span>UYU</span>
            <div className="flex items-center gap-2 text-neutral-700">
              <Link href="#">Instagram</Link>
              <Link href="#">X</Link>
              <Link href="#">Facebook</Link>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: string[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-base font-semibold text-neutral-950">{title}</h3>
      <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-600">
        {links.map((link) => (
          <Link
            key={link}
            href="#"
            className="transition hover:text-neutral-950"
          >
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
}
