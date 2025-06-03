import React from 'react';
import { useLocation, Navigate } from 'react-router';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { userSelector } from '../../services/slices/user-slice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const { user, isAuthChecked, isLoading } = useSelector(userSelector);
  const location = useLocation();

  if (!isAuthChecked || isLoading) return <Preloader />;
  if (!onlyUnAuth && !user)
    return <Navigate replace to='/login' state={{ from: location }} />;
  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }
  return children;
};
