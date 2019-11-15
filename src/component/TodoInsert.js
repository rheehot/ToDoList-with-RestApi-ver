import React, { useState , useCallback } from 'react';
import { MdAddBox } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(
        e => {
            onInsert(value);
            setValue('');
            e.preventDefault();
        },
        [onInsert, value],
    );

    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input placeholder = "Write down ToDo"
            value = {value}
            onChange = {onChange}
            />
            <button type = "submit">
            < MdAddBox />
            </button>
        </form>
    );
};

export default TodoInsert;