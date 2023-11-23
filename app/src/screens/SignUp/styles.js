import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignContent: "center",
        width: "100%"
    },
    iconContainer:{
       flexDirection: "row",
       alignItems: "center",
       marginBottom: 8
    },
    healthIcon: {
        width: 65,
        height: 65
    },
    titleText:{
        fontSize: 24,
        fontWeight: "600",
        marginLeft: 10
    },
    loginText: {
        fontSize: 24,
        marginVertical: 20,
        marginLeft: 10
    },
    navLinkContainer: {
        marginTop: 10,
        marginLeft: 10
    },
    navLink: {
        color: "blue"
    },
    button: {
        backgroundColor: "#000",
        borderRadius: 20,
        height: 40,
        justifyContent: "center",
        marginVertical: 20
    },
    textWhite: {
        color: "white",
        textAlign: "center"
    }
});

export default styles;