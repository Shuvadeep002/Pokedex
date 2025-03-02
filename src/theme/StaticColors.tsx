export const StaticColors = {
    background: "#000",
    bright: "#fff",
    azureBlue: "#3674B5",
    skyBlue: "#0076D7",
    charcoal: '#333333',
    yellow: "#FFEB00",
    red: '#D84040',
    grey: "#B9B28A",
    blackWithOpacity: (opacity?: number) => `rgba(0, 0, 0,${opacity ?? 1})`,
    whiteWithOpacity: (opacity?: number) => `rgba(255, 255, 255,${opacity ?? 1})`
}

export const LightTheme = {
    background: "#fff",
    bright: "#000",
    azureBlue: "#3674B5",
    skyBlue: "#0076D7",
    charcoal: '#333333',
    yellow: "#FFEB00",
    red: '#D84040',
    grey: "#B9B28A",
    lightWithOpacity: (opacity?: number) => `rgba(0, 0, 0,${opacity ?? 1})`,
    darkFWithOpacity: (opacity?: number) => `rgba(255, 255, 255,${opacity ?? 1})`
}

export const DarkTheme = {
    background: "#000",
    bright: "#fff",
    azureBlue: "#3674B5",
    skyBlue: "#0076D7",
    charcoal: '#333333',
    yellow: "#FFEB00",
    red: '#D84040',
    grey: "#B9B28A",
    darkFWithOpacity: (opacity?: number) => `rgba(0, 0, 0,${opacity ?? 1})`,
    lightWithOpacity: (opacity?: number) => `rgba(255, 255, 255,${opacity ?? 1})`
}