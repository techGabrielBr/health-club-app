import { View, Text, Image, TextInput, Pressable } from "react-native";
import React, { useEffect, useContext } from "react";
import styles from "./styles";
import { TouchableOpacity } from "react-native";
import { useForm } from  'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../components/CustomInput";
import loginValidationSchema from './../../yup-schemas/loginValidationSchema';

import showToast from "../../services/toastService";
import UserService from "../../services/userService";
import { UserDispatchContext } from "../../context/userContext";

/**
 * Login Component
 *
 * @export
 * @param {NavigationScreenProps} {navigation}
 * @return {*} 
 */
export default function Login({navigation}){

    const { register, setValue, handleSubmit, formState: {errors} } = useForm({resolver: yupResolver(loginValidationSchema)})

    const setUserDetails = useContext(UserDispatchContext);

    useEffect(() => {
        register('email');
        register('password');
    }, [register]);

    /**
     * Auth user after submit 
     * 
     * @param {object} data
    */
    const onSubmit = async function(data){
        UserService.auth(data).then(async v => {
            if(v._array[0] != null){
                try{
                    setUserDetails({name: v._array[0].name, id: v._array[0].id.toString()});
                    successNavigate();
                }catch (e){
                    showToast('error', 'Erro', 'Não foi possível fazer login, tente novamente');
                }
            }else{
                showToast('error', 'Erro', 'Email/Senha incorreto(s)');
            }
        }).catch(e => {
            showToast('error', 'Erro', 'Infelizmente não foi possível buscar seu usuário, tente novamente');
        });
    }

    /**
     * Navigate to TabContainer 
    */
    const successNavigate = function(){
        showToast('success', 'Sucesso', 'Parabéns, login realizado!');
        navigation.navigate('TabContainer');
    }

    return <View style={styles.container}>
        <View style={styles.iconContainer}>
            <Image source={require('../../images/health-icon.png')} style={styles.healthIcon}></Image>
            <Text style={styles.titleText}>Health House</Text>
        </View>
        <Text style={styles.loginText}>Login</Text>
        <View>
            <CustomInput
                placeholder={"Email"}
                setValue={setValue}
                fieldName={'email'}
                error={errors?.email}
                inputMode={'text'}
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
        </View>
        <TouchableOpacity style={styles.navLinkContainer} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.navLink}>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.textWhite}>Entrar</Text>
        </TouchableOpacity>
    </View>
}