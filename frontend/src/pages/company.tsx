import Header from "../components/Header";
import { authAtom } from "../atoms";
import { useRecoilValue } from "recoil";
import Company from "../components/company";

function CompanyPage() {
  const auth = useRecoilValue(authAtom);

  return (
    <>
      {auth
        ? <Header link="/logout" text="Sair" />
        : <Header link="/login" text="Entrar" />
      }
      <Company />
    </>
  );
}

export default CompanyPage;
