import React from 'react';
import './DeletePostModal.css';
import { IoClose } from 'react-icons/io5';

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay" onClick={onClose}>
      <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
        <button className="delete-modal-close" onClick={onClose}>
          <IoClose size={24} />
        </button>
        
        <h2 className="delete-modal-title">Delete post?</h2>
        <p className="delete-modal-message">
          Once you delete this post, it can't be restored.
        </p>
        
        <div className="delete-modal-buttons">
          <button className="delete-modal-cancel" onClick={onClose}>
            Go Back
          </button>
          <button className="delete-modal-confirm" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal; 