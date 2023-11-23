import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    titleText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 20,
        backgroundColor: "deepskyblue",
        width: "100%",
        color: "white"
    },
    container: {
        paddingHorizontal: 20,
        width: "100%",
        height: "100%",
    },
    addIcon:{
        position: "absolute",
        bottom: 10,
        right: 10,
        zIndex: 2
    },
    card:{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 18,
        elevation: 10,
        shadowColor: '#52006A',
    },
    listView: {
        paddingBottom: 75
    },
    textNotFound: {
        marginTop: 10
    },
    img: {
        marginRight: 10
    }
});

export default styles;