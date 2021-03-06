import React, { useState } from 'react';
import ReactToolTip from 'react-tooltip';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import Active from '../Active/Active';
import { ReactComponent as Spinner } from './../../assets/spinner.svg';

import {
  CardOuter,
  CardInner,
  HeaderCollection,
  Links,
  Profile,
  ImgLoading,
} from './style';

import Rick from '../../assets/rick.png';

const EMAIL_STRING = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=';

function getCurrentDate(createdDate) {
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const newDate = new Date(createdDate);
  return newDate.toLocaleDateString('en-us', dateOptions);
}

function Card({ children, user, project, ...props }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <CardOuter>
      <ReactToolTip className='notActivated' id={project.id}>
        <span>{project.isApproved ? 'Approved' : 'Not Approved'}</span>
      </ReactToolTip>

      <div data-tip data-for={project.id}>
        <div className='activeContainer'>
          <Active active={project.isApproved} />
        </div>
      </div>

      <CardInner>
        <HeaderCollection>
          <span>{project.title}</span>
        </HeaderCollection>

        <Links>
          <a target='_blank' rel='noopener noreferrer' href={project.siteLink}>
            Live Link
          </a>
          <a target='_blank' rel='noopener noreferrer' href={project.repoLink}>
            Repo Link
          </a>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={EMAIL_STRING + (user.email || user.author.email)}
          >
            Contact
          </a>
        </Links>

        <div className='imgContainer'>
          {!imgLoaded ? (
            <ImgLoading>
              <Spinner />
            </ImgLoading>
          ) : null}
          <Zoom wrapStyle={{ display: 'block' }} zoomZindex='10px'>
            <img
              alt={project.preview}
              src={project.preview}
              width='100%'
              height='100%'
              onLoad={() => setImgLoaded(true)}
            ></img>
          </Zoom>
        </div>

        <Profile>
          <div className='profileContainer'>
            <img
              alt={project.preview}
              src={Rick}
              width='100%'
              height='100%'
            ></img>
          </div>

          <div className='profileDetails'>
            <p>
              {user.name || user.author.name}{' '}
              {user.lastName || user.author.lastName}
            </p>

            <p>4th weekly project</p>
          </div>
        </Profile>
        <p className='date'>
          <span className='header'>Published Date :</span>{' '}
          {getCurrentDate(project.createdAt)}
        </p>

        <div className='descriptionContainer'>
          <p className='description'>{project.description}</p>
        </div>

        {children}
      </CardInner>
    </CardOuter>
  );
}

export default Card;
