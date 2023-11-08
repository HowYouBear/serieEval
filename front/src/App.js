import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import UserProvider from "./components/Provider/UserProvider";


function App() {
  return (
    <div className="d-flex flex-column mh100">
      <UserProvider>
        <Header />
        <Suspense>
          <Outlet />
          </Suspense>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;
