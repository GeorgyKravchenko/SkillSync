import BaseModal from './BaseModal';

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Підтвердження видалення"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 pb-2 flex items-center justify-center  bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Скасувати
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 flex items-center justify-center  bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
          >
            Видалити
          </button>
        </>
      }
    >
      Ви впевнені, що хочете видалити цей коментар?
    </BaseModal>
  );
};
export default ConfirmDeleteModal;
