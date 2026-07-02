// Iznos: 325400 → "325.400,00 $" (tačka = hiljade, zapeta = decimale)
export function formatAmount(amount) {
  return (
    new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount) + " $"
  );
}

// Datum: "2022-10-10" → "10.10.2022"
export function formatDate(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
