import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        width: "100%",
        height: "100%",
        paddingTop: 10
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 20,
        backgroundColor: "deepskyblue",
        width: "100%",
    },
    titleText: {
        fontSize: 20,
        marginLeft: 10,
        color: "white"
    },
    inputContainer:{
        marginBottom: 15
    },
    formLabel:{
        marginBottom: 5
    },
    button: {
        borderRadius: 20,
        height: 40,
        justifyContent: "center",
        marginTop: 5
    },
    textWhite: {
        color: "white",
        textAlign: "center"
    },
    buttonPicker: {
        backgroundColor: "deepskyblue",
    },
    buttonSubmit: {
        backgroundColor: "yellowgreen"
    }
});

export default styles;