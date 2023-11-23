import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        width: "100%",
        height: "100%",
        paddingTop: 10
    },
    titleText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 20,
        backgroundColor: "lightseagreen",
        width: "100%",
        color: "white"
    },
    subText: {
        marginBottom: 5
    },
    logOut: {
        color: "red"
    }, 
    modalTitle: {
        fontSize: 17
    },
    button: {
        borderRadius: 20,
        height: 40,
        justifyContent: "center",
        marginTop: 15
    },
    textWhite: {
        color: "white",
        textAlign: "center"
    },
    buttonCancel: {
        backgroundColor: "red",
    },
    buttonSubmit: {
        backgroundColor: "yellowgreen"
    }, 
    modalView: {
        padding: 20, 
        backgroundColor: 'white'
    }
});

export default styles;