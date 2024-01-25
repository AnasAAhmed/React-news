
import './App.css';
import Navbar from "./components/Navbar";
import News from "./components/News";
import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
// import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {

  const [progress, setProgress] = useState(0)
  const apikey = process.env.REACT_APP_NEWS_API 
  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/sports" element={<News setProgress={setProgress} apikey={apikey} key="sports" country='in' category='sports' />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apikey={apikey} key="business" country='in' category='business' />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key="entertainment" country='in' category='entertainment' />} />
          <Route exact path="/general" element={<News setProgress={setProgress} apikey={apikey} key="general" country='in' category='general' />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apikey={apikey} key="health" country='in' category='health' />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apikey={apikey} key="science" country='in' category='science' />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apikey={apikey} key="technology" country='in' category='technology' />} />
        </Routes>
      </Router>

    </div>
  )
}
export default App;