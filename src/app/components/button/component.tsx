import classNames from 'classnames';

interface ButtonProps {
  className?: string;
  title: string;
  onClick: () => void;
}

export const Button = ({ className, title, onClick }: ButtonProps) => (
  <button
    className={classNames('uppercase p-2 h-10 text-black hover:bg-gray-500 rounded hover:text-white', className)}
    onClick={onClick}
  >
    {title}
  </button>
);
