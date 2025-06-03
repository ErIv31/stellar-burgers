import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'src/services/store';
import {
  burgerConstructorSelector,
  clearIngredients
} from 'src/services/slices/burger-constructor-slice';
import {
  clearOrder,
  orderSelector,
  postOrder
} from 'src/services/slices/order-slice';
import { userSelector } from 'src/services/slices/user-slice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(burgerConstructorSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(userSelector);
  const { order: orderModalData, request: orderRequest } =
    useSelector(orderSelector);

  const onOrderClick = () => {
    if (!user) return navigate('/login');
    if (!constructorItems.bun || orderRequest) return;

    const orderIngredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(postOrder(orderIngredients))
      .unwrap()
      .then(() => dispatch(clearIngredients()))
      .catch((err) =>
        console.error(`Failed to complete the request: ${err.message}`)
      );
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/', { replace: true });
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
