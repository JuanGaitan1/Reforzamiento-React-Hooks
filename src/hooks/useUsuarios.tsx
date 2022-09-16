import { useEffect, useState, useRef } from 'react';
import {reqResApi} from '../api/reqRes'
import { ReqResListado, Usuario } from '../interfaces/reqRes';

export const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([])


    //paginado
    const paginaRef = useRef(1)

    useEffect(() => {
      cargarUsuarios()
    }, [])

    const cargarUsuarios = async() => {

      const resp= await reqResApi.get<ReqResListado>('/users', {
        params:{
          //current es el valor que tiene useRef osea 1
          page: paginaRef.current
        }
      })


      if (resp.data.data.length > 0) {
        setUsuarios(resp.data.data);  
      }else{
        paginaRef.current --;
        alert ('No hay mas registros');
      }
    }

    const paginaSiguiente = () => {
      paginaRef.current ++;
      cargarUsuarios()
      
    }

    const paginaAnterior = () => {
      if (paginaRef.current > 1) {
        paginaRef.current --;
        cargarUsuarios();
      }
    }





  return {
    usuarios,
    cargarUsuarios,
    paginaSiguiente,
    paginaAnterior
  }
}
