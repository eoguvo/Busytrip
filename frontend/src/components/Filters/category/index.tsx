import { FC } from "react";
import { CategoryWrapper } from "./styles";

interface CategoryProps {
  text: string, 
  Icon: FC,
  active: boolean,
  onClick: Function
}

function Category({ text, Icon, active }: CategoryProps, ...props: unknown[]) {
  return (
    <CategoryWrapper {...props} className={!!active ? 'active' : ''} >
      <Icon />
      <p>{text}</p>
    </CategoryWrapper>
  );
}

export default Category;