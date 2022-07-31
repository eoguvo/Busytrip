import { object, string, pattern, size, define } from 'superstruct'

const isPassword = define('password', (value, context) => {
  return String(value).length >= 7
  ? []
  : {
    path: [],
    message: `'${context.path}' deve ter pelo menos 7 caracteres`,
  };
});

const isEmail = define('email', (value, context) => {
  return /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/g.test(String(value))
    ? []
    : {
      path: [],
      message: `'${context.path}' deve ser um Email válido`,
    };
});

export const LoginValidations = object({
  email: isEmail,
  password: isPassword
})

export const RegisterValidations = object({
  email: isEmail,
  password: isPassword,
  name: string()
})