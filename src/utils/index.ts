export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function parseBoolean(str: string): boolean {
  return str.toLowerCase() === "true";
}
