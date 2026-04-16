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
  // 데이터 추가하는 것 중에 하나라도 파일 객체가 있다면 FormData 방식으로 넘겨야함
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  formData.append("description", description);

  await instance.post("/recipes", formData);
};
