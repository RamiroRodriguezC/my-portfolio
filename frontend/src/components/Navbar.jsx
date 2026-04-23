import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav style={{ padding: '1rem', background: '#f5f5f5', display: 'flex', gap: '1rem' }}>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <span>Hola, {user.nombre}</span>
          <button onClick={logout}>cerrar sesion</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  )
}

export default Navbar