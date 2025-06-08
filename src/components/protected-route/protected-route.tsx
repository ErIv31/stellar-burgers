import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { userSelector } from '../../services/slices/user-slice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const location = useLocation();
  const { user, isAuthChecked, isLoading } = useSelector(userSelector);

  if (!isAuthChecked || isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user)
    return <Navigate to='/login' state={{ from: location }} replace />;

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  return children;
};
