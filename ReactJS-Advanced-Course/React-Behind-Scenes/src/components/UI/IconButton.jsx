import { log } from '../../log.js';

export default function IconButton({ children, icon, ...props }) {
  // Gets render like this:  -- <IconButton /> rendered
  log('<IconButton /> rendered', 2);

  const Icon = icon;
  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text"> {children} </span>
    </button>
  );
}
