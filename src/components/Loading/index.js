import React from 'react';
import { Loadingstyle } from './styles';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Loading = () =>  {
  return (
    <Loadingstyle className="text-center"> <AiOutlineLoading3Quarters size='50' animation="spin" className='spin' /> Cargando... </Loadingstyle>
  )
}
