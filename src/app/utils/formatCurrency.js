/**
 * Formato de moneda para Argentina: $1.000, $2.000, etc.
 * Usa punto como separador de miles.
 */
export function formatCurrency(value) {
  return `$${value.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
