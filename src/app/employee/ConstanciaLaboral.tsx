"use client";

import useUser from "@/hooks/useUser";

const USDFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export default function ConstanciaLaboral() {
  const user = useUser((s) => s.user!);

  const fullName = `${user.name} ${user.lastName}`;
  const admissionDateFormatted = new Date(
    user.admissionDate
  ).toLocaleDateString("es-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div>
      <div
        style={{
          fontWeight: "bold",
          textAlign: "end",
          marginBottom: "35px",
        }}
      >
        Santa Ana a{" "}
        {new Date().toLocaleDateString("es-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
      <div
        style={{
          fontWeight: "bold",
          marginBottom: "25px",
        }}
      >
        A quien corresponda <br />
        Presente
      </div>
      <div style={{ marginBottom: "25px" }}>
        Por medio de la presente, nos complace extender la presente carta de
        constancia laboral a {fullName}, quien se desempeña como {user.position}{" "}
        en nuestra empresa desde el día {admissionDateFormatted} hasta la fecha
        presente con un sueldo de {USDFormat.format(+user.monthlyPayment)}{" "}
        mensuales. <br />
        <br />
        Sin más que decir por el momento, se extiende la presente para los fines
        que al interesad@ convenga.
      </div>
      <div>
        Atentamente, <br />
        <span style={{ fontWeight: "bold" }}>Hikaru S.A de C.V</span>
      </div>
    </div>
  );
}
