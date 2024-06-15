import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import CharacterDetails from './components/CharacterDetails.jsx';
import CharacterList from './components/CharacterList.jsx';

import Navbar, { Favorites, NavbarResult, Search } from './components/Navbar.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectCharacterId, setSelectCharacterId] = useState(1);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('Favorits')) || []);
  const handelSelectCharacter = (id) => {
    setSelectCharacterId(id);
  };
  const handelAddFavorites = (character, isExistFavorite) => {
    if (isExistFavorite) {
      setFavorites((prevFav) => prevFav.filter((fav) => fav.id !== character.id));
    } else {
      setFavorites((prevFav) => [...prevFav, character]);
    }
  };

  const handelRemoveFavorite = (id) => {
    setFavorites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };
  const isExistFavorite = favorites.map((fav) => fav.id).includes(selectCharacterId);
  useEffect(() => {
    localStorage.setItem('Favorits', JSON.stringify(favorites));
  }, [favorites]);
  // ************** handel request with axios and then catch */
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setIsLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/character?name=${query}`, { signal })
      .then(({ data }) => {
        if (query.length > 2 || query.length == 0) {
          setCharacters(data.results.slice(0, 10));
        } else {
          setCharacters([]);
        }
      })
      .catch((error) => {
        setCharacters([]);
        if (axios.isCancel() === false) toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
    return () => {
      controller.abort();
    };
  }, [query]);

  //************** handel request with axios and async await */
  // useEffect(() => {
  //       setIsLoading(true);
  //   async function fetchData() {
  //     try {
  //       const { data } = await axios.get('https://rickandmortyapi.com/api/character');
  //       console.log(data);
  //       setCharacters(data.results);
  //     } catch (error) {
  //       toast.error(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  //************** handel request with then catch */
  // useEffect(() => {
  //       setIsLoading(true);
  //   fetch('https://rickandmortyapi.com/api/character')
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => setCharacters(data.results))
  //     .catch((error) => {
  //       toast.error(error.message);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  //************** handel request with async await */
  // useEffect(() => {
  //       setIsLoading(true);
  //   async function fetchData() {
  //     try {
  //       const response = await fetch('https://rickandmortyapi.com/api/character');
  //       const data = await response.json();
  //       setCharacters(data.results);
  //     } catch (error) {
  //       toast.error(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className='app'>
      <Toaster />

      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NavbarResult numOfResult={characters.length} />
        <Favorites favorites={favorites} onRemoveFavorite={handelRemoveFavorite} />
      </Navbar>
      <Main>
        <CharacterList characters={characters} isLoading={isLoading} onSelectCharacter={handelSelectCharacter} />
        <CharacterDetails
          isExistFavorite={isExistFavorite}
          selectCharacter={selectCharacterId}
          onAddFavorites={handelAddFavorites}
        />
      </Main>
    </div>
  );
}
function Main({ children }) {
  return <div className='main'>{children}</div>;
}
