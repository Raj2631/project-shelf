import React from 'react';
import { useState } from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import Header from '../../components/Header/Header';
import Activated from '../Activated/Activated';
import NotActivated from '../NotActivated/Notactivated';
import UserTable from '../UserTable/UserTable';
import Loader from '../../components/Loader/Loader';

import { Main, Container, TabContainer } from './style';

const tabs = [
  {
    title: 'Approved',
    path: 'approved',
  },
  {
    title: 'Not Approved Projects',
    path: 'notapproved',
  },
  {
    title: 'All Users',
    path: 'allusers',
  },
];

const GET_ALL_USER_QUERY = loader('../UserTable/queryGetAllUsers.graphql');

function Admin(props) {
  const [page, setPage] = useState('approved');

  const { data = {}, loading, error } = useQuery(GET_ALL_USER_QUERY);

  if (loading) {
    return <Loader/>
  }

  const { user } = data;

  return (
    <Main>
      <Header />
      <Container>
        <TabContainer>
          <ul>
            {tabs.map((tab) => (
              <li>
                <button
                  style={{
                    backgroundColor: page == tab.path ? '#20c997' : 'white',
                    color: page == tab.path ? 'white' : '#152c5b',
                    border: page == tab.path ? '1px solid #20c997' : '',
                  }}
                  onClick={() => {
                    setPage(tab.path);
                  }}
                >
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>
        </TabContainer>

        {page == 'approved' && <NotActivated />}
        {page == 'notapproved' && <Activated />}
        {page == 'allusers' && <UserTable data={user} />}
      </Container>
    </Main>
  );
}

export default Admin;
