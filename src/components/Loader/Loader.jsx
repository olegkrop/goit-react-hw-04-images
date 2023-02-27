import { RotatingLines } from 'react-loader-spinner';
import style from './Loader.module.css';

export function Loader() {
  return (
    <div className={style.loader__wrap}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
}
