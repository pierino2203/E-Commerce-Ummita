import React, { useState } from 'react'
import { useAppDispatch } from '../config'
import { getProductByName } from '../redux/actions'

export default function SearchBar(){
  const dispatch: any = useAppDispatch()
  const [name,setName] = useState('')
  function handleInputName(e:React.ChangeEvent<HTMLInputElement>){
    e.preventDefault()
    setName(e.target.value)
  }
  function handleSumbit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    dispatch(getProductByName(name))
    setName('')
  }  
  return(
    <div>
      <div>
        <form onSubmit={(e)=> handleSumbit(e)}>
          <input
            type='text'
            value={name}
            placeholder="Nombre Del producto"
            onChange={(e)=> handleInputName(e)}
          />
          <button type='submit' >buscar</button>
        </form>
      </div>
    </div>)
}