//  /src/components/TurnCycle.jsx

export default function TurnCycle() {
  return (
    <>
      <h3>Starting the Game: Main turn cycle</h3>
      <p>
        First Player must always start by discarding a number of aces, and
        declaring how many aces e.g. 2 Aces
      </p>
      <p>
        The turn then passes to the next player on the first player's left, and
        they are required to discard the next card in consecutive ascending
        order.
      </p>
      <p>
        The player has the option of discarding all the cards of a particular
        value at once or hold some back for the next pass of that value
      </p>
      <p>
        They must announce the card value and number of cards they are
        discarding to the rest of the group as they place the cards face-down in
        the discard pile. If Kings are discarded, start again a Aces.
      </p>
    </>
  );
}
