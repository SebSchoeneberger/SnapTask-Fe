import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
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
import AuthProvider from "./Context/AuthProvider";
import Areas from "./Pages/Areas";
import Authorize from "./Layouts/Authorize";
import StaffDashboard from "./Pages/Staff/StaffDashboard";
import StaffTasks from "./Pages/Staff/StaffTasks";
import StaffAreas from "./Pages/Staff/StaffAreas";
import TaskDetails from "./Pages/Staff/TaskDetails";
import Unauthorized from "./Pages/Unauthorized";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="faq" element={<Faq />} />

      <Route path="/" element={<ProtectedLayout />}>
        <Route path="tasks/:id" element={<TaskDetails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/" element={<Authorize roles={["admin", "manager"]} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="people" element={<People />} />
          <Route path="areas" element={<Areas />} />
          <Route path="reports" element={<Reports />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>

        <Route path="/staff" element={<Authorize roles={["staff"]} />}>
          {/* <Route path="profile" element={<Profile />} /> */}
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="areas" element={<StaffAreas />} />
          <Route path="tasks/:id" element={<StaffTasks />} />
        </Route>
      </Route>

      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;
