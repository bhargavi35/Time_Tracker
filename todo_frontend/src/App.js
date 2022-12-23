import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast"

import Login from './Components/Register/Login';
import Signup from './Components/Register/Signup';
import Profile from './Components/Profile/Profile';
import Navbar from './Components/Navbar';
import Screen from './Components/TaskDisplay/Screen';
import Main from './Components/Main/Main';

import { TodoState } from './Context/Todo/TodoState';
import { TaskState } from './Context/Task/TaskState';
import { SpinnerState } from './Context/Spinner/SpinnerState';
import { UserState } from './Context/User/UserState';
import Side from './Components/Main/Side';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <TodoState>
        <TaskState>
          <SpinnerState>
            <UserState>
              <Toaster
                position='top-right'
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  className: "",
                  duration: 5000,
                  style: {
                    background: "#363636",
                    color: "#fff"
                  },

                  success: {
                    duration: 3000,
                    theme: {
                      primary: "green",
                      secondary: "black",
                    }
                  }

                }}
              />
              {(location.pathname !== '/signup') && (location.pathname !== "/login") ? <Navbar /> : (<></>)}


              <div className='flex'>

                {(location.pathname !== '/signup') && (location.pathname !== "/login") ? (<Side />) : (<></>)}

                <Routes>
                  <Route path='/' element={<Main />} />
                  <Route path='/profile' elemen={<Profile />} />
                  <Route path='/:todoId/:todoTitle' element={<Screen />} />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/login' element={<Login />} />
                </Routes>
              </div>
            </UserState>
          </SpinnerState>
        </TaskState>
      </TodoState>

    </>
  );
}

export default App;
