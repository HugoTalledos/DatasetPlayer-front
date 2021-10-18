import React, { useContext, useMemo, useState } from 'react';
import { ToastContainer, Toast } from "react-bootstrap";
import { ReactComponent as WarningSVG } from '../../res/icons/warning.svg';
import { ReactComponent as AlertSVG } from '../../res/icons/danger.svg';
import { ReactComponent as SuccesSVG } from '../../res/icons/success.svg';
import { ReactComponent as DefaultSVG } from '../../res/icons/default.svg';
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

  const renderIcon = () => {
    switch (data.type) {
      case 'warning': return(<WarningSVG className={'iconNotification warning'}/>);
      case 'error': return(<AlertSVG className={'iconNotification danger'}/>);
      case 'success': return(<SuccesSVG className={'iconNotification success'}/>);
      default: return(<DefaultSVG className={'iconNotification'}/>);
    }
  }

  return (<ToastContainer className="d-inline-block m-1" position={'top-center'}>
    <Toast show={data.show} delay={notificationTimeout}
           bg={'ligth'} animation autohide>
      <Toast.Header closeButton={false}>
        {renderIcon(data.type)}
        <strong className="me-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body>{data.text}</Toast.Body>
    </Toast>
  </ToastContainer>);
};

export default Alert;
