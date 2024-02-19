import './App.css'
import HeaderComponent from './component/HeaderComponent'
import ListStudentComponent from './component/ListStudentComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentComponent from './component/StudentComponent'
function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<ListStudentComponent />}></Route>
          <Route path='/students' element={<ListStudentComponent />}></Route>

          <Route path='/add-student' element={<StudentComponent />}></Route>

          <Route path='/edit-student/:id' element = { <StudentComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
