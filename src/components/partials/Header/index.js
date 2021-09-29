import React from 'react'
import { Link } from 'react-router-dom'
import { isLogged, doLogout } from '../../../helpers/AuthHandler'
import { HeaderArea } from './styled'

const Header = () => {
    let logged  = isLogged()

    const handleLogout = () =>{
        doLogout()
        window.location.href='/'
    }

    return(
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <span className="logo-text1" >O</span>
                        <span className="logo-text2" >L</span>
                        <span className="logo-text3" >X</span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        {logged &&
                            <>
                                <li>
                                    <Link to="/my-account">Minha Conta</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Sair</button>
                                </li>
                                <li>
                                    <Link to="/post-an-ad" className="button">Poste um anúncio</Link>
                                </li>
                            </>
                        }
                        
                        {!logged &&
                            <>
                                <li>
                                    <Link to="/signin">Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Cadastrar</Link>
                                </li>
                                <li>
                                    <Link to="/signin" className="button">Poste um anúncio</Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    )
}

export default Header