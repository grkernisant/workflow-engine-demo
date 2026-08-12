import type { AvailableStatusesProp } from "../types"

/**
 * TODO(WorkflowStatus): UI sort status
 */
function AvailableStatusesList(props: AvailableStatusesProp) {
    return (
        <>
            <div>Available Statuses (Flow)</div>
            <div>
                {props.statuses.map((status) => (
                    <div key={status.name} className="italic">{status.name}</div>
                ))}
            </div>
        </>
    )
}

export default AvailableStatusesList