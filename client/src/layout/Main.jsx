import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const Main = () => {
  const navigation = useNavigation();
  const { pathname } = useLocation();
  const noHeaderFooter = pathname.includes("login");

  return (
    <>
      {noHeaderFooter || (
        <header>
          <Navbar></Navbar>
        </header>
      )}
      <main className="min-h-[calc(100vh-230px)]">
        {navigation.state === "loading" ? (
          <p>Loading....</p>
        ) : (
          <Outlet></Outlet>
        )}
      </main>
      {noHeaderFooter || (
        <footer>
          <Footer></Footer>
        </footer>
      )}
    </>
  );
};

export default Main;
