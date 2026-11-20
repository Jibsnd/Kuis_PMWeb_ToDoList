import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TodoModal from '../components/TodoModal';

function TodoDetail({ todos, onUpdateTodo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todo = todos.find((item) => item.id === Number(id));

  if (!todo) {
    return (
      <div className="detail-wrapper">
        <div className="detail-card">
          <p>Tugas tidak ditemukan.</p>
          <button className="btn-danger" onClick={() => navigate('/')}>
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-wrapper">
      <div className="detail-card">
        <div className="detail-left">
          <div className="detail-item">
            <h3>Judul</h3>
            <p>{todo.title}</p>
          </div>
          <div className="detail-item">
            <h3>Deskripsi</h3>
            <div className="description-box">{todo.description || '-'}</div>
          </div>
        </div>

        <div className="detail-right">
          <div className="detail-item">
            <h3>Status</h3>
            <p>{todo.status}</p>
          </div>
          <div className="detail-item">
            <h3>Prioritas</h3>
            <p>{todo.priority}</p>
          </div>
          <div className="detail-item">
            <h3>Deadline</h3>
            <p>{todo.deadline}</p>
          </div>

          <div className="detail-actions">
            <button className="btn-danger" onClick={() => navigate('/')}>
              Kembali
            </button>
            <button
              className="btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onUpdateTodo}
        initialData={todo}
      />
    </div>
  );
}

export default TodoDetail;