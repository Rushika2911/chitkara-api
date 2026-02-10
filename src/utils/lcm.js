export const calcLCM = (arr) => {
  if (!Array.isArray(arr)) throw new Error("LCM expects array");
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  return arr.reduce((a, b) => (a * b) / gcd(a, b));
};
