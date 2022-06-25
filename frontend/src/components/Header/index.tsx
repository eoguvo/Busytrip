import { HeaderContainer, Logo, Sign } from "./styles";

function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <img src="./Logo.png" alt="Busytrip logo" height={120} width={120} />
        <p>
          Busytrip
        </p>
      </Logo>
      <Sign href="#">
        Cadastre sua empresa
      </Sign>
    </HeaderContainer>
  );
}

export default Header;