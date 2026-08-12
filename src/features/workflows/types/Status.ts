export type StateDefault = "DRAFT" | "IN_PROGRESS" | "COMPLETED"

export interface Status {
    name: string | StateDefault
    stateOrder?: number
}
export interface TaskStatus extends Status {}
export interface WorkflowStatus extends Status {}