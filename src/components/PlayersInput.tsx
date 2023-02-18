import  { useEffect, useState } from "react";
import '../assets/styles/matchSettings.css'
type propsType = {
  teamPlayers: string[];
  playing11:(arg:string[])=>void
};
const PlayersInput = ({ teamPlayers,playing11 }: propsType) => {
  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");
  const [player3, setPlayer3] = useState<string>("");
  const [player4, setPlayer4] = useState<string>("");
  const [player5, setPlayer5] = useState<string>("");
  const [player6, setPlayer6] = useState<string>("");
  const [player7, setPlayer7] = useState<string>("");
  const [player8, setPlayer8] = useState<string>("");
  const [player9, setPlayer9] = useState<string>("");
  const [player10, setPlayer10] = useState<string>("");
  const [player11, setPlayer11] = useState<string>("");
  const list = [
    player1,
    player2,
    player3,
    player4,
    player5,
    player6,
    player7,
    player8,
    player9,
    player10,
    player11
  ];
  
  useEffect(()=>{playing11(list)},[player1,player2,player3,player4,player5,player6,player7,player8,player9,player10,player11])
  const optionList = teamPlayers.filter((player) => !list.includes(player));
  return (
    < div className="d-flex justify-content-center flex-column">
      <div className="d-inline-flex ">
        <input
          placeholder="Player 1"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          className="playerInput text-capitalize "
        />
        {
          <select
            className="dropdownList  mb-3 text-capitalize"
            value={player1}
            onChange={(e) => {
              setPlayer1(e.target.value);
            }}
          >
            <option >Select Player </option>
            {optionList.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        }
      </div>
      <div>
        <input
          placeholder="Player 2"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          className="playerInput text-capitalize"
        />
        {
          <select
            className="dropdownList  mb-3 text-capitalize"
            value={player2}
            onChange={(e) => {
              setPlayer2(e.target.value);
            }}
          >
            <option>Select Player </option>
            {optionList.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        }
      </div>
      <div>
        <input
          placeholder="Player 3"
          value={player3}
          onChange={(e) => setPlayer3(e.target.value)}
          className="playerInput text-capitalize"
        />
        {
          <select
            className="dropdownList  mb-3 text-capitalize"
            value={player3}
            onChange={(e) => {
              setPlayer3(e.target.value);
            }}
          >
            <option>Select Player</option>
            {optionList.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        }
      </div>
      <div>
        <input
          placeholder="Player 4"
          value={player4}
          onChange={(e) => setPlayer4(e.target.value)}
          className="playerInput text-capitalize"
        />
        {
          <select
            className="dropdownList  mb-3 text-capitalize"
            value={player4}
            onChange={(e) => {
              setPlayer4(e.target.value);
            }}
          >
            <option>Select Player</option>
            {optionList.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        }
      </div>
      <div>
        <input
          placeholder="Player 5"
          value={player5}
          onChange={(e) => setPlayer5(e.target.value)}
          className="playerInput text-capitalize"
        />
        {
          <select
            className="dropdownList  mb-3 text-capitalize"
            value={player5}
            onChange={(e) => {
              setPlayer5(e.target.value);
            }}
          >
            <option>Select Player</option>
            {optionList.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        }
      </div>
      <div>
        <input
          placeholder="Player 6"
          value={player6}
          onChange={(e) => setPlayer6(e.target.value)}
          className="playerInput text-capitalize"
        />
        {
          <select
            className="dropdownList  mb-3 text-capitalize"
            value={player6}
            onChange={(e) => {
              setPlayer6(e.target.value);
            }}
          >
            <option>Select Player</option>
            {optionList.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        }
      </div>
      <div>
        <input
          placeholder="Player 7"
          value={player7}
          onChange={(e) => setPlayer7(e.target.value)}
          className="playerInput text-capitalize"
        />
        {
          <select
            className="dropdownList  mb-3 text-capitalize"
            value={player7}
            onChange={(e) => {
              setPlayer7(e.target.value);
            }}
          >
            <option>Select Player</option>
            {optionList.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        }
      </div>
      <div>
        <input
          placeholder="Player 8"
          value={player8}
          onChange={(e) => setPlayer8(e.target.value)}
          className="playerInput text-capitalize"
        />
        {
          <select
            className="dropdownList  mb-3 text-capitalize"
            value={player8}
            onChange={(e) => {
              setPlayer8(e.target.value);
            }}
          >
            <option>Select Player</option>
            {optionList.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        }
      </div>
      <div>
        <input
          placeholder="Player 9"
          value={player9}
          onChange={(e) => setPlayer9(e.target.value)}
          className="playerInput text-capitalize"
        />
        {
          <select
            className="dropdownList  mb-3 text-capitalize"
            value={player9}
            onChange={(e) => {
              setPlayer9(e.target.value);
            }}
          >
            <option>Select Player</option>
            {optionList.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        }
      </div>
      <div>
        <input
          placeholder="Player 10"
          value={player10}
          onChange={(e) => setPlayer10(e.target.value)}
          className="playerInput text-capitalize"
        />
        {
          <select
            className="dropdownList  mb-3 text-capitalize"
            value={player10}
            onChange={(e) => {
              setPlayer10(e.target.value);
            }}
          >
            <option>Select Player</option>
            {optionList.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        }
      </div>
      <div>
        <input
          placeholder="Player 11"
          value={player11}
          onChange={(e) => setPlayer11(e.target.value)}
          className="playerInput text-capitalize"
        />
        {
          <select
            className="dropdownList  mb-3 text-capitalize"
            value={player11}
            onChange={(e) => {
              setPlayer11(e.target.value);
            }}
          >
            <option>Select Player</option>
            {optionList.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        }
      </div>
    </div>
  );
};

export default PlayersInput;
