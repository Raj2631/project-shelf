import React, { useContext } from 'react';

import { Container, Links, StyledLink } from './style';

import { Context } from '../../Context/AppContext';

function Footer(props) {
  const hooks = useContext(Context);
  const { isAuthenticated } = hooks;

  return (
    <Container>
      <Links style={{ maxWidth: '200px' }}>
        <ul>
          <li>
            <StyledLink exact activeClassName='current' to='/'>
              ShowCase
            </StyledLink>
          </li>
        </ul>
      </Links>

      <Links>
        {isAuthenticated ? (
          <ul>
            <li style={{ order: '1' }}>
              <StyledLink exact activeClassName='current' to='/'>
                Home
              </StyledLink>
            </li>

            <li style={{ order: '2' }}>
              <StyledLink activeClassName='current' to='/weekly'>
                Weekly Projects
              </StyledLink>
            </li>

            <li style={{ order: '3' }}>
              <StyledLink activeClassName='current' to='/submit'>
                Submit your Projects ?
              </StyledLink>
            </li>

            <li style={{ order: '4' }}>
              <StyledLink activeClassName='current' to='/logout'>
                Log out
              </StyledLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li style={{ order: '1' }}>
              <StyledLink activeClassName='current' to='/weekly'>
                Weekly Projects
              </StyledLink>
            </li>

            <li style={{ order: '2' }}>
              <StyledLink activeClassName='current' to='/submit'>
                Submit your Projects ?
              </StyledLink>
            </li>

            <li style={{ order: '3' }}>
              <StyledLink activeClassName='current' to='/register'>
                Register
              </StyledLink>
            </li>

            <li style={{ order: '4' }}>
              <StyledLink activeClassName='current' to='/signin'>
                Sign in
              </StyledLink>
            </li>
          </ul>
        )}
      </Links>
    </Container>
  );
}

export default Footer;
