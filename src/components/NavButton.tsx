import { NavLink, NavLinkRenderProps } from "react-router-dom";
import { ReactNode } from "react";
import SpinnerLight from "./Spinner/SpinnerLight";

type NavButtonProps = {
  children: ReactNode;
  route: string;
};

export default function NavButton({ children, route }: NavButtonProps) {
  return (
    <NavLink
      to={route}
      className="flex items-center justify-center relative rounded-md bg-indigo-600 p-3 text-sm font-bold text-center text-white shadow-sm hover:bg-indigo-500"
    >
      {({ isPending }: NavLinkRenderProps) => (
        <>
          {isPending && (
            <span className="absolute">
              <SpinnerLight />
            </span>
          )}
          <span className={`${isPending && "opacity-0"}`}>{children}</span>
        </>
      )}
    </NavLink>
  );
}
