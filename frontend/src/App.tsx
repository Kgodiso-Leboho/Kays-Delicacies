import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Index from './pages/Index';
//import AuthGuard from '../components/AuthGuard';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/menu" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}