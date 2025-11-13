import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';
import LoginPage from './page/LoginPage.jsx';
import Chat from './Chat.jsx';
import PrivateChat from './page/PrivateChat.jsx';
import HomePage from './page/HomePage.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage/>,
		errorElement: <div>error</div>,
		children: [
      {
        path: '/login',
        element: <LoginPage/>
      },
      {
        path: '/chat',
        element: <Chat/>
      },
	  {
		path: '/privateChat',
		element: <PrivateChat/>
	  }
		]}
	
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
