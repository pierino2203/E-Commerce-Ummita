import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../shared/hooks";
import { getProductByName } from "../redux/slice/productSlice";

export default function SearchBar() {
  // const [name, setName] = useState('')
  // const dispatch = useAppDispatch();
  // function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   setName(e.target.value)
  // }
  // function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   dispatch(getProductByName(name))
  //   setName('')
  // }
  return (
    <div className="">
      {/* <form className="d-flex col-4" onSubmit={(e) => handleSubmit(e)} role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={name} onChange={handleChange} />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  )
}