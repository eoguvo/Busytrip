import { FlexContainer } from "../components/container";
import Header from "../components/Header";
import RegisterForm from "../components/registerForm";


function Register() {
  return (
    <>
      <Header link="/login" text="Entrar" />
      <FlexContainer>
        <RegisterForm />
      </FlexContainer>
    </>
  );
}

export default Register;