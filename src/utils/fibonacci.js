export const fibonacci = (n) => {
  if (!Number.isInteger(n) || n < 0) throw new Error("Invalid fibonacci input");
  let arr = [0, 1];
  for (let i = 2; i < n; i++) arr.push(arr[i - 1] + arr[i - 2]);
  return arr.slice(0, n);
};
