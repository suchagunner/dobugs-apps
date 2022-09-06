import React, {PropsWithChildren, ReactElement, ReactNode} from "react";

export function getSuspendRouteMaker(fallback: ReactNode): (props: PropsWithChildren) => ReactElement {
  return ({ children }: PropsWithChildren) => {
    return (
      <>
        <React.Suspense fallback={fallback}>
          { children }
        </React.Suspense>
      </>
    )
  }
}
