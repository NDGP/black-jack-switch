import "./Actions.css";

export default function Actions(props) {
  return (
    <div class="Actions">
    <button type="button" class="Deal" onClick={props.deal}>Deal</button>
    <button type="button" class="Switch" onClick={props.swap} >Switch</button>
    <button type="button" class="Hit" onClick={props.hit}>Hit</button>
    <button type="button" class="Hit" onClick={props.hitD}>Dealer</button>
    <button type="button" class="Stay"onClick={props.stay}>Stay</button>
    <button type="button" class="Double"onClick={props.double}>Double Down</button>
    <button type="button" class="Split"onClick={props.split}>Split</button>
  </div>
  )
}