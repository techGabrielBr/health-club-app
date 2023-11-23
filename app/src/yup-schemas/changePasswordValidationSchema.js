const yup = require('yup');

const changePasswordValidationSchema = yup.object().shape({
    newPassword: yup
    .string()
    .required('A nova senha é obrigatória')
    .min(6, 'A nova senha deve conter pelo menos 6 caracteres'),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'As senhas não coincidem')
    .required('Confirmar a senha é obrigatório')
});

export default changePasswordValidationSchema;