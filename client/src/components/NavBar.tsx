import React, { useEffect } from 'react'
import { useAppDispatch } from '../config'
import { getProducts } from '../redux/actions'
import img from '../imagenes/ummita.png'
import SearchBar from './SearchBar'

export default function NavBar(){
  const dispatch: any = useAppDispatch()
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
          </div>
        </li>

      </ul>
    </header>
  )
}