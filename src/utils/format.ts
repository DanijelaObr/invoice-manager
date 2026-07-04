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
  const [year, month, day] = isoDate.split('-');
  return `${day}.${month}.${year}`;
};
