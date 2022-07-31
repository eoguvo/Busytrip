import Rodal from "rodal";
import { Form } from "@unform/web";
import { useRef } from "react";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import { useFeedbackActions, FeedbackPayload } from "../../actions/feedbackActions";
import { ModalTitle, SubmitButton, CloseButton } from "./styles";
import StarRating from "../StarRatingInput";
import Input from "../Input";
import toast from "react-hot-toast";
import { queryClient } from "../../services/queryClient";

interface Props {
  handleClick: (visible: boolean) => () => void,
  isModalVisible: boolean,
  companyId: string
}
function FeedbackModal(
    {isModalVisible, handleClick, companyId}: Props
  ) {
  const formRef = useRef(null);
  const feedbackActions = useFeedbackActions()

  const { mutate, isLoading: isFeedbackCreating } = useMutation(feedbackActions.create as MutationFunction<any, FeedbackPayload>, {
    onSuccess: async () => {
      toast.success(`Criando`);
      handleClick(false)();
      // @ts-ignore
      await queryClient.invalidateQueries('feedbacks');
    },
    onError: (error: Error) => {
      console.log({error})
      toast.error(`${error.message}`);
    }
  });

  async function handleSubmit(data: FeedbackPayload, { reset }: {reset: (data?: Record<string, any>) => void}) {
    try {
      mutate(data);
      handleClick(false);
      reset();
    } catch (e) {
      console.log(e)
    }
  }
  return <Rodal visible={isModalVisible} onClose={handleClick(false)} height={450} showCloseButton={false} animation="door" >
    <ModalTitle>Criar uma avaliação</ModalTitle>

    <Form ref={formRef} onSubmit={handleSubmit}>
      <StarRating name="ratings" />
      <Input name="company_id" type="hidden" _defaultValue={companyId} />
      <Input name="body" type="textarea" label="Deixe uma mensagem. (opcional)" />
      <SubmitButton disabled={isFeedbackCreating}>Criar</SubmitButton>
    </Form>
      <CloseButton disabled={isFeedbackCreating} onClick={handleClick(false)}>Close</CloseButton>
  </Rodal>
}

export default FeedbackModal;