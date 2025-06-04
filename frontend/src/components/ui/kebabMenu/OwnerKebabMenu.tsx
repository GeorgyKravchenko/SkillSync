'use client';
import { useState } from 'react';
import ConfirmDeleteModal from '../Modal/ComfirmDeleteModal';
import BaseKebabMenu from './BaseKebabMenu';
import useDeleteComment from '@/hooks/comment/useDeleteComment';

type Props = {
  commentId: number;
  postId: number;
  setIsEditing?: (isEditing: boolean) => void;
};
const OwnerKebabMenu = ({ commentId, postId, setIsEditing }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { mutate: deleteComment } = useDeleteComment(postId);

  return (
    <>
      <ConfirmDeleteModal
        onConfirm={() => deleteComment(commentId)}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
      <BaseKebabMenu
        buttons={[
          {
            label: 'Редагувати',
            onClick: () => setIsEditing?.(true),
            className: 'text-gray-700 dark:text-gray-300',
          },
          {
            label: 'Видалити',
            onClick: () => setIsOpenModal(true),
            className: 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30',
          },
        ]}
        ariaLabel="Меню дій з коментарем"
      />
    </>
  );
};

export default OwnerKebabMenu;
