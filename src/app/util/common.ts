export function FormatCurrency(val: number): string {
    const value = val || 0;
    return '$ ' + val.toFixed(2);
}