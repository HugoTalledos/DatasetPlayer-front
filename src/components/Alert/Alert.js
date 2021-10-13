import React, { useContext, useMemo, useState } from 'react';
import { ToastContainer, Toast } from "react-bootstrap";
import alertMessageContext from '../../context/notification-context';
import './Alert.css';

const Alert = () => {
  const { data, dispatchData } = useContext(alertMessageContext);
  const [notificationTimeout, setNotificationTimeout] = useState(null);

  useMemo(() => {
    if (data.show) {
      clearTimeout(notificationTimeout);
      setNotificationTimeout(setTimeout(() => {
        data.text = '';
        dispatchData();
      }, 3000));
    }
    // eslint-disable-next-line
  }, [data]);

  return (<ToastContainer className="d-inline-block m-1" position={'bottom-start'}>
    <Toast show={data.show} delay={notificationTimeout}
           bg={data.type} animation autohide>
      <Toast.Header closeButton={false}>
        <strong className="me-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body>{data.text}</Toast.Body>
    </Toast>
  </ToastContainer>);
};

export default Alert;
