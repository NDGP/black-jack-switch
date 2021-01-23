import "./Actions.css";

export default function Actions(props) {
  //DRY up this code
  //maybe iterate over the props.actions object
  //maybe all the button containers could be the same class
  
  // for (const actions in props.actions) {
  //   if (action) {
  //     //WIP
  //   }
  // }

  let deal = "deal";
  let swap = "switch";
  let split = "split";
  let hit = "hit";
  let stay = "stay";
  let double = "double"
  let reset = "reset"

  if (!props.actions.deal) {
    deal = deal + "-hidden"
  }

  if (!props.actions.switch) {
    swap = swap + "-hidden"
  }

  if (!props.actions.split) {
    split = split + "-hidden"
  }

  if (!props.actions.hit) {
    hit = hit + "-hidden"
  }

  if (!props.actions.stay) {
    stay = stay + "-hidden"
  }

  if (!props.actions.double) {
    double = double + "-hidden"
  }

  if (!props.actions.reset) {
    reset = reset + "-hidden"
  }

  return (
    <div class="Actions">

      <span class={deal}>
        <button type="button" class="Deal" onClick={props.deal}>Deal</button>
      </span>

      <span class={swap}>
        <button type="button" class="Switch" onClick={props.swap} >Switch</button>
      </span>

      <span class={hit}>
        <button type="button" class="Hit" onClick={props.hit}>Hit</button>
      </span>

      <span class={split}>
        <button type="button" class="Split" onClick={props.split}>Split</button>
      </span>

      <span class={stay}>
        <button type="button" class="Stay" onClick={props.stay}>Stay</button>
      </span>

      <span class={double}>
        <button type="button" class="Double" onClick={props.double}>Double Down</button>
      </span>

      <span class={reset}>
        <button type="button" class="reset" onClick={props.reset}>New Bet</button>
      </span>
    </div>
  )
}
