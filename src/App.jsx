import { useState, useEffect } from 'react'
import './App.css'
import {
  CLIENT_ID,
  REDIRECT_URI,
  AUTH_ENDPOINT,
  RESPONSE_TYPE,
} from "./assets/spotify";
import SearchForm from './components/SearchForm'
import ResultList from './components/ResultList'
import axios from 'axios'


function App() {
  const [search, setSearch] = useState('');

  const [criteria, setCriteria] = useState(null)
  

  const [data, setData] = useState(null);

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCriteria(search)
    
    const { response } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: criteria,
        type: "artist",
      },
    });

    setData(response.artists.items);
    setSearch('')
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <>
      <h1>Jammin'</h1>
      {token ? <SearchForm
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}
      /> : <h2>Please Log In</h2>}
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
      <ResultList data={data} />
    </>
  );
}

export default App
