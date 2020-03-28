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

`