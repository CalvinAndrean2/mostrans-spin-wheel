"use client";
import { useState } from "react";

export default function SpinWheel({ players }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState("");

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * players.length);
    setWinner(players[randomIndex]);

    setTimeout(() => {
      setIsSpinning(false);
    }, 3000); // Spin duration
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-500">
      <div
        className={`relative w-64 h-64 border-4 border-purple-700 rounded-full flex items-center justify-center transition-transform duration-700 ease-out transform ${
          isSpinning ? "rotate-[360deg]" : ""
        }`}
        onClick={spinWheel}
      >
        <div className="absolute w-4 h-4 bg-yellow-500 rounded-full"></div>
        <div className="absolute w-full h-full flex items-center justify-center">
          <div
            className="grid grid-cols-10 grid-rows-5 w-full h-full rounded-full"
            style={{
              clipPath: "circle(50%)",
              transform: "rotate(-30deg)",
            }}
          >
            {players.map((player, index) => (
              <div
                key={index}
                className={`flex items-center justify-center ${
                  index % 2 === 0 ? "bg-purple-300" : "bg-purple-400"
                }`}
                style={{ transform: `rotate(${index * 36}deg)` }}
              >
                <span className="text-white">{player}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="mt-6 bg-purple-600 text-white px-4 py-2 rounded"
        onClick={spinWheel}
        disabled={isSpinning}
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </button>
      {winner && <h2 className="text-white mt-4">Winner: {winner}</h2>}
    </div>
  );
}
