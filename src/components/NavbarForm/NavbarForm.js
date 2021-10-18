import React, { useState, useContext, useEffect } from 'react';
import { Navbar, Container, Button, NavDropdown } from 'react-bootstrap';
import { firebaseRef } from '../../firebase/firebase';
import DataApi from '../../api/UserApi';
import NotificationContext from '../../context/notification-context';

const Login = () => {
  const [ready, setReady] = useState(false);
  const [userName, setUserName] = useState('');
  const { dispatchData: dispatchNotification } = useContext(NotificationContext);

  let token;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatchNotification({ text: `¡Bienvenido de vuelta, ${localStorage.getItem('userName')}`});
      setUserName(localStorage.getItem('userName'));
      setReady(true);
    }
    //eslint-disable-next-line
  }, []);

  const addPerson = (userInfo, permissionId, token) => {
    const data = {
      email: userInfo.email,
      id: firebaseRef.auth().currentUser.uid,
      userInfo,
      permissionId,
      token,
    };
    DataApi.postUser(data)
      .then((todos) => {console.log(todos); localStorage.setItem('userID', todos.data.userId)})
      .catch((err) => dispatchNotification({ text: `${err.message}`|| 'Unexpected error'}));
  };

  const register = () => {
    const provider = new firebaseRef.auth.GoogleAuthProvider();
    firebaseRef.auth().signInWithPopup(provider)
      .then(async (result) => {
        const userInfo = result.additionalUserInfo.profile;
        await firebaseRef.auth().currentUser.getIdToken()
          .then((userToken) => {
            token = userToken;
            localStorage.setItem('token', token);
          });
        dispatchNotification({ text: `¡Bienvenido ${userInfo.name}!` });
        setReady(true);
        setUserName(userInfo.name);
        if (result.additionalUserInfo.isNewUser) {
          addPerson(userInfo, token);
        } else {
          if (!token || token.length <= 0) return;
          localStorage.setItem('userID', result.additionalUserInfo.profile.id);
        }
        localStorage.setItem('userName', result.additionalUserInfo.profile.name)
      })
      .catch(err => console.log(err));
  };

  const signOut = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
      dispatchNotification({ text: `Hasta luego ${localStorage.getItem('userName')}` })
      localStorage.removeItem('userName');
      setReady(false);
      firebaseRef.auth().signOut();
    } catch (e) { // an error
    }
  };

  return (<>
    <Navbar bg={'dark'} variant={'dark'}>
      <Container>
        <Navbar.Brand>Formulario</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className={'justify-content-end'}>
          {
            ready
            ? <NavDropdown title={`${userName}`}
              menuVariant={'dark'}>
                <NavDropdown.Item onClick={() => signOut()}>Cerrar Sesión</NavDropdown.Item>
              </NavDropdown>
            : <Button onClick={() => register()} variant={'dark'}>
                Registrarse / Iniciar Sesión
              </Button>
            }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>);
};

export default Login;
