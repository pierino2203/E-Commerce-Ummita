import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../config'
import { cleanError, logginUser } from '../redux/actions'
import {stateTypes} from '../interfaces/interfaces'

export default function FormLoggin(){
  const dispatch = useAppDispatch()
  let error = useAppSelector((state: stateTypes) => state.error);
  const navigate = useNavigate()
  const [input,setInput] = useState({
    mail: '',
    password:''
  })
  
  useEffect(()=>  {
    dispatch(cleanError())
  },[dispatch])
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(input.mail!=='' || input.password!==''){
      dispatch(logginUser(navigate,input))

    }else{
      alert("Ingrese los datos requeridos")
    }
  }
  return(
    <div>
      <form onSubmit={(e)=> handleSubmit(e)}>
        <input
          type='text'
          value= {input.mail}
          name='mail'
          onChange={(e)=> handleChange(e)}
        />
        <input
          type='text'
          value= {input.password}
          name='password'
          onChange={(e)=> handleChange(e)}
        />
        {
          error && 
          <div >
            <h1 >{error}</h1>
          </div>
        }
        <button type='submit'>Iniciar Sesion</button>
      </form>
      <div>
        <p>No tiene cuenta?</p>
        <NavLink to='/register'><button>Crear cuenta</button></NavLink>
      </div>
    </div>
  )

}