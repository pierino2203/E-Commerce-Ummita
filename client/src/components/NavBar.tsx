import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../config'
import { cleanError, getProducts, getUserData, logOut } from '../redux/actions'
import img from '../imagenes/ummita.png'
import SearchBar from './SearchBar'
import { NavLink, useNavigate } from 'react-router-dom'
import { stateTypes, user } from '../interfaces/interfaces'
import { useSelector } from 'react-redux'

export default function NavBar(){
  const navigate = useNavigate()
  const dispatch: any = useAppDispatch()
  const user: Array<user>  = useSelector((state : stateTypes)=>  state.userDetail)
  // const [openUser, setOpenUser] = useState<boolean>(false)
  let token: any= localStorage.getItem('token')
  console.log((JSON.parse(token)))
  
  useEffect(()=>  {
    dispatch(getUserData(JSON.parse(token)))
  },[token])
  function handlerlogOut(){
    localStorage.setItem('token',JSON.stringify([]))
    dispatch(logOut())
    navigate('/home')
    window.location.reload()
  }
  return(
    <header>
      
      <ul>
        <li>
          <div>
            <h1>Ummita En Chala</h1>
            <img src={img } width="50" height="30"/>
            <div>
              <SearchBar/>
            </div>
            <div>
              {
                JSON.parse(token).token   
                ? <div>
                  <h1>hola {user[0]?.name}</h1>
                  <NavLink to='/user'><h1>Mi cuenta</h1> </NavLink>           
                    
                 <button onClick={()=>handlerlogOut()}>cerrar sesion</button>
                 

                </div>
                : <NavLink to='/loggin'><button>Iniciar Sesion</button></NavLink>
              }
              
            </div>
            <NavLink to='/cart'><button>Cartito</button></NavLink>  
          </div>
        </li>

      </ul>
    </header>
  )
}