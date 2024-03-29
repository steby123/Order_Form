import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true)
      const response = await fetch('https://order-food-97b8e-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok){
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadMeals = [];

      for(const key in data){
        if(data[key].price !== undefined){
          loadMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          })
        }
      }

      setMeals(loadMeals);
      setIsLoading(false)
    }

    fetchMeals().catch((error) => {
      setIsLoading(false)
      setError(error.message)
    })
  },[])

  if(isLoading){
    return(
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if(error){
    return(
      <section className={classes.MealsError}>
        <p>Failed to fetch</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
