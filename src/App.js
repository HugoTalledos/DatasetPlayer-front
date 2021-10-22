import Navbar from './components/NavbarForm/NavbarForm';
import Notification from './components/Alert/Alert'
import ModalAlert from './components/Alert/ModalAlert'
import PushNotificationContext from './data/notification-data';

import ModalContext from './data/modal-data';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainContainer from './components/MainContainer/MainContainer';

const App = () => {
  return (<>
    <ModalContext>
      <PushNotificationContext>
        <Navbar/>
        <MainContainer/>
        <Notification/>
        <ModalAlert/>
      </PushNotificationContext>
    </ModalContext>
  </>);
}

export default App;
