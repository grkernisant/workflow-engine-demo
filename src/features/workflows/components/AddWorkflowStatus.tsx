import { useState } from 'react'

function AddWorkflowStatus() {
    const [input, setInput] = useState("")

    return (
        <>
            <input
                type="text"
                placeholder="Workflow Status Name"
                value={input}
                onChange={(e) => setInput(e.target.value)} />
            <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-400">Add Workflow Status</button>
        </>
    )
}

export default AddWorkflowStatus