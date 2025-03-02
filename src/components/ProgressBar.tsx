import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { DarkTheme, LightTheme, StaticColors } from "../theme/StaticColors";
import { getPokemonName } from "../common/commonFunctions";
import { useTheme } from "../theme/themeContext";

const ProgressBar = ({ value, max, color, name }: { value: number, max: number, color: string, name?: string }) => {
    const progress = (value / max) * 100;
    const { isDarkTheme } = useTheme()
    return (
        <View style={styles.mainContainer}>
            {(name ?? "").length > 0 &&
                <View style={styles.textContainer}>
                    <Text style={maintext(isDarkTheme)}>{getPokemonName(name)}</Text>
                </View>}
            <View style={styles.container}>
                <View style={backgroundBar(isDarkTheme)}>
                    <View
                        style={[styles.progressBar, { width: `${progress}%`, backgroundColor: color }]}
                    />
                </View>
                <Text style={[text(isDarkTheme)]}>{`${value}/${max}`}</Text>
            </View>
        </View>
    );
};

const backgroundBar = (darkMode: boolean): ViewStyle => ({
    height: 20,
    width: "100%",
    backgroundColor: darkMode ? DarkTheme.bright : LightTheme.bright,
    borderRadius: 10,
    overflow: "hidden",
})
const text = (darkMode: boolean): TextStyle => ({
    position: "absolute",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: darkMode ? DarkTheme.background : LightTheme.background,
})
const maintext = (darkMode: boolean): TextStyle => ({
    fontSize: 15,
    fontWeight: "600",
    color: darkMode ? DarkTheme.bright : LightTheme.bright,
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    progressBar: {
        height: "100%",
        borderRadius: 10,
    },
    mainContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginVertical: 10
    },
    textContainer: {
        flex: 0.2,
        marginRight: 10
    }
});

export default ProgressBar;
