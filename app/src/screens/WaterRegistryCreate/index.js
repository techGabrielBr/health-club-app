import { Text, View, Button, SafeAreaView } from "react-native";
import styles from "./styles";
import CustomInput from "../../components/CustomInput";

import DateTimePicker from '@react-native-community/datetimepicker';

import  MaterialCommunityIcons  from 
'react-native-vector-icons/MaterialCommunityIcons';

import waterRegistryValidationSchema from "../../yup-schemas/waterRegistryValidationSchema"

import { useForm } from  'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

import { useState, useEffect, useContext } from "react";
import WaterRegistryService from "../../services/waterRegistryService";

import showToast from './../../services/toastService';
import { UserContext } from "../../context/userContext";

import { TouchableOpacity } from "react-native";

/**
 * WaterRegistryCreate Component
 *
 * @export
 * @param {NavigationScreenProps} {navigation}
 * @return {*} 
 */
export function WaterRegistryCreate({navigation}){
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const { register, setValue, handleSubmit, formState: {errors} } = useForm({resolver: yupResolver(waterRegistryValidationSchema)})

    const userDetails = useContext(UserContext);

    useEffect(() => {
        register('quantity');
    }, [register]);

    /**
     * Manage date value and picker visibility when selected value changes 
     * 
     *  @param {object} event
     *  @param {Date} selectedDate
    */
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    /**
     * Manage DateTimePicker Component mode 
     * 
     *  @param {string} currentMode
    */
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    /**
     * Set DateTimePicker Component mode to date
    */
    const showDatepicker = () => {
        showMode('date');
    };

    /**
     * Set DateTimePicker Component mode to time
    */
    const showTimepicker = () => {
        showMode('time');
    };

    /**
     * Navigate to WaterRegistryList screen
    */
    const goList = () => {
        navigation.navigate('WaterRegistryList');
    }

    /**
     * Create water registry after submit 
     * 
     *  @param {object} data
    */
    const onSubmit = (data) => {
        const copyDate = new Date(date.getTime());
        copyDate.setMinutes(copyDate.getMinutes() - copyDate.getTimezoneOffset());
        
        WaterRegistryService.createWaterRegistry({date: copyDate.toISOString(), userId: userDetails.id, ...data}).then(v => {
            showToast('success', 'Sucesso', 'Registro criado!');
            navigation.navigate('WaterRegistryList');
        }).catch(e => {
            console.log(e)
            showToast('error', 'Erro', 'Infelizmente não foi possível criar o registro, tente novamente');
        });
    }
  
    return <>
        <View style={styles.titleContainer}>
            <MaterialCommunityIcons name="arrow-left" color={"white"} size={30} onPress={goList}/>
            <Text style={styles.titleText}>Criar Registro</Text>
        </View>
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.formLabel}>Data: {date.toLocaleDateString()}</Text>
                <TouchableOpacity style={[styles.button, styles.buttonPicker]} onPress={showDatepicker}>
                    <Text style={styles.textWhite}>Alterar data</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.formLabel}>Horário: {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                <TouchableOpacity style={[styles.button, styles.buttonPicker]} onPress={showTimepicker}>
                    <Text style={styles.textWhite}>Alterar horário</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.formLabel}>Quantidade (ml):</Text>
                <CustomInput
                    placeholder={"200"}
                    setValue={setValue}
                    fieldName={'quantity'}
                    error={errors?.quantity}
                    inputMode={'numeric'}
                    secureTextEntry={false}
                />
            </View>

            <TouchableOpacity style={[styles.button, styles.buttonSubmit]} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.textWhite}>Enviar</Text>
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                    display="spinner"
                />
            )}
        </SafeAreaView>
    </>
    
}