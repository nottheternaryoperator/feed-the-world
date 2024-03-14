import Navbar from "./components/Navbar/navbar.jsx";
import Login from "./components/login/Login.jsx";
import Signup from "./components/login/SignUp.jsx";
import Footer from "./components/Footer/footer.jsx";

function App() {
    return (
      <div className="card">
          <Navbar />
          <Login />
          <Signup />
          <Footer />
      </div>
  );
}

export default App