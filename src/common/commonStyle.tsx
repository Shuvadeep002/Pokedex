import { StyleSheet } from "react-native";
import { StaticColors } from "../assets/StaticColors";

export const commonStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: StaticColors.background
    },
    mainContainerWithPadding: {
        flex: 1,
        padding: 15,
        backgroundColor: StaticColors.background
    },
    f20W900Text: {
        fontSize: 20,
        fontWeight: '900',
        color: StaticColors.white
    },
    f30W900Text: {
        fontSize: 30,
        fontWeight: '900',
        color: StaticColors.white
    },
    f35W900Text: {
        fontSize: 35,
        fontWeight: '900',
        color: StaticColors.white
    },
    f40W900Text: {
        fontSize: 40,
        fontWeight: '900',
        color: StaticColors.white
    },
    f15W500Text: {
        fontSize: 15,
        fontWeight: '500',
        color: StaticColors.white
    },
})