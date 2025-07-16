import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MintNFTApp from './pages/MintNFTApp';
import ProtectedPage from './pages/ProtectedPage';

function App() {
	  return (
		      <Router>
		        <nav className="p-4 bg-gray-200 flex gap-4">
		          <Link to="/">Home</Link>&emsp;
		          <Link to="/mint">NFT発行</Link>&emsp;
		          <Link to="/access">限定ページ</Link>
		        </nav>

		        <div className="p-6">
		          <Routes>
		            <Route path="/" element={<Home />} />
		            <Route path="/mint" element={<MintNFTApp />} />
		            <Route path="/access" element={<ProtectedPage />} />
		          </Routes>
		        </div>
		      </Router>
		    );
}

export default App;
