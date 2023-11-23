const yup = require('yup');

const WaterRegistryValidationSchema = yup.object().shape({
  quantity: yup
    .number()
    .required('Quantidade é obrigatória')
    .min(1, 'O valor deve ser maior que zero')
    .typeError('O valor deve ser um número')
});

export default WaterRegistryValidationSchema;