import { ThemeProvider } from "@react-navigation/native"
import { Children, createContext, ReactNode, useContext, useState } from "react"
import { DarkTheme, LightTheme } from "./StaticColors"

interface ThemeContextTypes {
    isDarkTheme: boolean,
    changeTheme: () => void
}

export const ThemeContext = createContext<ThemeContextTypes>({
    isDarkTheme: true,
    changeTheme: () => { }
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkTheme, setTheme] = useState(true)
    const changeTheme = () => {
        setTheme(!isDarkTheme)
    }
    return (
        <ThemeContext.Provider value={{ isDarkTheme, changeTheme }} >
            <ThemeProvider value={isDarkTheme ? DarkTheme : LightTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}