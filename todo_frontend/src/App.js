import React from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import MainScreen from "./Components/Main/MainScreen";
import SideMenu from "./Components/Main/SideMenu";
import { Toaster } from "react-hot-toast";

import NavBar from "./Components/NavBar";
import ProfileMain from "./Components/Profile/ProfileMain";
import SignUp from "./Components/Reigister/SignUp";

import TaskScreen from "./Components/TaskDisplay/TaskScreen";
import SpinnerState from "./Context/Spinner/SpinnerState";
import TaskState from "./Context/Task/TaskState";

import TodoState from "./Context/Todo/TodoState";
import Login from "./Components/Reigister/Login";
import UserState from "./Context/User/UserState";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <TodoState>
        <TaskState>
          <SpinnerState>
            <UserState>
              <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  // Define default options
                  className: "",
                  duration: 5000,
                  style: {
                    background: "#363636",
                    color: "#fff",
                  },

                  // Default options for specific types
                  success: {
                    duration: 3000,
                    theme: {
                      primary: "green",
                      secondary: "black",
                    },
                  },
                }}
              />

              {location.pathname !== "/signup" &&
                location.pathname !== "/login" ? (
                <NavBar />
              ) : (
                <></>
              )}
              <div className="flex">
                {location.pathname !== "/signup" &&
                  location.pathname !== "/login" ? (
                  <SideMenu />
                ) : (
                  <></>
                )}

                <Routes>
                  <Route exact path="/" element={<MainScreen />}></Route>
                  <Route
                    exact
                    path="/:todoId/:todoTitle"
                    element={<TaskScreen />}
                  ></Route>
                  <Route
                    exact
                    path="/profile"
                    element={<ProfileMain />}
                  ></Route>
                  <Route exact path="/signup" element={<SignUp />}></Route>
                  <Route exact path="/login" element={<Login />}></Route>
                </Routes>
              </div>
            </UserState>
          </SpinnerState>
        </TaskState>
      </TodoState>
    </>
  );
};

export default App;
