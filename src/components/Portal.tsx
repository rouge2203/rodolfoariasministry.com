import { createPortal } from "react-dom";
import { type ReactNode } from "react";

interface PortalProps {
  children: ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  return createPortal(children, document.body);
};

export default Portal;
