import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Tutorial from './pages/TutorialPage/Tutorial';
import Test from './pages/TestPage/Test';
import About from './pages/AboutPage/AboutPage';
import MainPage from './pages/MainPage/MainPage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main className='main-content'>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/tutorial" component={Tutorial} />
            <Route path="/test" component={Test} />
            <Route path="/about" component={About} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
