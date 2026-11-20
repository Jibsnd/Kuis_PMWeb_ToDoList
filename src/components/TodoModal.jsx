import { useState, useEffect } from 'react';

function TodoModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('to-do');
  const [priority, setPriority] = useState('low');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setStatus(initialData.status || 'to-do');
      setPriority(initialData.priority || 'low');
      setDeadline(initialData.deadline || '');
    } else {
      setTitle('');
      setDescription('');
      setStatus('to-do');
      setPriority('low');
      setDeadline('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Judul wajib diisi!');
      return;
    }

    if (!deadline) {
      alert('Deadline wajib diisi!');
      return;
    }

    const payload = {
      ...(initialData ? { id: initialData.id } : {}),
      title: title.trim(),
      description,
      status,
      priority,
      deadline,
    };

    if (typeof onSubmit === 'function') {
      onSubmit(payload);
    } else {
      console.error('Prop onSubmit belum dikirim ke TodoModal!');
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">
          {initialData ? 'Update Task' : 'Tambah Task'}
        </h2>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Judul</label>
            <input
              type="text"
              placeholder="Masukkan judul task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Deskripsi</label>
            <textarea
              rows="3"
              placeholder="Masukkan deskripsi task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="to-do">to-do</option>
                <option value="in progress">in progress</option>
                <option value="done">done</option>
              </select>
            </div>

            <div className="form-group">
              <label>Prioritas</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-danger" onClick={onClose}>
              Batal
            </button>
            <button type="button" className="btn-primary" onClick={handleSave}>
              {initialData ? 'Update' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoModal;