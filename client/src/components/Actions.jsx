
export default function Actions(props) {
  return (
    <div class="Actions">
    <button type="button" class="Deal" onClick={props.deal}>Deal</button>
    <button type="button" class="Switch" onClick={props.swap} >Switch</button>
    <button type="button" class="Hit" onClick={props.hit1}>Hit1</button>
    <button type="button" class="Hit" onClick={props.hit2}>Hit2</button>
    <button type="button" class="Hit" onClick={props.hitD}>Dealer</button>
    <button type="button" class="Stay">Stay</button>
    <button type="button" class="Double">Double Down</button>
    <button type="button" class="Split">Split</button>
  </div>
  )
}