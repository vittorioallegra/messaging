import classNames from 'classnames';
import { PropsWithChildren, RefObject, useCallback, useEffect } from 'react';

type ContextMenuProps = PropsWithChildren<{
  className?: string;
  isOpen: boolean;
  triggerRef: RefObject<HTMLDivElement>;
  onClose: () => void;
}>;

export const ContextMenu = ({ className, isOpen, triggerRef, children, onClose }: ContextMenuProps) => {
  const hideContextMenu = useCallback(
    (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as HTMLElement)) {
        onClose();
      }
    },
    [triggerRef, onClose],
  );

  useEffect(() => {
    document.addEventListener('click', hideContextMenu, true);
    document.addEventListener('contextmenu', hideContextMenu, true);
    return () => {
      document.removeEventListener('click', hideContextMenu, true);
      document.removeEventListener('contextmenu', hideContextMenu, true);
    };
    // eslint-disable-next-line
  }, []);

  if (!isOpen) {
    return <></>;
  }

  return (
    <div
      className={classNames(
        'absolute flex flex-col top-full border border-gray-300 rounded right-0 bg-white z-10',
        className,
      )}
    >
      {children}
    </div>
  );
};
