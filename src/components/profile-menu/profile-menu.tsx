import { FC } from 'react';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from 'src/services/store';
import { logoutUserThunk } from 'src/services/slices/user-slice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUserThunk());
    navigate('/login');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
