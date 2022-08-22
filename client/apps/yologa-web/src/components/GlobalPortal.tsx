import {createContext, PropsWithChildren, useState} from "react";
import {createPortal} from "react-dom";

type PortalContainer = Nullable<HTMLDivElement>

const PortalContext = createContext<PortalContainer>(null);

function PortalProvider({children}: PropsWithChildren) {
  const [portalContainer, setPortalContainer] = useState<PortalContainer>(null);
  
  return <PortalContext.Provider value={portalContainer}>
    {children}
    <div id="global-portal-container" ref={el => {
      if (el && el instanceof HTMLDivElement) {
        setPortalContainer(el);
      }
    }
    }/>
  </PortalContext.Provider>
}

function PortalConsumer({children}: PropsWithChildren) {
  return <PortalContext.Consumer>
    {value => value && createPortal(children, value)}
  </PortalContext.Consumer>
}

export default {
  PortalProvider,
  PortalConsumer
}