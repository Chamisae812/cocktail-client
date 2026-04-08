import axios from "axios";

//레시피 조회
export const getRecipes = async (keyword) => {
      const response = await axios.get(
        `http://localhost:4000/recipes${keyword === null ? "" : "?keyword=" + keyword}`);
      return response.data; // 바로 접근 가능
    };
//레시피 추가
export const addRecipe = async (name, image, description) => {
    await axios.post("http://localhost:4000/recipes", {
        name,
        image,
        description,
        });
    };

