import { createContext, useState } from "react";


export const contextDrawerController = createContext();



const DrawerContainer = ({children}) => {


  const [draweHandler ,setDrawerHandler] = useState({
    right:false
  })

    return ( 
        <contextDrawerController.Provider value={{ draweHandler,  setDrawerHandler}} >
            {children}
        </contextDrawerController.Provider>
     );
}
 
export default DrawerContainer;