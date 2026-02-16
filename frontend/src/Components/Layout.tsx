import { Outlet } from "react-router-dom";
import { AuthService } from "../Services/AuthService.ts";
import Header from "./Header.tsx";
import Sidebar from "./Navbar/Sidebar.tsx";
import Footer from "./Footer.tsx";

export default function Layout() {
  const isAdmin = AuthService.isAdmin();

  return (
    <>
      <Header />
      {isAdmin && <Sidebar />}

      <div className={`main-content ${isAdmin ? "with-sidebar" : ""}`}>
        <Outlet />
      </div>

    </>
  );
}

