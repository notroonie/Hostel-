import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Spinner from "./components/Spinner";

import { useSelector } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";
import ApplyLeave from "./pages/ApplyLeave";
import NotificationPage from "./pages/NotificationPage";
import StudentList from "./pages/StudentList";
import LeaveList from "./pages/LeaveList";
import Attendance from "./pages/Attendance";



function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
        

            <Route
              path="/applyleave"
              element={
                <ProtectedRoutes>
                  <ApplyLeave />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/notification"
              element={
                <ProtectedRoutes>
                  <NotificationPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/studentlist"
              element={
                <ProtectedRoutes>
                  <StudentList />
                </ProtectedRoutes>
              }
            />
                  <Route
              path="/attendance"
              element={
                <ProtectedRoutes>
                  <Attendance />
                </ProtectedRoutes>
              }
            />
            
            
            <Route
              path="/leavelist"
              element={
                <ProtectedRoutes>
                  <LeaveList />
                </ProtectedRoutes>
              }
              />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
                <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Mainpage />
                </ProtectedRoutes>
              }
            /> 

      
            
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
