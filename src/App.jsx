import { allCharacters } from '../data/data.js';
import './App.css';
import CharacterList from './components/CharacterList.jsx';
import CharacterDetails from './components/CharacterDetails.jsx';
import Navbar from './components/Navbar.jsx';

export default function App() {
  return (
    <div className='app'>
      <Navbar />
      <div className='main'>
        <CharacterList characters={allCharacters} />
        <CharacterDetails />
      </div>
    </div>
  );
}
