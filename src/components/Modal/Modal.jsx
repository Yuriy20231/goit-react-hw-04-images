import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === `Escape`) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);
  const handleClose = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return (
    <div onClick={handleClose} className={css.Overlay}>
      <div className={css.Modal}>{children}</div>
    </div>
  );
};