import { memo } from 'react';
import { log } from '../../log.js';

const IconButton = memo(function IconButton({ children, icon, ...props }) {
  // Gets render like this:  -- <IconButton /> rendered
  log('<IconButton /> rendered', 2);

  // translate icon-prop which has a component as a prop to component again
  const Icon = icon;
  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text"> {children} </span>
    </button>
  );
});

export default IconButton;
