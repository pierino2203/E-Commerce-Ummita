import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../config'
import { registerUser } from '../redux/actions';

export default function RegisterUser(){
  const dispatch = useAppDispatch()
  const [input,setInput]= useState({
    name: '',
    lastName: '',
    mail: '',
    password: '',
    adress: '',
    img: ''
  })
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement> ){
    e.preventDefault()
    if(input.name!=='' && input.lastName!=='' && input.mail!=='' && input.password!=='' && input.adress!=='' ){
      dispatch(registerUser(input))
      alert('Usuario correctamente creado')
      setInput({
        name: '',
        lastName: '',
        mail: '',
        password: '',
        adress: '',
        img: ''
      })
    }else{
      alert('Ingrese los campos requeridos')
    }
  }
  return(
    <div>
      <h1>Registrate</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre: </label>
          <input
            type='text'
            value={input.name}
            name='name'
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <div>
          <label>Apellido: </label>
          <input
            type='text'
            value={input.lastName}
            name='lastName'
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <div>
          <label>E-mail: </label>
          <input
            type='text'
            value={input.mail}
            name='mail'
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type='text'
            value={input.password}
            name='password'
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <div>
          <label>Direccion: </label>
          <input
            type='text'
            value={input.adress}
            name='adress'
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <div>
          <label>Imagen: </label>
          <input
            type='text'
            value={input.img}
            name='img'
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <div>
          <button type='submit'>Crear cuenta</button>
        </div>
      </form>
    </div>
  )
}