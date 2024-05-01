import { useState,useEffect } from "react"
import Todo from "./components/Todo"
import { ThemeProvider } from "./context/theme"
function App() {
  const [theme,setTheme] = useState('light');
  const darkMode = ()=>{
    setTheme('dark')
  }
  const lightMode = ()=>{
    setTheme('light')
  }
  useEffect(() => {
    let html = document.querySelector('html')
    html.classList.remove("light","dark")
    html.classList.add(theme)
  }, [theme])
  
  return (
    <ThemeProvider value={{theme,darkMode,lightMode}}>
      <div className="w-screen dark:bg-slate-950 h-screen">
        <Todo/>
      </div>
    </ThemeProvider>
  )
}

export default App 