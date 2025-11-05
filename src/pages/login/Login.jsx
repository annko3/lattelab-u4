import React from 'react'
import { Link } from 'react-router-dom';

function Login() {
  return (
    <section>
      <h2>Iniciar Sesión</h2>
      <Link to="/register" className="">
        Crear Cuenta
      </Link>
    </section>
  )
}

export default Login
