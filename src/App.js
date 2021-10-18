import Form from './components/Form/Form';
import PreviewList from './components/PreviewList/PreviewList';
import Notification from './components/Alert/Alert';
import AppContext from './data/app-data';
import Navbar from './components/NavbarForm/NavbarForm';
import PushNotificationContext from './data/notification-data';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (<>
  <PushNotificationContext>
    <Navbar/>
    <div className={'main-container'}>
      <AppContext>
        <Form/>
        <PreviewList/>
        <Notification/>
      </AppContext>
    </div>
  </PushNotificationContext>
  </>);
}

export default App;
