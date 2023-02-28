import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';

const KEY = '33348757-d3bd4442be84b253a20cc414a';

export function App() {
  return (
    <div
    // style={{
    //   height: '100vh',
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   fontSize: 40,
    //   color: '#010101'
    // }}
    >
      <Button />
      <Loader />
      <Searchbar />
    </div>
  );
}
