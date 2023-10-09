"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import useUser from "@/hooks/useUser";
import LoginRegisterWrapper from "@/components/LoginRegisterWrapper";
import { FullUserInfo } from "@/types";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const setUserManually = useUser((state) => state.setUserManually);
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<FormFields> = async (data) => {
    const fetchRes = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const statusCode = fetchRes.status;
    if (statusCode == 401)
      return toast("User credentials are incorrect", {
        type: "error",
      });

    const json = await fetchRes.json();
    const user = json.user as FullUserInfo;
    setUserManually(user);
    router.push("/employee");
  };

  return (
    <LoginRegisterWrapper title="Bienvenido">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              label="Correo electrónico"
              fullWidth
              required
              autoComplete="off"
              sx={{ marginBottom: 2 }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Contraseña"
              fullWidth
              type={showPassword ? "text" : "password"}
              required
              autoComplete="off"
              sx={{ marginBottom: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prevState) => !prevState)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Button fullWidth type="submit" variant="contained" color="primary">
          iniciar sesión
        </Button>
        <Link
          href="/sign-up"
          style={{ textDecoration: "none", display: "block", marginTop: 15 }}
        >
          Registrar empleado
        </Link>
      </form>
    </LoginRegisterWrapper>
  );
}

type FormFields = {
  email: string;
  password: string;
};
