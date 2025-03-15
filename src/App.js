import BedAllocation from './Components/BedAllocation';
import QueuePrediction from './Components/QueuePrediction';
import Reception from './Reception';
function App() {
  return (
    <div className="App">
      <Reception></Reception>
      <BedAllocation></BedAllocation>
      <QueuePrediction></QueuePrediction>
      
    </div>
  );
}

export default App;
