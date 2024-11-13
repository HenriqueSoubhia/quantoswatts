import { Link, NavLink } from "react-router-dom"
import { Button } from "./ui/button"

const Navbar = () => {
    return (
        <header className="flex w-full justify-between h-16 p-3 fixed top-0 bg-white items-center border-b">
            <Link to="/">
                <h2 className="text-2xl font-bold">Quantos Watts?</h2>
            </Link>

            <nav className="flex">
                <ul className="flex gap-2">
                    <li>
                        <Button asChild variant="ghost">
                            <NavLink className="p-3" to="/entrar">Login</NavLink>
                        </Button>
                    </li>
                    <li>
                        <Button asChild>
                            <NavLink className="p-3" to="/cadastrar">Cadastre-se</NavLink>
                        </Button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
