
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
// import { UserProvider } from './context/UserContext'
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  
    
    <AuthProvider>
    <App />
     <ToastContainer 
     position="top-right"
     autoClose={3000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
   />
    </AuthProvider>
  
)
