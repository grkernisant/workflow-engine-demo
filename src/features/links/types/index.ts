import type {
    Status as StatusInstace,
    Task as TaskInstance,
    Workflow as WorkflowInstance
} from '../../workflows/types'

/**
 * Link relationship.
 */
export type ComponentType = 'WORKFLOW' | 'TASK';

/**
 * Link source and destination targets
 */
export interface LinkTarget {
  type: ComponentType;
  // Target ID can be a specific task ID, workflow ID
  id: string;
}

/**
 * Context payload passed to link condition evaluations.
 * Provides the state evaluation function with visibility across all tasks and workflow instances.
 */
export interface TransitionContext {
  workflow: WorkflowInstance;
  tasks: Map<string, TaskInstance>;
}

/**
 * Condition rule function.
 * Evaluates whether a target component should transition given current engine context.
 */
export type TransitionCondition = (
  sourceState: StatusInstace,
  context: TransitionContext
) => boolean;

/**
 * Defines a relationship between a source component state change and target component(s).
 */
export interface Link {
  id: string;
  description?: string;

  /** Source entity initiating the state transition */
  source: {
    type: ComponentType;
    id: string;
  };

  /** The state on the source entity that triggers this link */
  triggerState: StatusInstace;

  /** Target entity/entities affected by this trigger */
  targets: LinkTarget[];

  /** The resulting state that targets should transition to */
  targetState: StatusInstace;

  /**
   * Optional condition rule for advanced logic (e.g., merge gates).
   * If omitted, the transition applies unconditionally when sourceState === triggerState.
   */
  condition?: TransitionCondition;
}

/**
 * Represents a historical record of a state transition for auditing and debugging.
 */
export interface StateChangeEvent {
  id: string;
  timestamp: Date;
  entityType: ComponentType;
  entityId: string;
  previousState: StatusInstace;
  newState: StatusInstace;
  triggeredByLinkId?: string;
}