import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logo from '~/assets/fastfeet-logo.png';
import { signOut } from '~/store/modules/auth/actions';

import { Container, Content } from './styles';

export default function Header() {
    const profile = useSelector(state => state.user.profile);
    const dispatch = useDispatch();

    function handleSignOut() {
        dispatch(signOut());
    }

    return (
        <Container>
            <Content>
                <nav>
                    <NavLink to="/order">
                        <img src={logo} alt="fastfeet" />
                    </NavLink>

                    <ul>
                        <li>
                            <NavLink to="/order">Encomendas</NavLink>
                        </li>
                        <li>
                            <NavLink to="/deliveryman"> Entregadores</NavLink>
                        </li>
                        <li>
                            <NavLink to="/recipient">Destinatários</NavLink>
                        </li>
                        <li>
                            <NavLink to="/problem">Problemas</NavLink>
                        </li>
                    </ul>
                </nav>

                <aside>
                    <span>{profile.name}</span>
                    <button type="submit" onClick={handleSignOut}>
                        Sair
                    </button>
                </aside>
            </Content>
        </Container>
    );
}
