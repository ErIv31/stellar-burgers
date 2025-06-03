import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import { orderFeedSelector } from '../../services/slices/order-feed-slice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const { orderFeed, total, totalToday } = useSelector(orderFeedSelector);
  const feed = { total, totalToday };

  const readyOrders = getOrders(orderFeed, 'done');

  const pendingOrders = getOrders(orderFeed, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
