import { UUID } from 'uuidv7'
import type { TaskStatus } from './Status'

export interface Task {
    id: UUID
    parentId: UUID
    name: string
    description: string
    state: TaskStatus
    updatedAt: Date
}