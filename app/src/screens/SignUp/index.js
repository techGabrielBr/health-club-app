import { View, Text, Image, TextInput} from "react-native";
import React, { useEffect } from "react";
import styles from "./styles";
import { TouchableOpacity } from "react-native";
import { useForm } from  'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import signUpValidationSchema from "../../yup-schemas/signUpValidationSchema";
import CustomInput from "../../components/CustomInput";

import showToast from './../../services/toastService';
import UserService from "../../services/userService";

/**
 * SignUp Component
 *
 * @export
 * @param {NavigationScreenProps} {navigation}
 * @return {*} 
 */
export default function SignUp({navigation}){
    const { register, setValue, handleSubmit, formState: {errors} } = useForm({resolver: yupResolver(signUpValidationSchema)})

    useEffect(() => {
        register('email');
        register('password');
        register('confirmPassword');
        register('name');
        register('cpf');
    }, [register]);


    /**
     * Create User after submit 
     * 
     *  @param {object} data
    */
    const onSubmit = function(data) {
        UserService.createUser(data).then(v => {
            showToast('success', 'Sucesso', 'Parabéns, sua conta foi criada!');
            navigation.navigate('Login');
        }).catch(e => {
            showToast('error', 'Erro', 'Infelizmente não foi possível criar seu usuário, tente novamente');
        });
    }

    return <View style={styles.container}>
        <View style={styles.iconContainer}>
            <Image source={require('../../images/health-icon.png')} style={styles.healthIcon}></Image>
            <Text style={styles.titleText}>Health House</Text>
        </View>
        <Text style={styles.loginText}>Cadastro</Text>
        <View>
            <CustomInput
                placeholder={"Nome"}
                setValue={setValue}
                fieldName={'name'}
                error={errors?.name}
                inputMode={'text'}
                secureTextEntry={false}
            />
            <CustomInput
                placeholder={"Email"}
                setValue={setValue}
                fieldName={'email'}
                error={errors?.email}
                inputMode={'text'}
                secureTextEntry={false}
            />
            <CustomInput
                placeholder={"CPF"}
                setValue={setValue}
                fieldName={'cpf'}
                error={errors?.cpf}
                inputMode={'numeric'}
                secureTextEntry={false}
            />
            <CustomInput
                placeholder={"Senha"}
                setValue={setValue}
                fieldName={'password'}
                error={errors?.password}
                inputMode={'text'}
                secureTextEntry={true}
            />
            <CustomInput
                placeholder={"Confirmar Senha"}
                setValue={setValue}
                fieldName={'confirmPassword'}
                error={errors?.confirmPassword}
                inputMode={'text'}
                secureTextEntry={true}
            />
        </View>
        <TouchableOpacity style={styles.navLinkContainer} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.navLink}>Já possui uma conta? Fazer Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.textWhite}>Enviar</Text>
        </TouchableOpacity>
    </View>
}