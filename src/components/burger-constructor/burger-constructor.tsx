import { FC, useCallback, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  burgerConstructorSelector,
  clearIngredients
} from '../../services/slices/burger-constructor-slice';
import {
  clearOrder,
  orderSelector,
  postOrder
} from '../../services/slices/order-slice';
import { userSelector } from '../../services/slices/user-slice';

export const BurgerConstructor: FC = () => {
  const { bun, ingredients } = useSelector(burgerConstructorSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(userSelector);
  const {
    order: orderModalData,
    request: orderRequest,
    error: orderError
  } = useSelector(orderSelector);

  const onOrderClick = useCallback(async () => {
    try {
      if (!user) {
        navigate('/login');
        return;
      }

      if (!bun || orderRequest) return;

      const orderIngredients = [
        bun._id,
        ...ingredients.map((item) => item._id),
        bun._id
      ];

      await dispatch(postOrder(orderIngredients)).unwrap();
      dispatch(clearIngredients());
    } catch (error) {
      console.error(
        'Order creation failed:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }, [user, bun, ingredients, orderRequest, dispatch, navigate]);

  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/', { replace: true });
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (sum: number, item: TConstructorIngredient) => sum + item.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
