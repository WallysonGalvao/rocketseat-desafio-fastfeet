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
                    <NavLink to="/orders">
                        <img src={logo} alt="fastfeet" />
                    </NavLink>

                    <ul>
                        <li>
                            <NavLink to="/orders">Encomendas</NavLink>
                        </li>
                        <li>
                            <NavLink to="/couriers"> Entregadores</NavLink>
                        </li>
                        <li>
                            <NavLink to="/recipients">Destinatários</NavLink>
                        </li>
                        <li>
                            <NavLink to="/problems">Problemas</NavLink>
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
