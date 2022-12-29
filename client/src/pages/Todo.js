import React, { useState } from "react";
import Form from "../components/Form";
import List from "../components/List";
// 클래스 / 함수 컴포넌트 (용도별로 2가지 케이스)
// 내용 출력 전용, 데이터관리 용도
/* -클래스 형식으로 제작되는 것 class : TypeScript
  state 를 리렌더링(Re-rendering)
  Life-cycle : mount, update, unMount
  
  -함수 형식으로 제작되는 것 function
  state 를 못 쓰므로 화면 갱신 어렵다.
  useState() state 변경가능
  -------------------------- 
  Life-cycle 을 지원 안한다.
  useEffect() Life-cycle 체크가능
  */

/* 
  최초에 로컬에서 todoData를 읽어와서 
  todoData 라는 useState를 초기화 해주어야 한다.
  useState(초기값)
  */

let initTodo = localStorage.getItem("todoData");
// 삼항 연산자를 이용해서 초기값이 없으면 빈배열 [] 로 초기화 한다.
//읽어온 데이터가 있으면 JSON.stringify() 저장한 파일을
//JSON.parse() 로 다시 객체화 하여 사용한다.
initTodo = initTodo ? JSON.parse(initTodo) : [];

const Todo = () => {
  // console.log("Todo Rendering...");
  const [todoData, setTodoData] = useState(initTodo);
  const [todoValue, setTodoValue] = useState("");

  const addTodoSubmit = (event) => {
    // 웹브라우저 새로 고침 방지.
    event.preventDefault();
    // { id: 4, title: "할일 4", completed: false },

    // 공백 문자열 제거 추가
    let str = todoValue;
    str = str.replace(/^\s+|\s+$/gm, "");
    if (str.length === 0) {
      alert("내용을 입력하세용.");
      setTodoValue("");
      return;
    }
    //todoData 는 배열이고, 배열의 요소들은 위처럼 구성해야 하니까
    //{} 로 만들어줌. 그래야 .map 을 통해서 규칙적인 jsx 를 리턴할 수 있으니까.
    const addTodo = {
      id: Date.now(), // id 값은 배열.map 의 key로 활용예정, unique 값 만드려고
      title: todoValue, // 할일 입력창의 내용을 추가
      completed: false, // 할일이 추가 될 때 아직 완료한 것은 아니므로 false 로 초기화.
    };

    // 새로운 할일을 일단 복사하고, 복사된 배열에 추가해 업데이트
    // 기존 할일을 Dstructuring 하여서 복사본 만듦
    // todoData: [{}, {}, {},....] <-  {}
    setTodoData([...todoData, addTodo]);
    // 로컬에 저장한다.(DB 예정)
    localStorage.setItem("todoData", JSON.stringify([...todoData, addTodo]));
    // 새로운 할일을 추가했으므로 내용입력창의 글자를 초기화
    setTodoValue("");
  };

  const deleteAllClick = () => {
    setTodoData([]);
    localStorage.clear();
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full p-6 m-4 bg-white shadow">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={deleteAllClick} className="">
            Delete All
          </button>
        </div>

        <List todoData={todoData} setTodoData={setTodoData} />
        {/* ^ props */}
        <Form
          todoValue={todoValue}
          setTodoValue={setTodoValue}
          addTodoSubmit={addTodoSubmit}
        />

        {/* <div style={this.getStyle()}>
            <input type="checkbox" defaultChecked={false} />
            집에 가기<button style={this.btnStyle}>X</button>
          // </div> (class 컴포넌트 방식)*/}
      </div>
    </div>
  );
};

export default Todo;
