export const formatUSDCurrency = (
  value: number | undefined,
  options?: Intl.NumberFormatOptions
) => {
  const safeValue = value ?? 0;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    ...options,
  }).format(safeValue);
};
