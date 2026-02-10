export const calcHCF = (arr) => {
  if (!Array.isArray(arr)) throw new Error("HCF expects array");
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  return arr.reduce((a, b) => gcd(a, b));
};
