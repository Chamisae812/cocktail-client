import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetailPage.css";
import { getRecipe } from "../api/recipes";

const RecipeDetailPage = () => {
  // useParams : URL에 있는 동적값을 꺼내는 훅
  // router.jsx에서 path를 /recipe/:id로 설정했기 때문에
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const result = await getRecipe(id);
    setRecipe(result);
  }, []);

  return (
    <div className="detail-page">
      <img src=`http://localhost:4000/uploads/&{recipe.image}` alt="" />
      <h3>재료</h3>
      <ul className="ingredient-list"></ul>

      <h3>만드는 방법</h3>
      <ol className="direction-list"></ol>
    </div>
  );
};

export default RecipeDetailPage;
