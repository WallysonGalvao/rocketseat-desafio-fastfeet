import { Link } from 'react-router-dom';

import { darken } from 'polished';
import styled from 'styled-components';

import { colors } from '~/components/colors';

export const ContentHeader = styled.div`
    display: flex;
    flex-direction: column;
    h2 {
        font-size: 2.4rem;
        font-weight: bold;
        margin: 20px 0;
    }
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0 16px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    svg {
        margin-right: 8px;
    }
    input {
        padding: 13px;
        font-size: 14px;
        border: 0;
        background: none;
        color: #444;
        ::placeholder {
            color: #999;
        }
    }
`;

export const ButtonContainer = styled(Link)`
    display: flex;
    align-items: center;
    padding: 9px;
    background: ${colors.primary};
    border-radius: 4px;
    border: none;
    span {
        font-size: 1.4rem;
        font-weight: bold;
        color: #fff;
    }
    &:hover {
        background: ${darken(0.1, colors.primary)};
    }
    svg {
        margin-right: 10px;
    }
`;
