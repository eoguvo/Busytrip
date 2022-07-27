import Category from "./category";
import { FiltersWrapper } from "./styles";

import { 
  FaBars,
  FaHamburger, 
  FaSmileBeam, 
  FaBasketballBall, 
  FaUmbrellaBeach, 
  FaTree,
  FaRegKissWinkHeart, 
  FaGasPump,
  FaShoppingBag,
  FaTshirt} from 'react-icons/fa';
import { useState } from "react";

const categories = [
  { icon: FaBars, text: 'Geral' },
  { icon: FaHamburger, text: 'Comida' },
  { icon: FaSmileBeam, text: "Diversão" },
  { icon: FaBasketballBall, text: "Esporte" },
  { icon: FaUmbrellaBeach, text: "Lazer" },
  { icon: FaTree, text: "Eco" },
  { icon: FaRegKissWinkHeart, text: "Beleza" },
  { icon: FaGasPump, text: "Posto" },
  { icon: FaShoppingBag, text: "Mercado" },
  { icon: FaTshirt, text: "Roupa" }
]

function Filters() {
  const [activeIndex, setActive] = useState(0);

  function HandleClick(index: number) {
    setActive(index);
  }

  return (
    <FiltersWrapper>
      {categories.map(({ icon, text }, index) => {
        return <Category active={activeIndex === index} Icon={icon} text={text} onClick={() => HandleClick(index)} key={text} />
      })}
    </FiltersWrapper>
  );
}

export default Filters;