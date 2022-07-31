import { lazy, Suspense } from "react";
import { FlexContainer } from "../components/container";
import Header from "../components/Header";
const LoginForm = lazy(() => import("../components/loginForm"));

function Login() {
  return (
    <>
      <Header link="/register" text="Registrar" />
      <FlexContainer>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </FlexContainer>
    </>
  );
}

export default Login;