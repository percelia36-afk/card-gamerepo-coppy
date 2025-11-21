import Link from "next/link";
import EmbossedButton from "./EmbossedButton";

export default function MenuButtons() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* PLAY - Centered */}
      <Link href="/play">
        <EmbossedButton className="mb-6 px-28 py-6 text-3xl">
          PLAY
        </EmbossedButton>
      </Link>

      {/* SIGNUP + RULES - Side by Side Under PLAY */}
      <div className="flex gap-10">
        <Link href="/signup">
          <EmbossedButton className="px-20 py-5 text-xl">Signup</EmbossedButton>
        </Link>
        <Link href="/rules">
          <EmbossedButton className="px-20 py-5 text-xl">Rules</EmbossedButton>
        </Link>
      </div>

      {/* SETTINGS - Top Right (Text Only) */}
      <div className="absolute top-4 right-4">
        <Link href="/settings">
          <EmbossedButton className="px-10 py-3 text-lg">
            Settings
          </EmbossedButton>
        </Link>
      </div>
    </div>
  );
}
