const yup = require('yup');

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email é obrigatório')
    .email('Digite um email válido'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'A senha deve conter pelo menos 6 caracteres'),
});

export default loginValidationSchema;