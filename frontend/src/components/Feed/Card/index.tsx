import { Card, Company, FlexContainer, Distance, Image, Description } from "./styles";
import StarIcon from '../../../assets/star'
import HeartIcon from "../../../assets/heart";
import { CardProps } from "./interface";

function CardComponent({ avatar_url, name, bio, location, favorite, setFavorites, id }: CardProps) {
  function ClickWrapper(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    setFavorites((prevState: string[]) => {
      console.log({prevState})
      if(prevState.includes(id)) return prevState.filter(item => item !== id)
      return [...prevState, id]
    });

    console.log(favorite)
  }

  return (
    <Card className="wrapper" href="/" >
      <Image src={avatar_url} />
      <button onClick={ClickWrapper} >
        <HeartIcon stroke="white" fill="#rgba(0, 0, 0, 0.5)" favorite={favorite.includes(id)} />
      </button>
      <FlexContainer>
        <Company className="title">{name}</Company>
        <FlexContainer className="rating">
          <StarIcon fill="#000000" style={{ marginRight: 4 }} />
          4.2
        </FlexContainer>
      </FlexContainer>
      <Distance>12.6 km de distância</Distance>
      <Description>{bio}</Description>
    </Card>
  );
}

export default CardComponent;