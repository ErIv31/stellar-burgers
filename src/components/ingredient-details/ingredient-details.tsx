import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'src/services/store';
import { useParams } from 'react-router-dom';
import { ingredientsSelector } from 'src/services/slices/ingredients-slice';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const { ingredients } = useSelector(ingredientsSelector);
  const ingredientData = ingredients.find((value) => value._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
