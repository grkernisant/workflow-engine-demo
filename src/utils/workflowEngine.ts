import {
  WorkflowInstance,
  TaskInstance,
  State,
  ComponentType,
  StateChangeEvent,
  TransitionContext,
} from './types';
import { LinkEngine } from './LinkEngine';

export class WorkflowEngine {
  private workflow: WorkflowInstance;
  private tasks: Map<string, TaskInstance> = new Map();
  private linkEngine: LinkEngine;
  private eventLog: StateChangeEvent[] = [];

  constructor(workflow: WorkflowInstance, tasks: TaskInstance[], linkEngine: LinkEngine) {
    this.workflow = workflow;
    tasks.forEach((task) => this.tasks.set(task.id, task));
    this.linkEngine = linkEngine;
  }

  // --- Getters ---

  public getWorkflow(): WorkflowInstance {
    return { ...this.workflow };
  }

  public getTasks(): TaskInstance[] {
    return Array.from(this.tasks.values());
  }

  public getTask(taskId: string): TaskInstance | undefined {
    const task = this.tasks.get(taskId);
    return task ? { ...task } : undefined;
  }

  public getEventLog(): StateChangeEvent[] {
    return [...this.eventLog];
  }

  // --- Core State Transition & Cascade Resolution ---

  /**
   * Primary entry point to trigger a state update on either a Workflow or a Task.
   * Cascades downstream transitions using a queue-based resolution strategy.
   */
  public setState(
    entityType: ComponentType,
    entityId: string,
    newState: State,
    triggeredByLinkId?: string
  ): void {
    // Queue structure to manage pending state transitions
    const transitionQueue: Array<{
      type: ComponentType;
      id: string;
      newState: State;
      linkId?: string;
    }> = [{ type: entityType, id: entityId, newState, linkId: triggeredByLinkId }];

    while (transitionQueue.length > 0) {
      const current = transitionQueue.shift()!;
      const currentState = this.getEntityState(current.type, current.id);

      // Skip redundant transitions to prevent infinite loops
      if (currentState === current.newState) {
        continue;
      }

      // 1. Apply state change to target entity
      this.applyStateChange(current.type, current.id, current.newState);

      // 2. Record audit log event
      this.eventLog.push({
        id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: new Date(),
        entityType: current.type,
        entityId: current.id,
        previousState: currentState,
        newState: current.newState,
        triggeredByLinkId: current.linkId,
      });

      // 3. Build current execution context snapshot
      const context: TransitionContext = {
        workflow: this.getWorkflow(),
        tasks: new Map(this.tasks),
      };

      // 4. Evaluate cascading links
      const downstreamTransitions = this.linkEngine.evaluateTransitions(
        current.type,
        current.id,
        current.newState,
        context
      );

      // 5. Enqueue valid downstream transitions
      for (const t of downstreamTransitions) {
        transitionQueue.push({
          type: t.target.type,
          id: t.target.id,
          newState: t.targetState,
          linkId: t.linkId,
        });
      }
    }
  }

  // --- Helpers ---

  private getEntityState(type: ComponentType, id: string): State {
    if (type === 'WORKFLOW') {
      return this.workflow.state;
    }
    const task = this.tasks.get(id);
    if (!task) {
      throw new Error(`Task with ID '${id}' not found in engine.`);
    }
    return task.state;
  }

  private applyStateChange(type: ComponentType, id: string, newState: State): void {
    const now = new Date();
    if (type === 'WORKFLOW') {
      this.workflow.state = newState;
      this.workflow.updatedAt = now;
    } else {
      const task = this.tasks.get(id);
      if (task) {
        task.state = newState;
        task.updatedAt = now;
      }
    }
  }
}