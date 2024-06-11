import { ArrowUpCircleIcon } from '@heroicons/react/16/solid';
import { episodes } from '../../data/data';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CharacterDetails({ isExistFavorite, selectCharacter, onAddFavorites }) {
  const [character, setCharacters] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    if (selectCharacter) {
      axios
        .get(`https://rickandmortyapi.com/api/character/${selectCharacter}`)
        .then(({ data }) => {
          const episodesId = data.episode.map((ep) => ep.split('/').at(-1));
          axios
            .get(`https://rickandmortyapi.com/api/episode/${episodesId}`)
            .then(({ data: episodesData }) => setEpisodes(episodesData.flat().slice(0, 10)));

          setCharacters(data);
        })

        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [selectCharacter]);
  if (!character || !selectCharacter) {
    return <div className='navbar__logo'>Please select Charecter</div>;
  }
  return (
    <div style={{ flex: 1 }}>
      <div className='character-detail'>
        <img src={character.image} alt={character.name} className='character-detail__img' />
        <div className='character-detail__info'>
          <h3 className='name'>
            {' '}
            <span>{character.gender === 'Male' ? '🙍‍♂️ ' : '🙍‍♀️ '}</span>
            <span> {character.name}</span>
          </h3>
          <div className='info'>
            <span className={`status ${character.status === 'Dead' ? 'red' : ''}`}></span>
            <span className=''> {character.status}</span>
            <span className=''> - {character.species}</span>
          </div>
          <div className='location'>
            <p>Last location:</p>
            <p>{character.location.name}</p>
          </div>
          <div className='actions'>
            {isExistFavorite ? (
              <button className='btn btn--primary' onClick={() => onAddFavorites(character, isExistFavorite)}>
                remove from Favorites
              </button>
            ) : (
              <button className='btn btn--primary' onClick={() => onAddFavorites(character, isExistFavorite)}>
                Add to Favorites
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='character-episodes'>
        <div className='title'>
          <h2>Lorem, ipsum dolor.</h2>
          <button>
            <ArrowUpCircleIcon className='icon' />
          </button>
        </div>
        <ul className=''>
          {episodes.map((episode, index) => (
            <li key={episode.id}>
              <div>
                {String(index + 1).padStart(2, '0')} - {episode.episode}: <strong>{episode.name}</strong>
              </div>
              <div className='badge badge--secondary'>{episode.air_date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
