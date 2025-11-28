import { createContext, useState } from "react";


export const contextThemeController = createContext();



const ThemeContainer = ({children}) => {


  const [Theme ,setTheme] = useState(true)

    return ( 
        <contextThemeController.Provider value={{ Theme,  setTheme}} >
            {children}
        </contextThemeController.Provider>
     );
}
 
export default ThemeContainer;