import React, {createContext, useState} from 'react';
import Cookies from 'js-cookie'
    
export const Context = createContext();

const Provider = ({children}) => {

  const [isAuth, setIsAuth] = useState(() => {
    if(Cookies.get('token')){
      return true
    }else{
      return false
    }
  });

  const [email, setEmail] = useState('')

  //en activateAuth() sacar sessionStorage y usar cookies que ya estan seteadas
  const value = {
      isAuth,
      email,
      activateAuth: (token, email = '') => {
        setIsAuth(true)
        window.sessionStorage.setItem('token',token)
        setEmail(email)
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
