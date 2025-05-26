
export async function fetchCountries() {
  const res = await fetch(`${process.env.API_BASE_URL}/countries`, {
    next: { revalidate: 3600 }, // cache por 1 hora
  });

  if (!res.ok) {
    throw new Error("Failed to fetch countries");
  }

  const countries = await res.json();

  return countries.map((c: any) => ({
    value: c.value.toLowerCase(),
    label: c.label,
  }));
}
