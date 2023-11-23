const yup = require('yup');

const signUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email é obrigatório')
    .email('Digite um email válido'),
  name: yup
    .string()
    .required('Nome é obrigatório'),
  cpf: yup
    .string()
    .required('O cpf não pode ser vazio')
    .min(11, 'Informe um cpf válido'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'A senha deve conter pelo menos 6 caracteres'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
    .required('Confirmar a senha é obrigatório')
});

export default signUpValidationSchema;