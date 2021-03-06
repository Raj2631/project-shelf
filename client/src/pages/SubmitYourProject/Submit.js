import React, { useState } from 'react';
import { loader } from 'graphql.macro';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import SubmitForm from './SubmitForm';

import { Main, Overlay, Container } from './style';

//import styles from component
import {
  StyledPopup,
  HeaderContainer,
  Body,
} from '../../components/PopupModal/style';
const userToken = localStorage.getItem('userToken');

const GET_USER_QUERY = loader('./queryGetUser.graphql');
const CREATE_PROJECT_MUTATION = loader('./mutationCreateProject.graphql');

let img = '';

function Submit(props) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const { loading, data } = useQuery(GET_USER_QUERY, {
    variables: {
      id: userToken,
    },
  });

  const history = useHistory();

  const [sendInputs, { error }] = useMutation(CREATE_PROJECT_MUTATION);

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <Loader />;
  }

  const { user } = data;

  //creating projects
  async function onSubmit(data) {
    try {
      await sendInputs({
        variables: {
          input: {
            authorId: userToken,
            preview: data.preview,
            title: data.title,
            siteLink: data.siteLink,
            repoLink: data.repoLink,
            description: data.description,
          },
        },
      });
      img = data.preview;
      setOpen((o) => !o);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }

  return (
    <Main>
      <Header />

      <Overlay>
        <Container>
          <p>
            <span>ShowCase them </span>
            <span>so that people can learn from each other.</span>
          </p>

          <SubmitForm user={user} onSubmit={onSubmit} />
        </Container>
      </Overlay>
      <StyledPopup
        open={open}
        closeOnDocumentClick={false}
        onClose={closeModal}
      >
        <div className='modal'>
          <HeaderContainer>
            <span>Project Submission</span>
            <button onClick={closeModal}>&times;</button>
          </HeaderContainer>
          <Body>
            <div className='imgContainer'>
              <img src={img} alt={img}></img>
            </div>
            <p className='message'>Project have been submitted !</p>
            <button onClick={() => history.push('/')}>Ok</button>
          </Body>
        </div>
      </StyledPopup>
    </Main>
  );
}

export default Submit;
