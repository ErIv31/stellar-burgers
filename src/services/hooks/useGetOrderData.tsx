import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';
import { useEffect, useState } from 'react';

export const useGetOrderData = (orderId: number) => {
  const [orderData, setOrderData] = useState<TOrder | null>(null);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const res = await getOrderByNumberApi(orderId);
        setOrderData(res.orders[0] || null);
      } catch (error) {
        console.error('Не удалось загрузить данные:', error);
      }
    };

    if (orderId) getOrderData();
  }, [orderId]);

  return orderData;
};
