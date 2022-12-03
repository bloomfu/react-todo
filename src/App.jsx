import './App.css';
import { useState } from 'react';

export const App = () => {
  // 状態を変化させる際useStateを使用
  const [todoList, setTodoList] = useState([]);
  const [todoText, setTodotext] = useState({ id: 0, body: "", isCompleted: false });
  const [editFlag, setEditFlag] = useState(true);
  const [editedTodo, setEditedTodo] = useState({ id: 0, body: "", isCompleted: false });

  const allTaskCount = () => todoList.length

  const inCompletedCount = () => todoList.filter(todoText => !(todoText.isCompleted)).length

  const completedCount = () => todoList.filter(todoText => todoText.isCompleted).length

  const handleNewTodo = (e) => setTodotext({ ...todoText, body: e.target.value });

  // const onChangeTodoEditText = (event, index) => {
  //   const todos = [...incompleteTodos];
  //   todos[index].data = event.target.value;
  //   setIncompleteTodos(todos);
  // };

  const onClickAdd = (e) => {
    e.preventDefault()
    if (todoText.body === "") return;
    setTodoList([...todoList, todoText]);
    setTodotext({id: todoText.id + 1, body: "", isCompleted: false});
  };

  const onClickComplete = (id) => {
    const completeList = todoList.map((todo) => {
      if(todo.id === id) todo.isCompleted = !todo.isCompleted
      return todo
    })
    setTodoList(completeList);
  };

  const onClickDelete = (id) => {
    const newTodos = [...todoList];
    newTodos.splice(id, 1);
    setTodoList(newTodos);
  };

  const onClickEdit = (id) => {
    const editList = {...editedTodo, id};
    setEditedTodo(editList);
    setEditFlag(false);
  };

  const handleEditTodo = (e) => {
    const handleEdit = {...editedTodo, body: e.target.value};
    setEditedTodo(handleEdit);
  };

  const saveTask = (id) => {
    if (editedTodo === "") return
    const newTodoList = todoList.map((todo) => {
      if(todo.id === editedTodo.id) todo.body = editedTodo.body
      return todo
    })
    setTodoList(newTodoList);
    setEditFlag(true);
  }
  return (
    <div className="wrapper">
      <div className="input-area">
        <input placeholder="TODOを入力" value={todoText.body} onChange={handleNewTodo} />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div>
        <ul>
          <li>全てのタスク: {allTaskCount()}</li>
          <li>完了済: {completedCount()}</li>
          <li>未完了: {inCompletedCount()}</li>
        </ul>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {todoList.map((todo) => {
            if (editFlag) {
              return (
                <div key={todo} className="list-row">
                  <input type="checkbox" onClick={() => {onClickComplete(todo.id)}} />
                  <li>{todo.body}</li>
                  <button onClick={() => {onClickEdit(todo.id)}}>編集</button>
                  {/* ループしないようにアロー関数で！ */}
                  <button onClick={() => onClickDelete(todo.id)}>削除</button>
                </div>
              )
            } else {
              return (
                // ループする際親要素にkeyを設定(差分をkeyを目印に抽出するため)
                <div key={todo}>
                  <input type="checkbox" onClick={() => {onClickComplete(todo.id)}} />
                  <input onChange={handleEditTodo} />
                  <button onClick={() => saveTask(todo.id)}>保存</button>
                </div>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};
