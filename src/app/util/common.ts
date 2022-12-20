export function FormatCurrency(val: number | undefined): string {
    const value = val || 0;
    return '$ ' + value.toFixed(2);
}