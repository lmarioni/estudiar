import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
  /* #app {
    box-shadow: 0010pxrgba(0, 0, 0, 0.05);
    overflow-x: hidden;
    min-height: 100vh;
    padding-bottom: 10px;
  } */
  .spin {
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.div-menu{
  border-right: 1px solid #EBEBEB;
}

body{
  background: #F4F7F9;
}

html{
  background: #F4F7F9;
}

.card{
  border: none;
  border-color: #e2e3e7;
    box-shadow: 0 5px 30px -15px rgba(0,0,0,.2);
    border-radius: .25rem;
}

.bg-red{
  background: red;
}


`