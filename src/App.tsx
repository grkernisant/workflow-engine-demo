import { useState } from 'react'
import Header from './components/Header'
import Nav from './components/Nav'
import Body from './components/Body'
import Footer from './components/Footer'
import type { Workflow, WorkflowStatus } from './features/workflows/types'
import './App.css'

function App() {
  const defaultStatuses = [
          { name: "DRAFT" },
          { name: "IN_PROGRESS" },
          { name: "COMPLETED" }
      ] as unknown as WorkflowStatus[]
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [statuses, setStatuses] = useState(defaultStatuses)
    const workflow = {
      name,
      description,
      status: "DRAFT" as unknown as WorkflowStatus,
      availableStatuses: statuses
    } as unknown as Workflow
    const stateControls = {
      setName,
      setDescription,
      setStatuses
    }
  return (
    <>
      <div className="min-h-screen w-full h-full absolute bg-linear-to-b from-white-500 to-blue-900 items-center justify-center">
        <Header />
        <Nav />
        <Body workflow={workflow} />
        <Footer />
      </div>
    </>
  )
}

export default App
