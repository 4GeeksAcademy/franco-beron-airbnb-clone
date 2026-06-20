import { getProperties } from "@/services";

import { CatalogClient } from "./CatalogClient";

export default async function CatalogPage() {
  const initialProperties = await getProperties();

  return <CatalogClient initialProperties={initialProperties} />;
}
