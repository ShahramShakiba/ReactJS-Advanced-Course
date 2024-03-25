import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch mealsData when this Component is loaded
  useEffect(() => {
    setIsLoading(true);

    const fetchMeals = async () => {
      const response = await fetch(
        'https://ordering-food-http-request-default-rtdb.firebaseio.com/meals.json'
      );

      const mealsData = await response.json();

      // mealsData in "firebase" is an object with [keys as ids] and [values as objects] with properties like title, description, price; but we need an array
      const loadedMeals = [];

      for (const key in mealsData) {
        loadedMeals.push({
          id: key,
          // mealsData for the given key
          name: mealsData[key].name,
          description: mealsData[key].description,
          price: mealsData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p> Loading Meals ... 🍴 </p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      id={meal.id}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul> {mealsList} </ul>
      </Card>
    </section>
  );
}
