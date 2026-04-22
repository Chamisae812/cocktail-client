import { useState } from "react";
import { addRecipe } from "../api/recipes.js";
import "./RecipeAddModal.css";

const RecipeAddModal = ({ onClose, onRecipeAdd }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  // 재료 목록
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);

  // 만드는 방법 목록
  const [directions, setDirections] = useState([{ content: "" }]);

  // 재료 값 변경
  // index : 몇 번째 재료인지, field : name 또는 amount, value : 입력값
  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  // 재료 항목 추가
  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  // 재료 항목 삭제
  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // 만드는 방법 값 변경
  const handleDirectionChange = (index, value) => {
    const updated = [...directions];
    updated[index].content = value;
    setDirections(updated);
  };

  // 만드는 방법 항목 추가
  const addDirection = () => {
    setDirections([...directions, { content: "" }]);
  };

  // 만드는 방법 항목 삭제
  const removeDirection = (index) => {
    setDirections(directions.filter((_, i) => i !== index));
  };

  // 추가하기 버튼을 누를시 실행
  const handleSubmit = async (event) => {
    event.preventDefault();
    await addRecipe(name, image, description, ingredients, directions);
    onClose();
    onRecipeAdd();
  };

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>레시피 추가</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="레시피 이름 입력"
          />
          <input
            className="input"
            type="file"
            onChange={(event) => setImage(event.target.files[0])}
          />
          <input
            className="input"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="레시피 설명 입력"
          />

          {/* 재료 입력 */}
          <div className="section-label">재료</div>
          {ingredients.map((ingredient, index) => (
            <div className="row" key={index}>
              <input
                className="input"
                type="text"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                placeholder="재료명 (예: 화이트럼)"
              />
              <input
                className="input amount"
                type="text"
                value={ingredient.amount}
                onChange={(e) =>
                  handleIngredientChange(index, "amount", e.target.value)
                }
                placeholder="양 (예: 40ml)"
              />
              {/* 항목이 1개일 때는 삭제 버튼 숨김 */}
              {ingredients.length > 1 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeIngredient(index)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addIngredient}>
            + 재료 추가
          </button>

          {/* 만드는 방법 입력 */}
          <div className="section-label">만드는 방법</div>
          {directions.map((direction, index) => (
            <div className="row" key={index}>
              <span className="step-num">{index + 1}</span>
              <input
                className="input"
                type="text"
                value={direction.content}
                onChange={(e) => handleDirectionChange(index, e.target.value)}
                placeholder={`${index + 1}단계 입력`}
              />
              {directions.length > 1 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeDirection(index)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addDirection}>
            + 단계 추가
          </button>

          <button className="btn">추가하기</button>
        </form>
      </div>
    </div>
  );
};
export default RecipeAddModal;
