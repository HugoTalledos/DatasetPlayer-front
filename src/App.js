import Form from './components/Form/Form';
import PreviewList from './components/PreviewList/PreviewList';
import Notification from './components/Alert/Alert';
import ModalAlert from './components/Alert/ModalAlert';
import AppContext from './data/app-data';
import Navbar from './components/NavbarForm/NavbarForm';
import PushNotificationContext from './data/notification-data';
import ModalContext from './data/modal-data';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (<>
  <ModalContext>
    <PushNotificationContext>
      <Navbar/>
      <div className={'main-container'}>
        <AppContext>
          <Form/>
          <PreviewList/>
          <Notification/>
          <ModalAlert/>
        </AppContext>
      </div>
    </PushNotificationContext>
  </ModalContext>
  </>);
}

export default App;
