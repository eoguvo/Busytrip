import { useRecoilValue } from "recoil";
import { authAtom } from "../atoms";
import Header from "../components/Header";
import Feed from "../components/Feed";

function Home() {
  const auth = useRecoilValue(authAtom);

  return (
    <>
      {auth
        ? <Header link="/logout" text="Sair" />
        : <Header link="/login" text="Entrar" />
      }
      <Feed />
    </>
  );
}

export default Home;
