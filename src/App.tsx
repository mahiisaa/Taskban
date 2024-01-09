import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import Reset from "./pages/Authentication/Reset";
import NotFound from "./pages/NotFound";
import Boards from "./pages/Dashboard/Boards";
import DashboardLayout from "./components/Layouts/Dashboard";
import AuthLayout from "./components/Layouts/Auth";
import ProfileLayout from "./components/Layouts/Profile";
import Account from "./pages/Profile/Account";
import Information from "./pages/Profile/Information";
import Setting from "./pages/Profile/Setting";
import ContextProvider from "./context/store";
import WorkSpaces from "./pages/Dashboard/WorkSpaces";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import { ToastContainer } from "react-toastify";
import AuthCheck from "./components/Check";
import ThemeProvider from "./context/ThemeContext";

function App() {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  return (
    <ThemeProvider>
      <ContextProvider>
        <Provider store={store}>
          <BrowserRouter>
            <AuthCheck>
              <Routes>
                <Route path="/" element={<AuthLayout />}>
                  <Route index element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot" element={<ForgotPassword />} />
                  <Route path="/Reset-password" element={<Reset />} />
                </Route>
                <Route path="/" element={<DashboardLayout />}>
                  <Route
                    path="/workspaces/:wid/projects/:pid/boards/:bid?"
                    element={<Boards />}
                  />
                  <Route
                    path="/workspaces/:wid?/projects?/"
                    element={<WorkSpaces />}
                  />
                </Route>
                <Route path="/" element={<ProfileLayout />}>
                  <Route path="/account" element={<Account />} />
                  <Route path="/information" element={<Information />} />
                  <Route path="/setting" element={<Setting />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthCheck>
          </BrowserRouter>
        </Provider>
        <ToastContainer
          style={{ width: 340, fontSize: 14 }}
          rtl
          position="bottom-left"
          autoClose={3000}
        />
      </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
