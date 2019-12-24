import React, { useState, useCallback, useEffect } from 'react';
import TodoTemplate from './component/TodoTemplate';
import TodoInsert from './component/TodoInsert';
import TodoList from './component/TodoList'


const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('https://hwitodo.herokuapp.com/api/v1/todos/');
      const json = await response.json();
      setTodos(json);
    }
    fetchTodos();
  }, [])

  const onInsert = useCallback(
    text => {
      const create = async() => {
        const rawResponse = await fetch('https://hwitodo.herokuapp.com/api/v1/todos/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({content: text, completed: false})
        });
        const newTodo = await rawResponse.json();
        setTodos(todos => [...todos, newTodo]);
      };
      create()
    }, []);

  const onRemove = useCallback(
    uuid => {
      const remove = async() => {
            await fetch(`https://hwitodo.herokuapp.com/api/v1/todos/${uuid}/`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
            });

            setTodos(todos => todos.filter(todo => todo.uuid !== uuid));
          };
          remove()
        }, []);

  const onToggle = useCallback(
    (uuid, completed) =>  {
    const modify = async () => {
        await fetch(`https://hwitodo.herokuapp.com/api/v1/todos/${uuid}/`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ completed: !completed })
        });

        setTodos(todos => 
          todos.map(todo => 
            todo.uuid === uuid ? {...todo, completed: !todo.completed } : todo,
          ));
      };
      modify()
    }, []);


  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
