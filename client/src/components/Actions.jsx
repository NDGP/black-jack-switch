
export default function Hand(props) {
  return (
    <div class="Actions">
    <button type="button" class="Switch" /*onclick={swap()}*/ >Switch</button>
    <button type="button" class="Hit" /*onclick={playerHand.add(deck.draw())} */ >Hit</button>
    <button type="button" class="Stay">Stay</button>
    <button type="button" class="Double">Double Down</button>
    <button type="button" class="Split">Split</button>
  </div>
  )
}