import type { Property } from "@/types";

interface PropertyMetaSectionsProps {
  property: Property;
}

export function PropertyMetaSections({ property }: PropertyMetaSectionsProps) {
  return (
    <section className="grid gap-5 border-t border-black/8 pt-10 md:grid-cols-3">
      <MetaColumn
        title="Política de cancelación"
        items={[property.cancellationPolicy]}
      />
      <MetaColumn title="Reglas de la casa" items={property.houseRules} />
      <MetaColumn title="Seguridad y propiedad" items={property.safetyInfo} />
    </section>
  );
}

interface MetaColumnProps {
  title: string;
  items: string[];
}

function MetaColumn({ title, items }: MetaColumnProps) {
  return (
    <div className="rounded-[28px] border border-black/5 bg-white px-5 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
      <h3 className="text-lg font-semibold text-neutral-950">{title}</h3>
      <div className="mt-4 space-y-3 text-sm leading-6 text-neutral-600">
        {items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
}
