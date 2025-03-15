import BedAllocation from './Components/BedAllocation';
import QueuePrediction from './Components/QueuePrediction';
import Reception from './Components/Reception';
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
