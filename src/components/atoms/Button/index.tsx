import { ReactComponent as StandardAccount } from '../../../assets/icons/lg32/standardAccount.svg';
import forwardGrey from '../../../assets/images/forwardGrey.png';

import s from './index.module.scss';

function Button() {
  return (
    <div data-testid="button" className={s.button}>
      <StandardAccount />
      <img src={forwardGrey} alt="" />
      Button
    </div>
  );
}

export default Button;
