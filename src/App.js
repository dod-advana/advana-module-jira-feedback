import React, {useState} from 'react';
import './App.css';
import FeedbackModal from './lib/components/FeedbackModal';

function App() {
	const [open, setOpen] = useState(false);
	return (
		<div className="App">
			<FeedbackModal open={open} setOpen={setOpen} />
			<button onClick={() => setOpen(true)}>Click</button>
		</div>
	);
}

export default App;
