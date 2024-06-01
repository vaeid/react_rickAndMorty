import { EyeIcon } from '@heroicons/react/16/solid';
import Loader from './Loader';

export default function CharacterList({ characters, isLoading }) {
  if (isLoading) {
    return (
      <div className='characters-list'>
        <Loader />
      </div>
    );
  }
  return (
    <div className='characters-list'>
      {characters.map((character) => (
        <Character item={character} key={character.id} />
      ))}
    </div>
  );
}
function Character({ item }) {
  console.log(item);
  return (
    <div className='list__item'>
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
    </div>
  );
}
function CharacterName({ item }) {
  return (
    <h3 className='name'>
      <span>{item.gender === 'Male' ? '🙍‍♂️ ' : '🙍‍♀️ '}</span>
      <span>{item.name}</span>
    </h3>
  );
}
function CharacterInfo({ item }) {
  return (
    <div className='list-item__info info'>
      <span className={`status ${item.status === 'Dead' ? 'red' : ''}`}></span>
      <span className=''> {item.status}</span>
      <span className=''> - {item.species}</span>
      <button className='icon red'>
        <EyeIcon />
      </button>
    </div>
  );
}
