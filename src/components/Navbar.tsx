import { Link, NavLink } from 'react-router-dom'
import { Button } from './ui/button'
import Logo from '@/assets/logo.png'
import { MonitorCog } from 'lucide-react'
import useAuth from '@/hooks/useAuth'

const Navbar = () => {
  const { getAuthUser } = useAuth()

  const user = getAuthUser()

  return (
    <header className='flex w-full justify-between h-16 py-1 px-16 fixed top-0 bg-white items-center border-b'>
      <Link to='/' className='h-full'>
        <img src={Logo} alt='logo quantos watts' className='h-full' />
      </Link>

      <nav className='flex'>
        <ul className='flex gap-2'>
          {!user ? (
            <>
              <li>
                <Button asChild variant='link'>
                  <NavLink className='p-3' to='/entrar'>
                    Login
                  </NavLink>
                </Button>
              </li>
              <li>
                <Button asChild>
                  <NavLink className='p-3' to='/cadastrar'>
                    Cadastre-se
                  </NavLink>
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Button variant='link' asChild>
                  <NavLink className='p-3' to='/dashboard'>
                    <MonitorCog />
                    <span>Dashboard</span>
                  </NavLink>
                </Button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
