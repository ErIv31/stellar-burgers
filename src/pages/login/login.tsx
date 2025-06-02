import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'src/services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getUserThunk,
  loginUserThunk,
  userSelector
} from 'src/services/slices/user-slice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error } = useSelector(userSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    dispatch(loginUserThunk({ email, password }))
      .unwrap()
      .then(() => {
        dispatch(getUserThunk())
          .unwrap()
          .then(() => {
            const from = location.state?.from || { pathname: '/' };
            navigate(from);
          })
          .catch((err) =>
            console.error(`Failed to complete the request: ${err.message}`)
          );
      })
      .catch((err) =>
        console.error(`Failed to complete the request: ${err.message}`)
      );
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
