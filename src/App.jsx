import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TodoDetail from './pages/TodoDetail';
import './App.css';

const initialTodos = [
  {
    id: 1,
    title: 'Mengerjakan Proyek Computer Vision',
    description: 'Menyelesaikan proyek akhir computer vision tentang deteksi penggunaan helm',
    status: 'in progress',
    priority: 'high',
    deadline: '2026-10-11',
  },
  {
    id: 2,
    title: 'Mempelajari Dasar Zustand',
    description: 'Memahami state management global pada React menggunakan Zustand',
    status: 'to-do',
    priority: 'low',
    deadline: '2026-11-25',
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (newTodo) => {
    const todoWithId = {
      ...newTodo,
      id: Date.now(),
    };
    setTodos([...todos, todoWithId]);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    alert('Tugas berhasil diperbarui!');
  };

  const deleteTodo = (id) => {
    if (window.confirm('Apakah kamu yakin ingin menghapus tugas ini?')) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, status: todo.status === 'done' ? 'to-do' : 'done' }
          : todo
      )
    );
  };

  const clearCompleted = () => {
    const completedCount = todos.filter((t) => t.status === 'done').length;
    if (completedCount === 0) return;
    if (window.confirm(`Hapus ${completedCount} tugas yang sudah selesai?`)) {
      setTodos(todos.filter((todo) => todo.status !== 'done'));
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              todos={todos}
              onAddTodo={addTodo}
              onUpdateTodo={updateTodo}
              onDeleteTodo={deleteTodo}
              onToggleStatus={toggleStatus}
              onClearCompleted={clearCompleted}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={<TodoDetail todos={todos} onUpdateTodo={updateTodo} />}
        />
      </Routes>
    </Router>
  );
}

export default App;