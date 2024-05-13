"use client";
import "./signUp.css";
import { signupAction } from "@/actions/auth";
import { useFormState } from "react-dom";
import Link from "next/link";

const SignUp = () => {
  const [formState, formAction] = useFormState(signupAction, {
    errors: {
      email: "",
      username: "",
      name: "",
      password: "",
    },
  });
  return (
    <section className="register">
      <div className="container">
        <div className="register__container">
          <h2>Registrarse</h2>
          <form className="form register__form" action={formAction}>
            {formState.errors.email && <div>{formState.errors.email}</div>}
            <input type="text" placeholder="Nombre Completo" name="name" />
            <input
              type="text"
              placeholder="Nombre de Usuario"
              name="username"
            />
            <input type="email" placeholder="Correo Electrónico" name="email" />
            <input type="password" placeholder="Contraseña" name="password" />
            <div className="form__actions">
              <button type="submit" className="btn success">
                Registrarse
              </button>
            </div>
          </form>
          <small>
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth?mode=login">Iniciar Sessión</Link>
          </small>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
