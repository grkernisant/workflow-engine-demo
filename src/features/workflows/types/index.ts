import type { WorkflowStatus } from './Status'

export * from './Status'
export * from './Task'
export * from './Workflow'
export interface AvailableStatusesProp {
    statuses: WorkflowStatus[]
}
export interface newWorkFlowStatusProp {
    newStatus: WorkflowStatus
}