import "./CSS/Actions.css";

export default function Actions(props) {

  const actions = props.actions;
  let actionsList = Object.keys(actions)

  const displayActions = actionsList.map(action => {
    let actionClass = "action"
    if (actions[action].enabled === false) {
      actionClass = actionClass + "-hidden"
    }
    return (
      <span class={actionClass}>
        <button type="button" class={actions[action].name} onClick={actions[action].execute}>{actions[action].name}</button>
      </span>
    );
  })

  return (
    <div class="Actions">
      { displayActions }
    </div>
  )
}
