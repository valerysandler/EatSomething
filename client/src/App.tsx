import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import UsersPage from './pages/UsersPage'
import AddUserPage from './pages/AddUserPage'


function App() {
  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/add-user" element={<AddUserPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
