import React from 'react';
import ReactToolTip from 'react-tooltip';
import Zoom from 'react-medium-image-zoom';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import IMG_Social from '../../assets/social.png';
import Rick from '../../assets/rick.png';

import { ReactComponent as Spinner } from '../../assets/spinner.svg';

import {
  CardOuter,
  CardInner,
  HeaderCollection,
  Links,
  Profile,
} from '../../components/Card/style';

import {
  FormContainer,
  Submission,
  InputContainer,
  Input,
  Upload,
  TextArea,
  ErrorText,
  CustomSubmitCss,
} from './style';

import Button from '../../components/Button/Button';
import Active from '../../components/Active/Active';

const MUTATION_UPLOAD_IMAGE = loader('./mutationUploadImage.graphql');

const EMAIL_STRING = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=';

function getCurrentDate() {
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const newDate = new Date();
  return newDate.toLocaleDateString('en-us', dateOptions);
}

function SubmitForm({ user, onSubmit }) {
  const { register, handleSubmit, control, errors, watch } = useForm({
    defaultValues: {
      title: 'Recipe App',
      preview: IMG_Social,
      repoLink: 'repo link',
      siteLink: 'Live Link here',
      description:
        'This was built using MERN stacks. Used cloudaniary for image hosting. Used netlify for hosting in the live server. A nightmare 👻 Dm for collaboration 🙏',
    },
  });

  const values = watch();

  console.log(values);

  const [uploadImage, { loading }] = useMutation(MUTATION_UPLOAD_IMAGE);

  const FILETYPE = 'jpg';

  function getFileExtension(fileName) {
    return fileName.split('.').pop();
  }

  async function handleImage(event, onChange) {
    // if (getFileExtension(event.target.files[0].name) !== FILETYPE) {
    //   alert('invalid file type');
    //   return false;
    // }

    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = async (e) => {
        const res = await uploadImage({
          variables: {
            path: reader.result,
          },
        });
        console.log(res?.data?.image?.url);
        onChange(res?.data?.image?.url);
      };
    }
  }

  return (
    <FormContainer>
      <CardOuter>
        <ReactToolTip className='notActivated' id='notActivated'>
          <span>Approved</span>
        </ReactToolTip>

        <div data-tip data-for='notActivated'>
          <div className='activeContainer'>
            <Active active='true' />
          </div>
        </div>

        <CardInner>
          <HeaderCollection>
            <span>{values.title}</span>
          </HeaderCollection>

          <Links>
            <a href={values.siteLink}>Live Link</a>
            <a href={values.repoLink}>Repo Link</a>
            <a href={EMAIL_STRING + user.email}>Contact</a>
          </Links>

          <div className='imgContainer'>
            <Zoom wrapStyle={{ display: 'block' }}>
              {(loading && (
                <p className='loading'>
                  <Spinner />
                </p>
              )) || (
                <img
                  alt={values.preview}
                  src={values.preview}
                  width='100%'
                  height='100%'
                />
              )}
            </Zoom>
          </div>

          <Profile>
            <div className='profileContainer'>
              <img alt={Rick} src={Rick} width='100%' height='100%'></img>
            </div>

            <div className='profileDetails'>
              <p>
                {user.name} {user.lastName}
              </p>

              <p>4th weekly project</p>
            </div>
          </Profile>
          <p className='date'>
            <span className='header'>Published Date :</span> {getCurrentDate()}
          </p>

          <p className='description'>{values.description}</p>
        </CardInner>
      </CardOuter>
      <Submission onSubmit={handleSubmit(onSubmit)}>
        <span>Submit your Project</span>
        <Controller
          name='preview'
          control={control}
          render={({ onChange }) => (
            <Upload for='file-upload'>
              <input
                id='file-upload'
                type='file'
                onChange={(e) => handleImage(e, onChange)}
              />
              Upload
            </Upload>
          )}
        />
        <InputContainer>
          <label>Title of the Project</label>
          <Input
            name='title'
            maxLength='15'
            placeholder='Title of the Project'
            ref={register({
              required: 'Title cannot be empty.',
              maxLength: {
                value: 14,
                message: 'Cannot exceed 14 words',
              },
              minLength: {
                value: 3,
                message: 'Cannot be less than 3 words',
              },
            })}
          />

          <ErrorMessage errors={errors} name='title' as={<ErrorText />}>
            {({ message }) => <small>{message}</small>}
          </ErrorMessage>
        </InputContainer>

        <InputContainer>
          <label>Link to the repository</label>
          <Input
            name='repoLink'
            placeholder='Link to the repository'
            ref={register({
              required: 'Link to the Repo Site cannot be empty.',
              pattern: {
                value: /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i,
                message: 'Its not a valid link',
              },
            })}
          />

          <ErrorMessage errors={errors} name='repoLink' as={<ErrorText />}>
            {({ message }) => <small>{message}</small>}
          </ErrorMessage>
        </InputContainer>

        <InputContainer>
          <label>Link to the live site</label>
          <Input
            name='siteLink'
            placeholder='Link to the live site'
            ref={register({
              required: 'Link to the Live Site cannot be empty.',
              pattern: {
                value: /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i,
                message: 'Its not a valid link',
              },
            })}
          />

          <ErrorMessage errors={errors} name='siteLink' as={<ErrorText />}>
            {({ message }) => <small>{message}</small>}
          </ErrorMessage>
        </InputContainer>

        <InputContainer>
          <label>Description</label>
          <TextArea
            name='description'
            placeholder='Description of the project in 50 words.'
            maxLength='150'
            minRows='7'
            maxRows='10'
            ref={register({
              required: 'Description cannot be empty.',
              maxLength: {
                value: 150,
                message: 'Cannot exceed 150 words',
              },
              minLength: {
                value: 50,
                message: 'Cannot be less than 50 words',
              },
            })}
          />

          <ErrorMessage errors={errors} name='description' as={<ErrorText />}>
            {({ message }) => <small>{message}</small>}
          </ErrorMessage>
        </InputContainer>

        <Button addCSS={CustomSubmitCss} type='submit'>
          Submit your Project
        </Button>
      </Submission>
    </FormContainer>
  );
}

export default SubmitForm;
