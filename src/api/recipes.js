import instance from "./instance";

// 레시피 조회
export const getRecipes = async (keyword) => {
  const response = await instance.get(
    `/recipes${keyword === null ? "" : "?keyword=" + keyword}`,
  );
  return response.data; // 바로 접근 가능
};

// 레시피 추가
export const addRecipe = async (name, image, description) => {
  await instance.post("/recipes", {
    name,
    image,
    description,
  });
};
