import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRecipe } from "../api/recipes.js";
import "./RecipeAddModal.css";

const RecipeAddModal = ({onClose}) => {
    // 입력창에 들어가는 값들은 state로 관리
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addRecipe(name, image, description);
        navigate("/");
    };
    return (
    <div className="madal-backgrond" onClick={onClose}>
        <div className="madal-content" onClick={(e) => e.stopPropagation()}>
    <h2>레시피 추가</h2>
    <button onClick={onClose}>X</button>
    <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="레시피 이름 입력"/>
        <input type="text" value={image} onChange={(event) => setImage(event.target.value)} placeholder="레시피 이미지 URL 입력"/>
        <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="레시피 설명 입력"/>
        <button>추가하기</button>
    </form>
    </div>
    </div>
    );
};
export default RecipeAddModal;