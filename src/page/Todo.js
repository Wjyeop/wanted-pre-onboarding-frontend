import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

function Todo() {
    const navigate = useNavigate();
    const [todo, setTodo] = useState();
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/signin')
        }

        fetchTodoList();
        // eslint-disable-next-line
    }, [])

    function fetchTodoList() {
        axios({
            url: 'https://www.pre-onboarding-selection-task.shop/todos',
            method: 'get',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            setTodoList(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    function createTodo() {
        axios({
            url: 'https://www.pre-onboarding-selection-task.shop/todos',
            method: 'post',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": `application/json`,
            },
            data: {
                todo: todo,
                isCompleted: false
            }
        }).then(res => {
            console.log(res);
            fetchTodoList();
        }).catch(err => {
            console.log(err);
        })
    }

    function updateTodo(id, updatedTodo) {
        axios({
            url: `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
            method: 'put',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": `application/json`,
            },
            data: updatedTodo
        }).then(res => {
            // console.log(res);
            fetchTodoList();
        }).catch(err => {
            console.log(err);
        })
    }

    function deleteTodo(id) {
        axios({
            url: `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
            method: 'delete',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            // console.log(res);
            fetchTodoList();
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='todo'>
            <input 
                data-testid="new-todo-input" 
                onChange={(e) => setTodo(e.target.value)}/>
            <button 
                data-testid="new-todo-add-button"
                onClick={createTodo}>추가
            </button>
            <button
                onClick={()=>{
                    localStorage.removeItem('token');
                    navigate('/signin');
                }}>
                로그아웃
            </button>


            <div>
                {todoList.map((item) => {
                    return (
                        <li key={item.id} id={item.id}>
                            <label>
                                <input 
                                    type="checkbox" 
                                    defaultChecked={item.isCompleted}
                                    onChange={() => {
                                        const updatedTodo = { ...item, isCompleted: !item.isCompleted }; // Toggle the isCompleted value
                                        updateTodo(item.id, updatedTodo);
                                    }}/>
                                {item.editing ? (
                                    <input 
                                        type="text" 
                                        value={item.todo} 
                                        onChange={(e) => {
                                            const updatedTodoList = todoList.map(todoItem => {
                                                if (todoItem.id === item.id) {
                                                    return { ...todoItem, todo: e.target.value };
                                                }
                                                return todoItem;
                                            });
                                            setTodoList(updatedTodoList);
                                        }} 
                                    />
                                ) : (
                                    <span>{item.todo}</span>
                                )}
                            </label>
                            {item.editing ? (
                                <>
                                    <button 
                                        data-testid="submit-button"
                                        onClick={() => {
                                            updateTodo(item.id, { todo: item.todo, isCompleted: item.isCompleted });
                                            const updatedTodoList = todoList.map(todoItem => {
                                                if (todoItem.id === item.id) {
                                                    return { ...todoItem, editing: false };
                                                }
                                                return todoItem;
                                            });
                                            setTodoList(updatedTodoList);
                                        }}
                                    >
                                        제출
                                    </button>
                                    <button 
                                        data-testid="cancel-button"
                                        onClick={fetchTodoList}>
                                        취소
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button 
                                        data-testid="modify-button"
                                        onClick={() => {
                                            const updatedTodoList = todoList.map(todoItem => {
                                                if (todoItem.id === item.id) {
                                                    return { ...todoItem, editing: true };
                                                }
                                                return todoItem;
                                            });
                                            setTodoList(updatedTodoList);
                                        }}
                                    >
                                        수정
                                    </button>
                                    <button 
                                        data-testid="delete-button"
                                        onClick={() => deleteTodo(item.id)}
                                    >
                                        삭제
                                    </button>
                                </>
                            )}
                        </li>
                    )
                })}
            </div>
        </div>
    )
}

export default Todo
