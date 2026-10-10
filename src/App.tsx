import { Route, Routes } from 'react-router'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import AtrasosList from './components/AtrasosList/AtrasosList'
import AlunoForm from './components/AlunoForm/AlunoForm'
import AtrasoForm from './components/AtrasoForm/AtrasoForm'
import Layout from './components/Layout/Layout'
import Settings from './components/Settings/Settings'

function App() {

  return (
    <>
      <div className='app-container'>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Dashboard />} />
            <Route path="/atrasos" element={<AtrasosList />} />
            <Route path="alunos/novo" element={<AlunoForm />} />
            <Route path="/atrasos/novo" element={<AtrasoForm />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
