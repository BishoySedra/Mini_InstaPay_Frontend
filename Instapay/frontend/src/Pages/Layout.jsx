import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
export default function Layout() {
    return (
      <>
        <Header />
        <div className="pt-16">
          <Outlet />
        </div>
      </>
    );
  }