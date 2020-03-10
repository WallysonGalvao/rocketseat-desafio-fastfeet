import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '~/assets/fastfeet-logo.png';

import { Container, Content } from './styles';

export default function Header() {
    const profile = { name: 'Wallyson' };
    return (
        <Container>
            <Content>
                <nav>
                    <NavLink to="/orders">
                        <img src={logo} alt="fastfeet" />
                    </NavLink>

                    <ul>
                        <li>
                            <NavLink to="/orders">Orders</NavLink>
                        </li>
                        <li>
                            <NavLink to="/recipients">Recipients</NavLink>
                        </li>
                        <li>
                            <NavLink to="/couriers">Couriers</NavLink>
                        </li>
                        <li>
                            <NavLink to="/problems">Problems</NavLink>
                        </li>
                    </ul>
                </nav>

                <aside>
                    <span>{profile.name}</span>
                    <button type="submit" onClick={() => {}}>
                        Log Out
                    </button>
                </aside>
            </Content>
        </Container>
    );
}
