import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useCompanyActions } from "../../actions/companyActions";
import StarIcon from "../../assets/star";
import useOnScreen from "../../hooks/useOnScreen";
import { ICompany } from "../Feed/interface";
import Feedbacks from "../feedbacks";
import Map from "../map";
import { Title, CompanyContainer, HeroImg, Content, Description, Body, Logo, Rating } from "./styles";

function Company() {
  const companyActions = useCompanyActions();
  const feedbackRef = useRef(null);
  const isFeedbacksVisible = useOnScreen(feedbackRef);

  const { id = '' } = useParams();
  const { data: company } = useQuery<ICompany, Error, ICompany, string[]>(['Companies', id], companyActions.getById);
  return (
    <CompanyContainer>
      <HeroImg src={company?.cover} alt={`${company?.name} cover image`} />
      <Body>
        <Content>
            <Logo src={company?.avatar_url} />
            <Content direction="column">
              <Title style={{ display: 'flex' }}> 
                {company?.name}
                <Rating>
                  {Math.round(+(company?.ratings || 0) * 100) / 100}
                  <StarIcon width="26" height="26" fill="#E7A74E" stroke="transparent"/>
                </Rating>
              </Title>
              <Description> {company?.bio} </Description>
            </Content>
        </Content>
        <Title style={{ margin: '32px 0 16px 0' }}> Ver no mapa </Title>
        {company?.location.coordinates &&
          <Map position={company?.location.coordinates}>{company?.name}</Map>
        }
        
        <Feedbacks innerRef={feedbackRef} isVisible={isFeedbacksVisible} companyId={id} />
      </Body>
    </CompanyContainer>
  );
}

export default Company;