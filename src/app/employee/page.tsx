"use client";

import { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { useRouter } from "next/navigation";
import { Html } from "react-pdf-html";
import { Document, PDFDownloadLink, Page } from "@react-pdf/renderer";
import { Box, Button, Tab, Tabs } from "@mui/material";

import MonthlyPayments from "./components/MonthlyPayments";
import Bonus from "./components/Bonus";
import Vacations from "./components/Vacations";
import DeclaracionDeRenta from "./DeclaracionDeRenta";
import ConstanciaLaboral from "./ConstanciaLaboral";
import Indenmizacion from "./Indemnizacion";
import calcularAguinaldo from "@/helpers/calcularAguinaldo";
import useUser from "@/hooks/useUser";

import styles from "./styles.module.scss";
import Logo from "@/assets/images/SVG/Logo";

const USDFormate = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const TABS = [
  <MonthlyPayments key={0} />,
  <Bonus key={1} />,
  <Vacations key={2} />,
];
export default function EmployeePage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const user = useUser((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/login");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const DocDeclaracion = () => (
    <Document>
      <Page style={{ padding: "15px" }}>
        <Html>
          {ReactDOMServer.renderToStaticMarkup(
            <DeclaracionDeRenta year={new Date().getFullYear() - 1} />
          )}
        </Html>
      </Page>
    </Document>
  );

  const DocConstancia = () => (
    <Document>
      <Page style={{ padding: "15px" }}>
        <Html>{ReactDOMServer.renderToString(<ConstanciaLaboral />)}</Html>
      </Page>
    </Document>
  );

  const DocIndemnizacion = () => (
    <Document>
      <Page style={{ padding: "15px" }}>
        <Html>{ReactDOMServer.renderToString(<Indenmizacion />)}</Html>
      </Page>
    </Document>
  );

  if (user == null) {
    return;
  }
  return (
    <div className={styles["employee-page"]}>
      <Logo />
      <div className={styles["main-information"]}>
        <div className={styles.initials}>
          <div className={styles["initials-circle"]}>{user.initials}</div>
        </div>
        <div className={styles["employee-information"]}>
          <ul className={styles["employee-information-list"]}>
            <li className={styles["full-name"]}>
              {user.name} {user.lastName}
            </li>
            <li className={styles.position}>{user.position}</li>
            <li className={styles["admission-date"]}>
              Fecha de ingreso:{" "}
              {new Date(user.admissionDate).toLocaleDateString()}
            </li>
            <li className={styles["monthly-payment"]}>
              Salario: {USDFormate.format(+user.monthlyPayment)}
            </li>
            <li className={styles["monthly-payment"]}>
              Aguinaldo:{" "}
              {USDFormate.format(
                calcularAguinaldo(
                  new Date(user.admissionDate),
                  new Date(),
                  +user.monthlyPayment
                )
              )}
            </li>
          </ul>
          <div className={styles["botones-informes"]}>
            <PDFDownloadLink
              document={<DocDeclaracion />}
              fileName={`declaracion_renta_${Date.now()}`}
            >
              {() => (
                <Button variant="contained">
                  Declaración de renta {new Date().getFullYear()}
                </Button>
              )}
            </PDFDownloadLink>
            <PDFDownloadLink
              document={<DocConstancia />}
              fileName={`constancia_sueldo_${Date.now()}`}
            >
              {() => (
                <Button variant="contained" color="warning">
                  Constancia de sueldo
                </Button>
              )}
            </PDFDownloadLink>
            <PDFDownloadLink
              document={<DocIndemnizacion />}
              fileName={`indemnizacion_${Date.now()}`}
            >
              {() => (
                <Button variant="contained" color="error">
                  Indemnizar
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>

      <Box
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "25px" }}
      >
        <Tabs value={selectedTab} onChange={(_, tn) => setSelectedTab(tn)}>
          <Tab label="Historial de salarios" />
          <Tab label="Bonos" />
          <Tab label="Vacaciones" />
        </Tabs>
      </Box>
      {TABS[selectedTab]}
    </div>
  );
}
