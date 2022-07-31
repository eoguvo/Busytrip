import { useQuery } from "@tanstack/react-query";
import { RefObject, useState } from "react";
import { useRecoilValue } from "recoil";
import { format } from 'date-fns';
import { useFeedbackActions } from "../../actions/feedbackActions";
import StarIcon from "../../assets/star";
import { authAtom } from "../../atoms";
import { AddButton, DateElement, Feedback, Heading, Name, Rating, Timeline, Title } from "./styles";

interface FeedbacksProps {
  isVisible: boolean;
  companyId: string;
  innerRef: RefObject<HTMLDivElement>
}

import 'rodal/lib/rodal.css';
import FeedbackModal from "../createFeedbackModal";

function Feedbacks({ isVisible, companyId, innerRef }: FeedbacksProps) {
  const [isModalVisible, setVisible] = useState(false);
  const auth = useRecoilValue(authAtom);
  const feedbackActions = useFeedbackActions()
  const { data: feedbacks, isLoading: isFeedbackLoading } = useQuery(['feedbacks', companyId], feedbackActions.getByCompanyId, { enabled: isVisible });
  const handleClick = (visible: boolean) => () => setVisible(visible);

  return (
    <>
      <Timeline ref={innerRef}>
        <Title>Avaliações</Title>
        {auth
          ? <AddButton onClick={handleClick(true)} >Adicionar</AddButton>
          : <Title>Entre para comentar</Title>}
        {isFeedbackLoading && <h1>Carregando...</h1>}
        {feedbacks && feedbacks.status === 204 ?
          <Title style={{fontWeight: 400}}>Nenhum comentário ainda, que tal adicionar o primeiro?</Title>:
        feedbacks?.map(feedback => {
          return <Feedback key={feedback._id}>
            <Heading>
              <Name>{feedback.user.name}</Name>
              <Rating>
                {feedback.ratings}
                {[...Array(feedback.ratings || 1)].map((_, index) =>
                  <StarIcon width="16" height="16" fill="#E7A74E" stroke="transparent" style={{ marginRight: 2 }} key={index} />)}
              </Rating>

              <DateElement>{format(new Date(feedback.createdAt), 'dd/MM/yy')}</DateElement>
            </Heading>

            <p>{feedback.body}</p>
          </Feedback>
        })}
      </Timeline>

      <FeedbackModal 
        isModalVisible={isModalVisible} 
        companyId={companyId} 
        handleClick={handleClick} 
      />
    </>
  );
}

export default Feedbacks;