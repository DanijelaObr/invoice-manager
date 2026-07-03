// Amount: 325400 → "325.400,00 $" (dot = thousands separator, comma = decimals)
export const formatAmount = (amount: number): string => {
  return (
    new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount) + ' $'
  );
};

// Date: "2022-10-10" → "10.10.2022"
export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
