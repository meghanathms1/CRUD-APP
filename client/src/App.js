
import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import User from "./components/getUser/User"
import Add from "./components/addUser/Add"
import Edit from "./components/updateUser/Edit"
const route = createBrowserRouter([
  {
    path:'/',
    element:<User/>,

  },
  {
    path:'/add',
    element:<Add/>,
    
  },
  {
    path:'/edit/:id',
    element:<Edit/>,
    
  }
])


function App() {
  return (
    <div className="App">
     <RouterProvider router={route }></RouterProvider>
    </div>
  );
}

export default App;
