import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../config'
import { stateTypes, user } from '../interfaces/interfaces';

import NavBar from './NavBar';

export function PanelUser(){
  const user: Array<user> = useAppSelector((state: stateTypes)=> state.userDetail )
  const token: any = localStorage.getItem('token')
  return(
    <div>
      {
        JSON.parse(token).token?
        <div>
          <div>
            <NavBar/>
          </div>
          <div>
            <div>
              Mi Cuenta
            </div>
            <aside>
              <h1>Bienvenido {user[0].name}</h1>
              <img src='' />
            </aside>
          </div>
        </div>
        :
        <div>
          <h1>Iniciar sesion</h1>
          <NavLink to='/loggin'><button>Iniciar Sesion</button></NavLink>
        </div>
      }
      
    </div>
  )
}