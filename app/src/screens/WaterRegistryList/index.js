import { Image, Text, View, ScrollView } from "react-native";
import  MaterialCommunityIcons  from 
'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./styles";
import { useContext, useEffect, useState } from "react";
import WaterRegistryService from "../../services/waterRegistryService";

import showToast from './../../services/toastService';
import { UserContext } from "../../context/userContext";
import { FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";

/**
 * WaterRegistryList Component
 *
 * @export
 * @param {NavigationScreenProps} {navigation}
 * @return {*} 
 */
export function WaterRegistryList({navigation}){
    const userDetails = useContext(UserContext);

    const [list, setList] = useState(null);

    const isFocused = useIsFocused();

    /**
     * Navigate to WaterRegistryCreate screen 
    */
    const goAddRegistry = () => {
        navigation.navigate('WaterRegistryCreate');
    }

    /**
     * Get all registry by user id 
    */
    const findAll = () => {
        WaterRegistryService.findAll(userDetails.id).then(v => {
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
     * Get formatted date (dd/mm/yy) 
     * 
     * @param {Date} date
    */
    const getDay = (date) => {
        return new Date(date).toLocaleDateString();
    }

    /**
     * Get formatted time (hh:mm) 
     * 
     *  @param {Date} date
    */
    const getTime = (date) => {
        return new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }

    return <>
        <Text style={styles.titleText}>Água</Text>
        <View style={styles.container}>
            {list && (
                <FlatList
                    contentContainerStyle={styles.listView}
                    data={list}
                    renderItem={
                        ({item, index}) => {
                            return (
                                <View style={styles.card}>
                                    <MaterialCommunityIcons name="cup" color={"deepskyblue"} style={styles.img} size={50}/>
                                    <View>
                                        <Text>Dia: {getDay(item["datetime(date)"])}</Text>
                                        <Text>Horário: {getTime(item["datetime(date)"])}</Text>
                                        <Text>Quantidade: {item["quantity"]} ml</Text>
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
        <MaterialCommunityIcons name="plus-circle" color={"deepskyblue"} size={65} style={styles.addIcon} onPress={goAddRegistry}/>
    </>
}