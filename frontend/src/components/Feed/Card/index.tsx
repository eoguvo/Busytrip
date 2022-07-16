import { Card, Company, FlexContainer, Distance, Image, Description } from "./styles";
import StarIcon from '../../../assets/star'
import HeartIcon from "../../../assets/heart";

function CardComponent() {
  return (
    <Card className="wrapper" href="#" >
      <Image src="https://picsum.photos/240" />
      <HeartIcon stroke="white" fill="#rgba(0, 0, 0, 0.5)"/>
      <FlexContainer>
        <Company className="title">MC Donalds</Company>
        <FlexContainer className="rating">
          <StarIcon fill="#000000" style={{ marginRight: 4 }}/>
          4.2
        </FlexContainer>
      </FlexContainer>
      <Distance>12.6 km de distância</Distance>
      <Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id posuere est, at dapibus nibh. Aenean non nisi lectus...</Description>
    </Card>
  );
}

export default CardComponent;