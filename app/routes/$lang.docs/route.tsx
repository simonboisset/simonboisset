import { Outlet } from "@remix-run/react";
import { Footer } from "../$lang/footer";

export default function Docs() {
  return (
    <>
      <div className="py-44 px-8 sm:px-0">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
