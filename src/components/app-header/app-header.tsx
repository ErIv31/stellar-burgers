import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'src/services/store';
import { userSelector } from 'src/services/slices/user-slice';

export const AppHeader: FC = () => {
  const { user } = useSelector(userSelector);

  return <AppHeaderUI userName={user ? user.name : ''} />;
};
