export default function calcularAguinaldo(
  inicio: Date,
  final: Date,
  salario: number
) {
  let years = final.getFullYear() - inicio.getFullYear();
  const monthsDifference = final.getMonth() - inicio.getMonth();
  const isPastMonth = monthsDifference < 0;
  const isPastDay = monthsDifference == 0 && final.getDate() < inicio.getDate();
  if (isPastMonth || isPastDay) years--;

  const rates = [
    { from: 0, to: 3, rate: 0.5 },
    { from: 3, to: 10, rate: (19 * 0.5) / 15 },
    { from: 10, to: Infinity, rate: (21 * 0.5) / 15 },
  ];

  const { rate } = rates.find((r) => years >= r.from && years < r.to)!;
  let aguinaldo = salario * rate;

  if (years == 0) {
    aguinaldo /= 365;
    aguinaldo *= monthsDifference * 30;
  }

  return aguinaldo;
}
