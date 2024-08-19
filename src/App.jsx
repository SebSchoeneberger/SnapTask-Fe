import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Faq from "./Pages/Faq";
import People from "./Pages/People";
import Tasks from "./Pages/Tasks";
import Reports from "./Pages/Reports";
import NotFound from "./Pages/NotFound";
import ProtectedLayout from "./Layouts/ProtectedLayout";
import Profile from "./Pages/Profile";
import Areas from "./Pages/Areas";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<Profile />} />
      <Route path="faq" element={<Faq />} />

      <Route path="/" element={<ProtectedLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="people" element={<People />} />
        <Route path="areas" element={<Areas />} />
        <Route path="reports" element={<Reports />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
