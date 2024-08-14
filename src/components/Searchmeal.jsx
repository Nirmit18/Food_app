
import { Link } from "react-router-dom";
const Searchmeal = ({ meal }) => {
    return (
        <>
      <div className="sm:flex flex-col items-center block mt-5">
        <img src={meal.strMealThumb} alt={meal.strMeal}  />
      <div className="font-semibold p-3">{meal.strMeal}</div>
      <div className="block md:flex justify-evenly lg:gap-28 w-full gap-1 ">
      <div className="star-rating flex pl-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="24px" height="24px">
          <path d="M12 2l2.92 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.08-1.01L12 2z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="24px" height="24px">
          <path d="M12 2l2.92 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.08-1.01L12 2z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="24px" height="24px">
          <path d="M12 2l2.92 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.08-1.01L12 2z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="24px"  height="24px">
          <path d="M12 2l2.92 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.08-1.01L12 2z" />
        </svg>
      </div>
      <div className="font-semibold text-md pl-2">{meal.strArea}</div>
      </div>
      <div className="pt-1">
      <Link to={`/food/${meal.idMeal}`} className="text-blue-500 p-2 ">View Details</Link>
      </div>

      </div>
      
    </>
    );
  };

export default Searchmeal;
