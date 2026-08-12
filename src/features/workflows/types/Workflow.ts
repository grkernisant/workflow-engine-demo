import { UUID } from 'uuidv7'
import type { WorkflowStatus } from './Status'
import type { Task } from './Task'

export interface Workflow {
    id?: UUID
    name: string
    description: string
    status: WorkflowStatus
    availableStatuses: WorkflowStatus[]
    tasks: Task[]
    updatedAt?: Date
}