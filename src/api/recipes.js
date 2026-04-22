import instance from "./instance";


// 레시피 조회
export const getRecipes = async (keyword) => {
  const response = await instance.get(
    `/recipes${keyword === null ? "" : "?keyword=" + keyword}`,
  );
  return response.data; // 바로 접근 가능
};

// 레시피 추가
export const addRecipe = async (
  name, // 텍스트
  image, // 파일
  description, //텍스트
  ingredients, // 배열
  directions, // 배열
  ) => {
  // 데이터 추가하는 것 중에 하나라도 파일 객체가 있다면 FormData 방식으로 넘겨야함
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  formData.append("description", description);
  // 배열은 FormData에 바로 담을 수 없어서 JSON문자열로 변환해서 전송
  formData.append("ingredients", JSON.stringify(ingredients));
  formData.append("directions", JSON.stringify(directions));

  await instance.post("/recipes", formData);
};
