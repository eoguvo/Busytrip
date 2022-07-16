import { ReactNode } from "react";
import { } from "./styles";

type CategoryProps = {
  children: ReactNode, 
  iconName: string
}

function Category({ children, iconName }: CategoryProps) {
  return (
    <>
      
      {children}
    </>
  );
}

export default Category;