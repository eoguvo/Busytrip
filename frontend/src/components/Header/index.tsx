import { Link } from "react-router-dom";
import { HeaderContainer, Logo, Sign } from "./styles";

interface HeaderProps {
  link: string;
  text: string;
}

function Header({ link, text }: HeaderProps) {
  return (
    <HeaderContainer>
      <Logo to="/">
          <img src="/Logo.png" alt="Busytrip logo" height={60} width={60} />
          <p>
            Busytrip
          </p>
      </Logo>
      <Sign to={link}>
        {text}
      </Sign>
    </HeaderContainer>
  );
}

export default Header;