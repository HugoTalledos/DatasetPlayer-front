import Form from './components/Form/Form';
import PreviewList from './components/PreviewList/PreviewList';
import AppContext from './data/app-data';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (<div className={'main-container'}>
    <AppContext>
      <Form/>
      <PreviewList/>
    </AppContext>
 </div>);
}

export default App;
