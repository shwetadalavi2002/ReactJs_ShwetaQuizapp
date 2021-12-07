import {BrowserRouter as Router, Route} from 'react-router-dom'
import Start from "./components/Start";
import Instructions from './components/Instructions';
import PlayQuiz from './components/PlayQuiz';
import Summary from './components/Summary';
function App() {
  return (
    <Router>
        <Route path='/' exact component={Start}/>
        <Route path='/play/instructions' exact component={Instructions}/>
        <Route path='/play/Quiz' exact component={PlayQuiz}/>
        <Route path='/play/summary' exact component={Summary}/>
    </Router>
  );
}

export default App;
