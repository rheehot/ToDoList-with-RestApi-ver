import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdIndeterminateCheckBox,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';


const TodoListItem = ({ todo , onRemove , onToggle, style }) => {
  const { uuid, content, completed } = todo;

  return (
    <div className="TodoListItem-virtualized" style={style}>
    <div className="TodoListItem">
      <div className={cn('checkbox', { completed })}
       onClick={() => onToggle(uuid, completed)}
       >
        {completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{content}</div>
      </div>
      <div className="remove" onClick={() => onRemove(uuid)}>
        <MdIndeterminateCheckBox />
      </div>
    </div>
    </div>
  );
};

export default React.memo(
  TodoListItem,
  (prevProps, nextProps) => prevProps.todo === nextProps.todo,
);