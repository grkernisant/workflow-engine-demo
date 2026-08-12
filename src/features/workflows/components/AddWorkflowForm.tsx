import { useState } from 'react'
import type { Workflow, WorkflowStatus } from '../types'
import { onClickAddWorkflowButton } from '../utils/form'
import AddWorkflowStatus from './AddWorkflowStatus'
import AvailableStatusesList from './AvailableStatusesList'

function AddWorkflowForm(props: Workflow) {
    const defaultStatuses = [
        { name: "DRAFT" },
        { name: "IN_PROGRESS" },
        { name: "COMPLETED" }
    ] as unknown as WorkflowStatus[]
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [statuses, setStatuses] = useState(defaultStatuses)

    return (
        <div className="add-workflow-container">
            <div className="mb-2 flex">
                <span className="px-4 py-6">Name</span>
                <input
                    name="workflowName"
                    type="text"
                    className="border-amber-50 border-2 p-0.5"
                    placeholder="Workflow Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="mb-2 flex">
                <span className="px-4 py-6">Description</span>
                <textarea
                    name="workflowDescription"
                    className="border-amber-50 border-2 p-0.5"
                    placeholder="Workflow Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
            </div>
            
            <hr className="m-2" />
            <AddWorkflowStatus />
            <AvailableStatusesList statuses={statuses} />
            <hr className="m-2" />

            <button
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-400"
                onClick={onClickAddWorkflowButton}>Add Workflow</button>
        </div>
    )
}

export default AddWorkflowForm