"use client";
import Lottie from "react-lottie-player";
import spinWheelAnimation from "./assets/new-spin-wheel.json";
import confettiAnimation from "./assets/confetti.json";
import annivConfettiAnimation from "./assets/anniv-confetti.json";
import { useEffect, useRef, useState } from "react";
import { Button, Modal, TextInput, Textarea } from "flowbite-react";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [isSpinClicked, setIsSpinClicked] = useState(false);

  const [doorprize, setDoorprize] = useState("");

  const [winnerCount, setWinnerCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logWinner, setLogWinner] = useState({});
  const [tempWinner, setTempWinner] = useState([]);
  const [tempDoorPrize, setTempDoorPrize] = useState("");
  const [listPlayerString, setListPlayerString] = useState("");

  const validationOfPlayerList = () => {
    const winnerCountStr = winnerCount.toString();

    if (stringSplitter(listPlayerString).length === 0) {
      toast.error("Please insert player list");
      return false;
    } else if (!/^\d+$/.test(winnerCountStr)) {
      toast.error(
        "Winner count must be a positive integer without commas or decimals"
      );
      return false;
    } else if (stringSplitter(listPlayerString).length < winnerCount) {
      toast.error(
        `Need ${
          winnerCount - stringSplitter(listPlayerString).length
        } more player`
      );
      return false;
    }
    return true;
  };

  const validationOfDoorPrizeList = () => {
    if (doorprize.length === 0) {
      toast.error("Please insert doorprize");
      return false;
    }

    const doorPrizeNumbers = parseInt(doorprize, 10);

    if (isNaN(doorPrizeNumbers)) {
      toast.error("Doorprize must be a number");
      return false;
    }

    return true;
  };

  const validationOfWinnerCount = () => {
    const winnerCountStr = winnerCount.toString();

    const winnerCountInt = parseInt(winnerCountStr, 10);

    if (isNaN(winnerCountInt) || winnerCountInt <= 0) {
      toast.error("Winner count must be a positive integer greater than 0");
      return false;
    }

    return true;
  };

  const handleSpinClicked = () => {
    console.log("> ini player string ", stringSplitter(listPlayerString));
    if (!validationOfPlayerList()) return;
    if (!validationOfDoorPrizeList()) return;
    if (!validationOfWinnerCount()) return;

    if (!isSpinClicked) {
      console.log("> spin clicked");
      setIsSpinClicked(true);
      pickTheWinners();
      setTimeout(() => {
        setIsSpinClicked(false);
      }, 6500);

      setTimeout(() => {
        setIsModalOpen(true);
      }, 5300);
    }
  };

  function stringSplitter(str) {
    if (str.length === 0) return [];
    return str.split("\n").filter((line) => line.trim() !== "");
  }

  function arrayJoiner(arr) {
    return arr.join("\n");
  }

  const pickTheWinners = () => {
    const newLog = { ...logWinner };
    const pickedPlayers = [];
    const listPlayerArray = stringSplitter(listPlayerString);
    let updatedListPlayer = [...listPlayerArray];

    for (let i = 0; i < winnerCount; i++) {
      const randomIndexPlayer = Math.floor(
        Math.random() * updatedListPlayer.length
      );
      const player = updatedListPlayer[randomIndexPlayer];
      pickedPlayers.push(player);

      // Check if the doorprize key exists in newLog, if not, initialize it
      if (!newLog[doorprize]) {
        newLog[doorprize] = []; // Initialize as an empty array if it doesn't exist
      }
      newLog[doorprize].push(player);
      updatedListPlayer.splice(randomIndexPlayer, 1);
    }

    setTempWinner(pickedPlayers);
    setLogWinner(newLog);
    setListPlayerString(arrayJoiner(updatedListPlayer));
    setTempDoorPrize(doorprize.toString());
  };

  function formatToRupiah(amount) {
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

    return formattedAmount.replace(/\s/g, "");
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-green-500 justify-center">
      {/* <iframe
        title="Background Music"
        width="400"
        height="400"
        src={`https://www.youtube.com/embed/BNCRIAE324o?autoplay=1&mute=0&loop=1&playlist=BNCRIAE324o`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        // style={{ display: "none" }}
      /> */}
      <audio src="https://www.youtube.com/watch?v=BNCRIAE324o" loop />
      <div className="relative flex flex-col items-center justify-center">
        <p
          className="text-white text-center font-bold text-3xl"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
        >
          3rd
        </p>
        <p
          className="text-white text-center font-bold text-3xl"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
        >
          Anniversary
        </p>
        <p
          className="text-white text-center font-bold text-3xl"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
        >
          PT. Mostrans Global Digilog
        </p>
        <div
          className="absolute z-[99999999] pointer-events-none w-96 h-96"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Lottie animationData={annivConfettiAnimation} play autoplay />
        </div>
      </div>

      {isModalOpen && (
        <div className="absolute inset-0 z-[99999999] pointer-events-none">
          <Lottie animationData={confettiAnimation} play loop />
        </div>
      )}

      <div className="flex max-lg:flex-col max-lg:justify-center max-lg:items-center">
        <div className="w-1/2 max-lg:w-full flex justify-center p-4 flex-col">
          <div
            className={`${
              !isSpinClicked ? "hover:cursor-pointer" : ""
            } w-full flex justify-center items-center`}
            onClick={handleSpinClicked}
          >
            <Lottie
              animationData={spinWheelAnimation}
              play={isSpinClicked}
              autoplay={false}
            />
          </div>
        </div>
        <div className="w-1/2 max-lg:w-full mt-2 mb-2 flex justify-center flex-col">
          {/* <p className="text-black mb-4 font-semibold text-xl mt-10">
            Fill the field!
          </p> */}
          <div className="w-[80%] max-lg:w-full flex flex-col gap-6 max-lg:items-center">
            <div className="max-lg:w-[50%]">
              <p className="text-white">Players name</p>
              <div className={`${isSpinClicked ? "blur-sm" : ""}`}>
                <Textarea
                  id="default-input"
                  type="text"
                  placeholder="Insert players name"
                  className="rounded-lg text-black"
                  value={listPlayerString}
                  onChange={(e) => setListPlayerString(e.target.value)}
                  required
                />
              </div>
              <p className="text-white">
                Total players: {stringSplitter(listPlayerString).length}
              </p>
            </div>

            <div className="max-lg:w-[50%]">
              <p className="text-white">Doorprize</p>
              <TextInput
                id="default-input"
                type="number"
                placeholder="Insert doorprize"
                value={doorprize}
                className="rounded-lg text-black"
                onChange={(e) => setDoorprize(e.target.value)}
                required
              />
            </div>

            <div className="max-lg:w-[50%]">
              <p className="text-white">Count of winner</p>
              <TextInput
                id="default-input"
                type="number"
                placeholder="Insert count of winner"
                className="rounded-lg text-black mb-10 bg-green-500"
                value={winnerCount}
                onChange={(e) => setWinnerCount(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" richColors />
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>
          <p className="text-xl text-black font-medium flex items-center gap-2">
            Congratulations, you won
            <p className="font-bold text-2xl">
              {formatToRupiah(tempDoorPrize)}
            </p>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            {tempWinner.map((winner, index) => {
              return <p className="text-black text-lg">• {winner}</p>;
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
