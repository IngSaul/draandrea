import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Servicios from './pages/Servicios'
import Consultorios from './pages/Consultorios'
import Contacto from './pages/Contacto'
import NoEncontrado from './pages/NoEncontrado'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'servicios', Component: Servicios },
      { path: 'consultorios', Component: Consultorios },
      { path: 'contacto', Component: Contacto },
      { path: '*', Component: NoEncontrado },
    ],
  },
])
