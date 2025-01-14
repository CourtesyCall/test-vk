
import './App.css';

import VkAuth from "./auth/VkAuth";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router";
import Layout from "./router/layout";
import {useEffect, useState} from "react";
import VkPost from "./post/VkPost";
import Main from "./main/Main";

import TestPost from "./post/testPost";

function App() {

    const [accessToken, setAccessToken] = useState(""); // Состояние для токена
    const [userId, setUserId] = useState(''); // Состояние для айдишника пользователя
    

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<Layout/>}>
                <Route index element={<VkAuth setAccessToken={setAccessToken} setUserId={setUserId}/>}/>
                <Route path='/post' element={<VkPost accessToken={accessToken}/>}/>
                <Route path='/testpost' element={<TestPost accessToken={accessToken} userId={userId}/>}/>
                <Route path='/main' element={<Main/>}/>
            </Route>
        )
    )

    console.log(window.VK)


  return (
      <div>
        <RouterProvider router={router}/>
      </div>);
}

export default App;
