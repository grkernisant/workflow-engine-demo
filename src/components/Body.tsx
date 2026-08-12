import AddWorkflowForm from '../features/workflows/components/AddWorkflowForm'
import type { BodyProps } from '../types'
import type { Task, WorkflowStatus } from '../features/workflows/types'

function Body(props: BodyProps) {
  const name = "" // props.workflow.name ?? ""
  const status = "DRAFT" as unknown as WorkflowStatus // "props.workflow.status ?? "DRAFT"
  const tasks = [] as unknown as Task[] // props.workflow.tasks ?? []
  const description = "" // props.workflow.description ?? ""

  return (
    <div className="main-app-container p-6">
      <AddWorkflowForm
        name={name}
        status={status}
        availableStatuses={props.workflow.availableStatuses}
        tasks={tasks}
        description={description} />
    </div>
  )
}

export default Body