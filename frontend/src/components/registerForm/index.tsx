import { MutationFunction, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { assert, StructError } from 'superstruct'
import { RegisterValidations } from '../../validations';
import Input from '../Input'
import { Button, Form, Title } from './style';
import { LoginPayload, useUserActions } from '../../actions/userActions';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const userActions = useUserActions();
  const formRef = useRef(null);
  
  const { mutate, isLoading } = useMutation(userActions.create as MutationFunction<any, LoginPayload>, {
    onSuccess: data => {
      toast.success(`${data.message} - redirecionando`);
      navigate('/')
    },
    onError: (error: Error) => {
      toast.error(`${error.message}`);
    }
  });

  async function handleSubmit(data: LoginPayload) {
    try {
      assert(data, RegisterValidations);
      mutate(data);
    } catch(e) {
      const validationErrors = {} as {[key: string]: string};
      if(e instanceof StructError) {
        e.failures().forEach(error => {
          validationErrors[error.key || ''] = error.message;
        });

        if(formRef.current != null)  {
          // @ts-ignore
          formRef.current.setErrors(validationErrors);
        }
      }
    }
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Title>Registrar</Title>
      <Input name="name" type="text" label="Nome"/>
      <Input name="email" type="email" label="Email"/>
      <Input name="password" type="password" label="Senha" />
      <Button type="submit" disabled={isLoading}>Registrar</Button>
    </Form>
  )
}

export default LoginForm;