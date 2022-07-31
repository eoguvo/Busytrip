import { MutationFunction, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Input from '../Input'
import { Button, Form, Title } from './style';
import { LoginPayload, useUserActions } from '../../actions/userActions';
import { assert, StructError } from 'superstruct'
import { LoginValidations } from '../../validations';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const userActions = useUserActions();
  const formRef = useRef(null)

  const { mutate, isLoading } = useMutation(userActions.login as MutationFunction<any, LoginPayload>, {
    onSuccess: data => {
      toast.success('Redirecionando');
      navigate('/')
    },
    onError: (error: Error) => {
      toast.error(`${error.message}`);
    }
  });

  async function handleSubmit(data: LoginPayload) {
    try {
      assert(data, LoginValidations);
      mutate(data);
    } catch (e) {
      const validationErrors = {} as { [key: string]: string };
      if (e instanceof StructError) {
        e.failures().forEach(error => {
          validationErrors[error.path[0] || ''] = error.message;
        });

        if (formRef.current != null) {
          // @ts-ignore
          formRef.current.setErrors(validationErrors);
        }
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <Title>Login</Title>
      <Input name="email" type="email" label="Email" />
      <Input name="password" type="password" label="Senha" />
      <Button type="submit" disabled={isLoading}>Entrar</Button>
    </Form>
  )
}

export default LoginForm;