import { createContext, useContext } from "react";

export const themeContext = createContext({
    theme:'light',
    darkMode:()=>{},
    lightMode:()=>{}
})

export const ThemeProvider = themeContext.Provider

export default function useTheme() {
    return useContext(themeContext)
} 
