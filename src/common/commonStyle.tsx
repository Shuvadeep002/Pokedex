import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { DarkTheme, LightTheme, StaticColors } from "../theme/StaticColors";
import { useTheme } from "../theme/themeContext";

export const useCommonStyles = () => {
    const { isDarkTheme } = useTheme()
    const mainContainer = (): ViewStyle => ({
        flex: 1,
        backgroundColor: isDarkTheme ? DarkTheme.background : LightTheme.background,
    });

    const mainContainerWithPadding = (): ViewStyle => ({
        flex: 1,
        padding: 15,
        backgroundColor: isDarkTheme ? DarkTheme.background : LightTheme.background,
    });

    const f10W900Text = (): TextStyle => ({
        fontSize: 10,
        fontWeight: "900",
        color: isDarkTheme ? DarkTheme.bright : LightTheme.bright,
    });

    const f15W900Text = (): TextStyle => ({
        fontSize: 15,
        fontWeight: "900",
        color: isDarkTheme ? DarkTheme.bright : LightTheme.bright,
    });

    const f20W900Text = (): TextStyle => ({
        fontSize: 20,
        fontWeight: "900",
        color: isDarkTheme ? DarkTheme.bright : LightTheme.bright,
    });

    const f30W900Text = (): TextStyle => ({
        fontSize: 30,
        fontWeight: "900",
        color: isDarkTheme ? DarkTheme.bright : LightTheme.bright,
    });

    const f35W900Text = (): TextStyle => ({
        fontSize: 35,
        fontWeight: "900",
        color: isDarkTheme ? DarkTheme.bright : LightTheme.bright,
    });

    const f40W900Text = (): TextStyle => ({
        fontSize: 40,
        fontWeight: "900",
        color: isDarkTheme ? DarkTheme.bright : LightTheme.bright,
    });

    const f15W500Text = (): TextStyle => ({
        fontSize: 15,
        fontWeight: "500",
        color: isDarkTheme ? DarkTheme.bright : LightTheme.bright,
    });

    return {
        mainContainer: mainContainer(),
        mainContainerWithPadding: mainContainerWithPadding(),
        f10W900Text: f10W900Text(),
        f15W900Text: f15W900Text(),
        f20W900Text: f20W900Text(),
        f30W900Text: f30W900Text(),
        f35W900Text: f35W900Text(),
        f40W900Text: f40W900Text(),
        f15W500Text: f15W500Text(),
    };
};

// StyleSheet.create({
//     mainContainer: {
//         flex: 1,
//         backgroundColor: StaticColors.background
//     },
//     mainContainerWithPadding: {
//         flex: 1,
//         padding: 15,
//         backgroundColor: StaticColors.background
//     },
//     f10W900Text: {
//         fontSize: 10,
//         fontWeight: '900',
//         color: StaticColors.bright
//     },
//     f15W900Text: {
//         fontSize: 15,
//         fontWeight: '900',
//         color: StaticColors.bright
//     },
//     f20W900Text: {
//         fontSize: 20,
//         fontWeight: '900',
//         color: StaticColors.bright
//     },
//     f30W900Text: {
//         fontSize: 30,
//         fontWeight: '900',
//         color: StaticColors.bright
//     },
//     f35W900Text: {
//         fontSize: 35,
//         fontWeight: '900',
//         color: StaticColors.bright
//     },
//     f40W900Text: {
//         fontSize: 40,
//         fontWeight: '900',
//         color: StaticColors.bright
//     },
//     f15W500Text: {
//         fontSize: 15,
//         fontWeight: '500',
//         color: StaticColors.bright
//     },
// })