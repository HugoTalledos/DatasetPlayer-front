import Form from './components/Form/Form';
import PreviewList from './components/PreviewList/PreviewList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (<div className={'main-container'}>
    <Form/>
    <PreviewList/>
 </div>);
}

export default App;
