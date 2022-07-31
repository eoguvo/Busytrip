import { FlexContainer } from "../components/container";
import Header from "../components/Header";
import toast from 'react-hot-toast';
import { useEffect } from "react";
import { useUserActions } from "../actions/userActions";

function Logout() {
  const userActions = useUserActions();
  
  useEffect(() => {
    userActions.logout(() =>
     toast.success('Sucesso')
    );
    
  }, [])
  return (
    <>
      <Header link="/login" text="Entrar" />
      <FlexContainer>
        Esse processo pode demorar um pouco
      </FlexContainer>
    </>
  );
}

export default Logout;