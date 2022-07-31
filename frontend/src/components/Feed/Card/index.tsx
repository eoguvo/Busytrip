import { Card, Company, FlexContainer, Distance, Image, Description } from "./styles";
import StarIcon from '../../../assets/star'
import HeartIcon from "../../../assets/heart";
import { CardProps } from "./interface";

function CardComponent(
  { avatar_url, name, bio, favorite, setFavorites, id, distance, ratings }: CardProps
  ) {
  function ClickWrapper(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    setFavorites((prevState: string[]) => {
      if(prevState.includes(id)) return prevState.filter(item => item !== id)
      return [...prevState, id]
    });
  }

  return (
    <Card className="wrapper" href={`/company/${id}`} >
      <Image src={avatar_url} />
      <button onClick={ClickWrapper} >
        <HeartIcon stroke="white" fill="#rgba(0, 0, 0, 0.5)" favorite={favorite.includes(id)} />
      </button>
      <FlexContainer>
        <Company className="title">{name}</Company>
        <FlexContainer className="rating">
          <StarIcon fill="#000000" style={{ marginRight: 4 }} />
          {Math.round((+ratings) * 100) / 100}
        </FlexContainer>
      </FlexContainer>
      {!isNaN(+distance)
        ? <Distance>{distance} km de distância</Distance>
        : <Distance color="red">Ative a localização para ver a distância</Distance>}
      
      <Description>{bio}</Description>
    </Card>
  );
}

export default CardComponent;