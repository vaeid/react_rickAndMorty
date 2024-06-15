import { HeartIcon } from '@heroicons/react/24/outline';
import Modal from './Modal';
import { Character } from './CharacterList';
import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/16/solid';

export default function Navbar({ children }) {
  return (
    <nav className='navbar'>
      <div className='navbar__logo'>LOGO</div>

      {children}
    </nav>
  );
}
export function NavbarResult({ numOfResult }) {
  return <div className='navbar__result'>found {numOfResult} character</div>;
}
export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type='text'
      className='text-field'
      placeholder='search (min 3 character)...'
    />
  );
}
export function Favorites({ favorites, onRemoveFavorite }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <Modal title={'favorites'} isOpen={modalIsOpen} onOpen={setModalIsOpen}>
        {favorites.map((item) => (
          <Character key={item.id} item={item}>
            <button
              className='icon red'
              onClick={() => {
                onRemoveFavorite(item.id);
              }}
            >
              <TrashIcon className='icon red' />
            </button>
          </Character>
        ))}
      </Modal>
      <button
        className='heart'
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        <HeartIcon className='icon' />
        <span className='badge'>{favorites.length}</span>
      </button>
    </>
  );
}
