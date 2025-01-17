import { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { EchoVerseProvider, EchoVerseContext } from "./context/contractContext.jsx"

import Connect from './pages/Connect.jsx';
import Post from './pages/Post.jsx';


// eslint-disable-next-line react-refresh/only-export-components
const Home = () => {
  const { currentAccount } = useContext(EchoVerseContext);
  // const currentAccount = "0x1234567890";
  console.log("currentAccount", currentAccount)
  return (currentAccount ? <App /> : <Connect />);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: '/post/:id/',
    element: (<Post />),
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <EchoVerseProvider>
    <RouterProvider router={router} />
  </EchoVerseProvider>
)
