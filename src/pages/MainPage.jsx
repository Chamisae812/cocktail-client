import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getRecipes } from "../api/recipes.js";
import RecipeAddModal from "../components/RecipeAddModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const MainPage = () => {
  const { token } = useAuth();
  {
    /* 
      JSX : JavaScript 안에서 HTML 처럼 작성하는 문법
      useState : 화면에 보여줄 값을 저장하는 공간
      => const [현재 상태의 변수, 변수값 상태를 바꾸는 함수] = useState(초기값)
      useEffect : 바뀌는 시점을 찾을 때 사용
      => []이 비어있는 경우 처음에만 실행
    */
  }
  const [recipes, setRecipes] = useState([]);
  const [keyword, setKeyword] = useState("");

  // 모달 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    fetchRecipes();
  }, [search]);

  const fetchRecipes = async () => {
    const keyword = search.get("keyword");
    const data = await getRecipes(keyword);
    setRecipes(data); // 받아온 데이터를 state에 저장

    if (keyword !== null) {
      setKeyword(keyword);
    } else {
      setKeyword("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // URL에 쿼리스트링으로 keyword를 저장
    // -> useEffect에서 search 값이 바뀔때마다 getRecipes 함수가 호출
    setSearch({ keyword });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="keyword"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <button>검색</button>
      </form>
      {/* 로그인 되었을 때만 버튼을 보이게 */}
      {token && <button onClick={() => setIsOpen(true)}>레시피 추가</button>}
      
      {recipes?.map((recipe) => (
        // key : 리액트가 각 항목을 구분할 때 사용하는 고유값 (목록 출력시)
        <div key={recipe.id}>
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
      {/* && (그리고) : 둘 다 true일 때만 true
          -> 앞에가 true면 뒤로 true인지 판단 
          -> 앞에가 false면 뒤에가 true인지 판단 X

          props : 상태나 함수 등을 자식 컴포넌트에 전달
          */}
      {isOpen && <RecipeAddModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default MainPage;
