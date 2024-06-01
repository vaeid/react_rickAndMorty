import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import CharacterDetails from './components/CharacterDetails.jsx';
import CharacterList from './components/CharacterList.jsx';

import Navbar, { NavbarResult } from './components/Navbar.jsx';
import { useEffect, useState } from 'react';

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => {
        setIsLoading(true);
        return response.json();
      })
      .then((data) => setCharacters(data.results))
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
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
      <Toaster></Toaster>
      <Navbar>
        <NavbarResult numOfResult={characters.length} />
      </Navbar>
      <Main>
        <CharacterList characters={characters} isLoading={isLoading} />
        <CharacterDetails />
      </Main>
    </div>
  );
}
function Main({ children }) {
  return <div className='main'>{children}</div>;
}
