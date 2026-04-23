import { useAuth } from '../context/AuthContext'

function Home() {
  const { user, logout } = useAuth()

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenido al Portfolio</h1>
      {user ? (
        <div>
          <p>Hola, {user.nombre}</p>
          <button onClick={logout}>Cerrar sesion</button>
        </div>
      ) : (
        <p>Inicia sesion para continuar</p>
      )}
    </div>
  )
}

export default Home