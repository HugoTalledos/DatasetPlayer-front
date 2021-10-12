import Form from './components/Form/Form';
import PreviewList from './components/PreviewList/PreviewList';
import Notification from './components/Alert/Alert';
import AppContext from './data/app-data';
import PushNotificationContext from './data/notification-data';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (<div className={'main-container'}>
    <AppContext>
      <PushNotificationContext>
        <Form/>
        <PreviewList/>
        <Notification/>
      </PushNotificationContext>
    </AppContext>
 </div>);
}

export default App;
