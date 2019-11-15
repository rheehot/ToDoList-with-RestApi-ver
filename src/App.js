import React, { useState , useRef , useCallback } from 'react';
import TodoTemplate from './component/TodoTemplate';
import TodoInsert from './component/TodoInsert';
import TodoList from './component/TodoList'

const App = () => {
  const [todos , setTodos] = useState([
    {
      id: 1,
      text: 'REACT',
      checked: true,
    },
    {
      id: 2,
      text: 'JavaScript',
      checked: true,
    },
    {
      id: 3,
      text: 'Back-end',
      checked: false,
    },
  ]);

  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
        setTodos(todos => todos.concat(todo));
        nextId.current += 1;
    }, []);

  const onRemove = useCallback(
    id => {
      setTodos(todos => todos.filter(todo => todo.id !== id));
    }, []);

  const onToggle = useCallback(
    id => {
      setTodos(todos =>
        todos.map(todo => 
          todo.id === id ? {...todo, checked: !todo.checked } : todo,
          ),
      );
    }, []);

  return (
    <TodoTemplate>
    <TodoInsert onInsert = {onInsert}/>
    <TodoList todos = {todos} onRemove = {onRemove} onToggle = {onToggle} />
    </TodoTemplate>
    ); 
};

export default App;
