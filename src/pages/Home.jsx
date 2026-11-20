import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Pencil, Trash2, CheckSquare, Square } from 'lucide-react';
import TodoModal from '../components/TodoModal';

function Home({
  todos,
  onAddTodo,
  onUpdateTodo,
  onDeleteTodo,
  onToggleStatus,
  onClearCompleted,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [quickTitle, setQuickTitle] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('low');
  const navigate = useNavigate();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!quickTitle.trim()) {
      openAddModal();
      return;
    }
    onAddTodo({
      title: quickTitle,
      description: 'Ditambahkan melalui quick input',
      status: 'to-do',
      priority: selectedPriority,
      deadline: new Date().toISOString().split('T')[0],
    });
    setQuickTitle('');
  };

  // Buka modal mode Tambah
  const openAddModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  // Buka modal mode Edit
  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const handleFormSubmit = (taskData) => {
    if (editingTodo) {
      onUpdateTodo(taskData);
    } else {
      onAddTodo(taskData);
    }
  };

  const getPriorityClass = (priority) => {
    if (priority === 'low') return 'badge-yellow';
    if (priority === 'medium') return 'badge-orange';
    if (priority === 'high') return 'badge-red';
    return '';
  };

  const getStatusClass = (status) => {
    if (status === 'to-do') return 'badge-red';
    if (status === 'in progress') return 'badge-yellow';
    if (status === 'done') return 'badge-green';
    return '';
  };

  const completedCount = todos.filter((t) => t.status === 'done').length;

  return (
    <div className="sketch-wrapper">
      <div className="sketch-card">
        <header className="sketch-header">
          <h1 className="sketch-title">To Do list</h1>
          <p className="sketch-subtitle">
            one task at a time! you can do it! ♡
          </p>
        </header>

        <div className="sketch-body">
          <form onSubmit={handleQuickAdd} className="sketch-input-row">
            <input
              type="text"
              className="sketch-line-input"
              placeholder="enter a new task"
              value={quickTitle}
              onChange={(e) => setQuickTitle(e.target.value)}
            />
            <button
              type="submit"
              className="sketch-plus-btn"
              title="Tambah Task"
            >
              <Plus size={26} strokeWidth={2.2} />
            </button>
          </form>

          <div className="sketch-dual-boxes">
            <select
              className="sketch-box-select"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="low">priority: low</option>
              <option value="medium">priority: medium</option>
              <option value="high">priority: high</option>
            </select>

            <button
              type="button"
              className="sketch-box-btn"
              onClick={openAddModal}
            >
              + open detailed form
            </button>
          </div>

          <div className="sketch-task-area">
            {todos.length === 0 ? (
              <div className="sketch-empty">
                <p className="empty-main">no tasks yet</p>
                <p className="empty-sub">add a task to get started!</p>
              </div>
            ) : (
              <ul className="sketch-list">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className={`sketch-item ${
                      todo.status === 'done' ? 'is-done' : ''
                    }`}
                  >
                    <div
                      className="sketch-item-left"
                      onClick={() => onToggleStatus(todo.id)}
                    >
                      {todo.status === 'done' ? (
                        <CheckSquare size={20} strokeWidth={1.7} />
                      ) : (
                        <Square size={20} strokeWidth={1.7} />
                      )}
                      <div className="sketch-item-text">
                        <span className="item-title">{todo.title}</span>
                        {todo.description && (
                          <p className="item-desc">{todo.description}</p>
                        )}
                        <div className="item-badges">
                          <span
                            className={`badge ${getPriorityClass(
                              todo.priority
                            )}`}
                          >
                            {todo.priority}
                          </span>
                          <span
                            className={`badge ${getStatusClass(todo.status)}`}
                          >
                            {todo.status}
                          </span>
                          <span className="item-date">{todo.deadline}</span>
                        </div>
                      </div>
                    </div>

                    <div className="sketch-item-actions">
                      <button
                        type="button"
                        className="icon-btn"
                        onClick={() => navigate(`/todo/${todo.id}`)}
                        title="Lihat Detail"
                      >
                        <Eye size={18} strokeWidth={1.7} />
                      </button>
                      <button
                        type="button"
                        className="icon-btn"
                        onClick={() => openEditModal(todo)}
                        title="Edit Task"
                      >
                        <Pencil size={18} strokeWidth={1.7} />
                      </button>
                      <button
                        type="button"
                        className="icon-btn"
                        onClick={() => onDeleteTodo(todo.id)}
                        title="Hapus"
                      >
                        <Trash2 size={18} strokeWidth={1.7} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="sketch-footer">
            <div className="sketch-stats">
              <span>Total: {todos.length} tasks</span>
              <span>Completed: {completedCount}</span>
            </div>
            <button
              type="button"
              className="sketch-clear-btn"
              onClick={onClearCompleted}
            >
              Clear all completed tasks
            </button>
          </div>
        </div>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={editingTodo}
      />
    </div>
  );
}

export default Home;