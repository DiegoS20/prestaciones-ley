import { PropsWithChildren } from "react";
import { Paper } from "@mui/material";

import styles from "./styles.module.scss";

export default function LoginRegisterWrapper({ children, title }: Props) {
  return (
    <div className={styles["login-register-wrapper"]}>
      <div className={styles.form}>
        <Paper elevation={3} className={styles["content-paper"]}>
          <h1 style={{ fontSize: "3.2em", marginTop: 34, marginBottom: 34 }}>
            {title}
          </h1>
          {children}
        </Paper>
      </div>
    </div>
  );
}

type Props = PropsWithChildren<{
  title: string;
}>;
