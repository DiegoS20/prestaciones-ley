export default function getISSS(grossSalary: number) {
  return +(Math.min(grossSalary, 1000) * 0.03).toFixed(2);
}
