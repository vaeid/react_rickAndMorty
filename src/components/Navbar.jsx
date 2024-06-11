import { HeartIcon } from '@heroicons/react/24/outline';

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
      placeholder='search ...'
    />
  );
}
export function Favorites({ numOfFavs }) {
  return (
    <button className='heart'>
      <HeartIcon className='icon' />
      <span className='badge'>{numOfFavs}</span>
    </button>
  );
}
