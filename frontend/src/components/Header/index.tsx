import { HeaderContainer, Logo, Sign } from "./styles";

function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <img src="./Logo.png" alt="Busytrip logo" height={60} width={60} />
        <p>
          Busytrip
        </p>
      </Logo>
      <Sign href="/login">
        Cadastre sua empresa
      </Sign>
    </HeaderContainer>
  );
}

export default Header;