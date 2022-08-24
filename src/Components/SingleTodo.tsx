import { useState, useRef } from 'react';
import { Todo } from '../model';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
};

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [editTodo, setEditTodo] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  return (
    <form className='todo__single' onSubmit={e => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          value={editTodo}
          onChange={e => setEditTodo(e.target.value)}
          className='todos__single--text'
          ref={inputRef}
        />
      ) : todo.isDone ? (
        <s className='todos__single--text'>{todo.todo}</s>
      ) : (
        <span className='todos__single--text'>{todo.todo}</span>
      )}
      <span className='todos__single--text'>{todo.todo}</span>
      <div>
        <span>
          <AiFillEdit
            className='icon'
            onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit);
              }
            }}
          />
        </span>
        <span>
          <AiFillDelete
            className='icon'
            onClick={() => handleDelete(todo.id)}
          />
        </span>
        <span>
          <MdDone className='icon' onClick={() => handleDone(todo.id)} />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
