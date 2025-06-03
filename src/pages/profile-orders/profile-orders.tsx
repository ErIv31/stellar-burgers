import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrderHistoryThunk,
  orderHistorySelector
} from '../../services/slices/order-history-slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orderHistory: orders, loading } = useSelector(orderHistorySelector);

  useEffect(() => {
    dispatch(getOrderHistoryThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} loading={loading} />;
};
