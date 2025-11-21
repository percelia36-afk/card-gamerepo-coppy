// /src/app/rules/page.js
//
// Rules Page created with components so they could be used elsewhere as popups / reminders!

import Alternatives from "@/components/Alternatives";
import Objective from "@/components/Objective";
import TurnCycle from "@/components/TurnCycle";
import BullShitting from "@/components/BullShitting";
import CallingBS from "@/components/CallingBS";
import EndOfGame from "@/components/EndOfGame";

export default function rulesPage() {
  return (
    <div>
      <h1>The Rules</h1>
      <Alternatives />
      <Objective />
      <TurnCycle />
      <BullShitting />
      <CallingBS />
      <EndOfGame />
    </div>
  );
}
