import { useState } from 'react';

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return { onShowModal, onCloseModal, showModal };
};
