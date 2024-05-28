import { ArrowUpCircleIcon } from '@heroicons/react/16/solid';
import { character, episodes } from '../../data/data';

export default function CharacterDetails() {
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
