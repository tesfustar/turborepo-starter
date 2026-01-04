type MoneyFormatOptions = {
  locale?: string;
  currency: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
};

export function formatMoney(
  amount: number | string | null | undefined,
  {
    locale = "en-US",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping = true,
  }: MoneyFormatOptions
): string {
  if (amount === null || amount === undefined || amount === "") {
    return "";
  }

  const numericAmount = typeof amount === "string" ? Number(amount) : amount;

  if (!Number.isFinite(numericAmount)) {
    return "";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    useGrouping,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(numericAmount);
}
