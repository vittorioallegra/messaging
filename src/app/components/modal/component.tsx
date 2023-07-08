import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '../button';

type ModalProps = PropsWithChildren<{
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  action: {
    title: string;
    onClick: () => void;
  };
}>;

export const Modal = ({ title, isOpen, children, onClose, action }: ModalProps) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return <></>;
  }

  return createPortal(
    <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-75">
      <div className="flex flex-col w-1/2 h-1/2 p-4 bg-white rounded">
        <div className="flex justify-between items-center mb-4">
          <span>{title}</span>
          <Button className="w-10" onClick={onClose} title="X" />
        </div>
        <div className="flex flex-1 w-full items-start">{children}</div>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} title={t('common.button.cancel')} />
          <Button {...action} />
        </div>
      </div>
    </div>,
    document.body,
  );
};
