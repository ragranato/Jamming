import React from 'react'
import style from './SearchForm.module.css'

function SearchForm({search, setSearch, handleSubmit}) {
  const handleChange = (e) => {
    setSearch(e.target.value)
  }  
  
  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="search" className={style.input}>Search:</label>
        <input id='search' type='text' value={search} onChange={handleChange} className={style.input} />
        <button type='submit'>Search</button>
    </form>
  )
}

export default SearchForm