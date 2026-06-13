import { Route, Routes } from 'react-router-dom'
import Main from './layouts'

function App() {
  

  return (

      <Routes>
        <Route path="/" element={<Main />}>
          {/* <Route index element={<Home />} />
          <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Routes>
  )
}

export default App
