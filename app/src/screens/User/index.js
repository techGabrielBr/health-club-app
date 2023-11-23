import { Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import styles from "./styles";
import { UserContext, UserDispatchContext } from "../../context/userContext";
import { TouchableOpacity, Button } from "react-native";
import Modal from "react-native-modal";

import { useForm } from  'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../components/CustomInput";
import changePasswordValidationSchema from "../../yup-schemas/changePasswordValidationSchema";
import UserService from "../../services/userService";
import showToast from "../../services/toastService";


/**
 * User Component
 * @param {NavigationScreenProps} {navigation}
 * @returns {any}
 */
export function User({navigation}){
    const setUserDetails = useContext(UserDispatchContext);
    const userDetails = useContext(UserContext);

    const { register, setValue, handleSubmit, formState: {errors} } = useForm({resolver: yupResolver(changePasswordValidationSchema)});

    useEffect(() => {
        register('newPassword');
        register('confirmPassword');
    }, []);

    
    /**
     * Ends user session
    */
    const logOut = () => {
        setUserDetails({name: '', id: -1});
        navigation.navigate('Login');
    }

    const [isModalVisible, setModalVisible] = useState(false);

    /**
     * Manages modal visibility 
    */
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    /**
     * Update password after submit
     * 
     *  @param {object} data
    */
    const onSubmit = (data) => {
        UserService.updatePassword(data.newPassword, userDetails.id).then(v => {
            if(v >= 1){
                toggleModal();
                showToast('success', 'Sucesso', 'Parabéns, senha alterada!');
            }else{
                toggleModal();
                showToast('error', 'Erro', 'Não foi possível alterar a senha, tente novamente');
            }
        }).catch(e => {
            toggleModal();
            showToast('error', 'Erro', 'Não foi possível alterar a senha, tente novamente');
        })
    }
        
    return <>
        <Text style={styles.titleText}>Olá {userDetails.name}!</Text>
        <View style={styles.container}>
            <View>
                <TouchableOpacity>
                    <Text style={styles.subText} onPress={toggleModal}>Alterar senha</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.subText, styles.logOut]} onPress={logOut}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>

        <Modal isVisible={isModalVisible} >
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Alterar Senha</Text>
                <View>
                    <CustomInput
                        placeholder={"Nova Senha"}
                        setValue={setValue}
                        fieldName={'newPassword'}
                        error={errors?.newPassword}
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

                <TouchableOpacity style={[styles.button, styles.buttonSubmit]} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.textWhite}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={toggleModal}>
                    <Text style={styles.textWhite}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    </>
}