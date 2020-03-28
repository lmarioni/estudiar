import React, {createContext, useState} from 'react';
import Cookies from 'js-cookie'
    
export const Context = createContext();

const Provider = ({children}) => {
  const [token, setToken] = useState('')

  const [isAuth, setIsAuth] = useState(() => {
    const token = Cookies.get('token');

    if(token){
      setToken(token)
      return true
    }else{
      return false
    }
  });



  //en activateAuth() sacar sessionStorage y usar cookies que ya estan seteadas
  const value = {
      isAuth,
      token,
      activateAuth: (token, email = '') => {
        setIsAuth(true)
        window.sessionStorage.setItem('token',token)
      },
      removeAuth: () =>{
        setIsAuth(false)
        window.sessionStorage.removeItem('token')
      }
  }

  return(
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default {
  Provider,
  Consumer: Context.Consumer
};
