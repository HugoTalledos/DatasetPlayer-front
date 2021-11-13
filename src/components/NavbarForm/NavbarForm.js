import React, { useState, useContext, useEffect } from 'react';
import { Navbar, Container, Button, NavDropdown, Nav } from 'react-bootstrap';
import { firebaseRef } from '../../firebase/firebase';
import DataApi from '../../api/UserApi';
import NotificationContext from '../../context/notification-context';
import Utils from '../../utils/utils';

const Login = () => {
  const [userName, setUserName] = useState('');
  const { dispatchData: dispatchNotification } = useContext(NotificationContext);

  let token;

  useEffect(() => {
    if (localStorage.getItem('mail')) {
      dispatchNotification({ text: `¡Bienvenido de vuelta, ${localStorage.getItem('userName')}`});
      setUserName(localStorage.getItem('userName'));
    }
    //eslint-disable-next-line
  }, []);

  const addPerson = (userInfo, token) => {
    const data = {
      email: userInfo.email,
      id: firebaseRef.auth().currentUser.uid,
      userInfo,
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
          })

        if (result.additionalUserInfo.isNewUser) {
          addPerson(userInfo, token);
        } else {
          if (!token || token.length <= 0) return;
          localStorage.setItem('userID', result.additionalUserInfo.profile.id);
        }
          
        dispatchNotification({ text: `¡Bienvenido ${userInfo.name}!` });
        setUserName(userInfo.name);
        localStorage.setItem('userName', result.additionalUserInfo.profile.name)
        window.location.href = '/';
      });
  };

  const signOut = () => {
    try {
      dispatchNotification({ text: `Hasta luego ${localStorage.getItem('userName')}` })
      Utils.logOut(firebaseRef);
    } catch (e) { // an error
    }
  };

  return (<>
    <Navbar bg={'dark'} variant={'dark'}>
      <Container>
        <Navbar.Brand href={'/'}>Formulario</Navbar.Brand>
        <Navbar.Toggle />
        <Nav.Link href={'/reportes'}>Reportes</Nav.Link>
        <Navbar.Collapse className={'justify-content-end'}>
          {
            localStorage.getItem('mail')
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
