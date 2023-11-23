import { Text, View, Button, SafeAreaView } from "react-native";
import styles from "./styles";

import DateTimePicker from '@react-native-community/datetimepicker';

import  MaterialCommunityIcons  from 
'react-native-vector-icons/MaterialCommunityIcons';

import { useState, useContext } from "react";
import WorkoutRegistryService from "../../services/workoutRegistryService";

import showToast from './../../services/toastService';
import { UserContext } from "../../context/userContext";

import RNPickerSelect from 'react-native-picker-select';
import { TouchableOpacity } from "react-native";

/**
 * WorkoutRegistryCreate Component
 *
 * @export
 * @param {NavigationScreenProps} {navigation}
 * @return {*} 
 */
export function WorkoutRegistryCreate({navigation}){
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date(1700451000000));
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [type, setType] = useState('Funcional');

    const userDetails = useContext(UserContext);

    /**
     * Manage date value and picker visibility when selected value changes 
     * 
     *  @param {object} event
     *  @param {Date} selectedDate
    */
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDate(false);
        setDate(currentDate);
    };

    /**
     * Manage time value and picker visibility when selected value changes 
     * 
     *  @param {object} event
     *  @param {Date} selectedTime
    */
    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime;
        setShowTime(false);
        setTime(currentTime);
    }
    
    /**
     * Manages picker visibility 
    */
    const showDatePicker = () => {
        setShowDate(true);
    }

    /**
     * Manages picker visibility 
    */
    const showTimePicker = () => {
        setShowTime(true);
    }

    /**
     * Navigate to WorkoutRegistryList screen 
    */
    const goList = () => {
        navigation.navigate('WorkoutRegistryList');
    }

    /**
     * Create Registry after submit 
    */
    const onSubmit = () => {
        WorkoutRegistryService.createWorkoutRegistry({date: date.toISOString(), userId: userDetails.id, type: type, duration: getDuration()}).then(v => {
            showToast('success', 'Sucesso', 'Registro criado!');
            navigation.navigate('WorkoutRegistryList');
        }).catch(e => {
            console.log(e)
            showToast('error', 'Erro', 'Infelizmente não foi possível criar o registro, tente novamente');
        });
    }

    /**
     * Get formatted duration time 
    */
    const getDuration = () => {
        const formatted = time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const arr = formatted.split(':');

        let formattedStr = `${arr[0]}h e ${arr[1]}min`;

        if(arr[0].includes('00')){
            formattedStr = `${arr[1]}min`;
        }

        return formattedStr;
    }
  
    return <>
        <View style={styles.titleContainer}>
            <MaterialCommunityIcons name="arrow-left" color={"white"} size={30} onPress={goList}/>
            <Text style={styles.titleText}>Criar Registro</Text>
        </View>
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.formLabel}>Data: {date.toLocaleDateString()}</Text>
                <TouchableOpacity style={[styles.button, styles.buttonPicker]} onPress={showDatePicker}>
                    <Text style={styles.textWhite}>Alterar data</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.formLabel}>Duração: {getDuration()}</Text>
                <TouchableOpacity style={[styles.button, styles.buttonPicker]} onPress={showTimePicker}>
                    <Text style={styles.textWhite}>Alterar tempo de duração</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.formLabel}>Exercício praticado:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setType(value)}
                    items={[
                        { label: 'Funcional', value: 'Funcional' },
                        { label: 'Yoga', value: 'Yoga' },
                        { label: 'CrossFit', value: 'CrossFit' },
                        { label: 'Boxe', value: 'Boxe' },
                        { label: 'Natação', value: 'Natação' },
                        { label: 'Pilates', value: 'Pilates' },
                        { label: 'Corrida', value: 'Corrida' },
                        { label: 'Zumba', value: 'Zumba' },
                    ]}
                    placeholder={{}}
                />
            </View>

            <TouchableOpacity style={[styles.button, styles.buttonSubmit]} onPress={onSubmit}>
                <Text style={styles.textWhite}>Enviar</Text>
            </TouchableOpacity>

            {showDate && (
                <DateTimePicker
                    testID="datePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    onChange={onChangeDate}
                    display="spinner"
                />
            )}

            {showTime && (
                <DateTimePicker
                    testID="timePicker"
                    value={time}
                    mode="time"
                    is24Hour={true}
                    onChange={onChangeTime}
                    display="spinner"
                />
            )}
        </SafeAreaView>
    </>
}