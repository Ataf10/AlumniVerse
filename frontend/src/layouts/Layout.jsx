import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ProtectedRoute from "../components/ProtectedRoutes";

const Layout = ({ children }) => {
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
