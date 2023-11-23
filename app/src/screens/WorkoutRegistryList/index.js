import { Image, Text, View, ScrollView } from "react-native";
import  MaterialCommunityIcons  from 
'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./styles";
import { useContext, useEffect, useState } from "react";
import WorkoutRegistryService from "../../services/workoutRegistryService";

import showToast from './../../services/toastService';
import { UserContext } from "../../context/userContext";
import { FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";

/**
 *
 *
 * @export
 * @param {NavigationScreenProps} {navigation}
 * @return {*} 
 */
export function WorkoutRegistryList({navigation}){
    const userDetails = useContext(UserContext);

    const [list, setList] = useState(null);

    const isFocused = useIsFocused();

    const imgBaseUrl = "../../images/exercicios/"

    const imgDictionary = {
        "boxe": require(imgBaseUrl + "boxe.png"),
        "corrida": require(imgBaseUrl + "corrida.png"),
        "crossfit": require(imgBaseUrl + "crossfit.png"),
        "funcional": require(imgBaseUrl + "funcional.png"),
        "natação": require(imgBaseUrl + "natação.png"),
        "pilates": require(imgBaseUrl + "pilates.png"),
        "yoga": require(imgBaseUrl + "yoga.png"),
        "zumba": require(imgBaseUrl + "zumba.png"),
    }

    /**
     * Navigate to WorkoutRegistryCreate screen 
    */
    const goAddRegistry = () => {
        navigation.navigate('WorkoutRegistryCreate');
    }

    /**
     * Get all registry by user id 
    */
    const findAll = () => {
        WorkoutRegistryService.findAll(userDetails.id).then(v => {
            if(v.length > 0){
                setList(v._array);
            }else{
                setList(null);
            }
        }).catch(e => {
            showToast('error', 'Erro', 'Infelizmente não foi possível carregar os registros');
            console.log(e);
        });
    }

    useEffect(() => {
        if(isFocused == true){
            findAll();
        }
    }, [isFocused]);


    /**
     * Get formatted date
     * 
     * @param {Date} {date} 
    */
    const getDay = (date) => {
        return new Date(date).toLocaleDateString();
    }

    return <>
        <Text style={styles.titleText}>Exercícios</Text>
        <View style={styles.container}>
            {list && (
                <FlatList
                    contentContainerStyle={styles.listView}
                    data={list}
                    renderItem={
                        ({item, index}) => {
                            return (
                                <View style={styles.card}>
                                    <Image source={imgDictionary[item["type"].toLowerCase()]} style={styles.img}></Image>
                                    <View>
                                        <Text>Dia: {getDay(item["datetime(date)"])}</Text>
                                        <Text>Duração: {item["duration"]}</Text>
                                        <Text>Atividade praticada: {item["type"]}</Text>
                                    </View>
                                </View>
                            )
                        }
                    }
                    keyExtrator={(item) => item.id}
                />
            )}

            {
                !list && (
                    <Text style={styles.textNotFound}>Nenhum registro encontrado!</Text>
                )
            }
        </View>
        <MaterialCommunityIcons name="plus-circle" color={"tomato"} size={65} style={styles.addIcon} onPress={goAddRegistry}/>
    </>
}