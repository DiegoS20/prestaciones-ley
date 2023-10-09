export default function getAFP(grossSalary: number) {
  return +(grossSalary * 0.0725).toFixed(2);
}
