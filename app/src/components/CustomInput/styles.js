import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 0,
        borderBottomWidth: 1,
        padding: 10
    },
    inputError:{
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12
    }
});

export default styles;