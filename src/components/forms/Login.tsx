"use client";
import "./signUp.css";
import { login } from "@/actions/auth";
import Link from "next/link";
import { useFormState } from "react-dom";

const Login = () => {
  const [formState, formAction] = useFormState(login, {
    message: "",
  });
  return (
    <section className="register">
      <div className="container">
        <div className="register__container">
          <h2>Iniciar Sesión</h2>
          <form className="form register__form" action={formAction}>
            {formState.message && <div>{formState.message}</div>}

            <input type="email" placeholder="Correo Electrónico" name="email" />
            <input type="password" placeholder="Contraseña" name="password" />
            <div className="form__actions">
              <button type="submit" className="btn success">
                Iniciar Sesión
              </button>
            </div>
          </form>
          <small>
            ¿No tienes cuenta? <Link href="/auth?mode=signup">Regístrate</Link>
          </small>
        </div>
      </div>
    </section>
  );
};

export default Login;
