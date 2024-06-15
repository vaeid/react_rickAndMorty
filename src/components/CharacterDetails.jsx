import React from 'react';
import { ArrowUpCircleIcon, ArrowDownCircleIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CharacterDetails({ selectCharacter, onAddFavorites, isExistFavorite }) {
  const [character, setCharacters] = useState(null);
  const [episodesId, setEpisodesId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (selectCharacter) {
      axios
        .get(`https://rickandmortyapi.com/api/character/${selectCharacter}`, { signal })
        .then(({ data }) => {
          setCharacters(data);
          setEpisodesId(data.episode.map((ep) => ep.split('/').at(-1)));
        })

        .catch((error) => {
          if (axios.isCancel() === false) toast.error(error.message);
        });
    }
    return () => {
      controller.abort();
    };
  }, [selectCharacter]);
  if (!character || !selectCharacter) {
    return <div className='navbar__logo'>Please select Charecter</div>;
  }
  return (
    <div style={{ flex: 1 }}>
      <CharacterInfo character={character} isExistFavorite={isExistFavorite} onAddFavorites={onAddFavorites} />
      <Episods episodesId={episodesId} />
    </div>
  );
}
function CharacterInfo({ character, isExistFavorite, onAddFavorites }) {
  return (
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
  );
}
function Episods({ episodesId }) {
  const [episodes, setEpisodes] = useState([]);
  const [sortBy, setSortBy] = useState(true);
  const handelSort = () => {
    const sortedEpisodes = sortBy ? episodes.sort((a, b) => b.id - a.id) : episodes.sort((a, b) => a.id - b.id);
    setEpisodes(sortedEpisodes);
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    axios
      .get(`https://rickandmortyapi.com/api/episode/${episodesId}`, { signal })
      .then(({ data: episodesData }) => setEpisodes(episodesData.flat().slice(0, 10)));
    return () => {
      controller.abort();
    };
  }, [episodesId]);
  return (
    <div className='character-episodes'>
      <div className='title'>
        <h2>Lorem, ipsum dolor.</h2>
        <button
          onClick={() => {
            setSortBy((is) => !is);
            handelSort();
          }}
        >
          {sortBy ? <ArrowUpCircleIcon className='icon' /> : <ArrowDownCircleIcon className='icon' />}
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
  );
}
