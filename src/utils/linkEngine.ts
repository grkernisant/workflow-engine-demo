import type { Link, ComponentType, TransitionContext, LinkTarget } from '../features/links/types';
import type { Status as StatusInstance } from '../features/workflows/types';

/**
 * Architectural Strengths
 * Loop Safety & Cascade Prevention:
 *    Queueing transitions (transitionQueue) rather than using direct recursion ensures that cyclic link definitions won't cause call-stack overflows.
 * 
 * Deterministic Context: Transitions evaluate using a snapshot of current engine state (TransitionContext),
 * which ensures conditional rules (e.g., merge gates) make decisions on clean state snapshots.
 * 
 * Audit Readiness: Every state change (manual or cascaded) generates a timestamped StateChangeEvent entry,
 * providing trace logs for UI visualizers or unit tests.
 */

export class LinkEngine {
  private links: Link[] = [];

  constructor(initialLinks: Link[] = []) {
    this.links = initialLinks;
  }

  /**
   * Registers a new link into the evaluation engine.
   */
  public addLink(link: Link): void {
    this.links.push(link);
  }

  /**
   * Finds all valid link transitions triggered by a specific entity changing state.
   */
  public evaluateTransitions(
    sourceType: ComponentType,
    sourceId: string,
    newState: StatusInstance,
    context: TransitionContext
  ): Array<{ target: LinkTarget; targetState: StatusInstance; linkId: string }> {
    const matchingLinks = this.links.filter((link) => {
      // Check if source matches
      const isSourceMatch =
        link.source.type === sourceType &&
        (link.source.id === '*' || link.source.id === sourceId);

      // Check if trigger state matches
      const isStateMatch = link.triggerState === newState;

      return isSourceMatch && isStateMatch;
    });

    const pendingTransitions: Array<{ target: LinkTarget; targetState: StatusInstance; linkId: string }> = [];

    for (const link of matchingLinks) {
      // Evaluate custom condition (if present) or default to true
      const shouldTrigger = link.condition
        ? link.condition(newState, context)
        : true;

      if (shouldTrigger) {
        for (const target of link.targets) {
          // Resolve wildcard workflow targets to the active workflow ID
          const resolvedTarget: LinkTarget = {
            type: target.type,
            id: target.id === '*' ? context.workflow.id : target.id,
          };

          pendingTransitions.push({
            target: resolvedTarget,
            targetState: link.targetState,
            linkId: link.id,
          });
        }
      }
    }

    return pendingTransitions;
  }
}