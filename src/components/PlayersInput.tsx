import { useCallback, useEffect, useState } from "react";
import { getPlayers } from "../api/match";
import '../assets/styles/match.css'
import { Player } from "../models/Player";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import getPlayersDetails from "../action/MatchInfo/playersDetails";
type PropsType = {
  teamId: string,
  setTeamPlayers: any,
  isTeamOne:any
}
interface SelectedPlayer {
  id: string,
  name: string
}
const PlayersInput = ({ teamId, setTeamPlayers,isTeamOne }: PropsType) => {

  const [list, setList] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);
  const [removeId, setRemoveId] = useState<string>('');
  const dispatch = useDispatch<any>();

  const handleChange = (e: any) => {
    const { value, checked } = e.target;
    let player = list.find((player) => player.id === value)
    let playerObj: SelectedPlayer = {
      id: player?.id || '',
      name: player?.name || ''
    }
    if (checked && !selectedPlayers.find((player) => player.id === value)) {
      setSelectedPlayers([...selectedPlayers, playerObj])
    } else {
      setSelectedPlayers(selectedPlayers.filter((player) => player.id !== value))
    }
  }

  const handleRemove = useCallback(() => {
      setSelectedPlayers(selectedPlayers.filter((player) => player.id !== removeId))
      setRemoveId('')
      let checkBox = document.getElementById(removeId) as HTMLInputElement
      checkBox.checked = false
    }, [removeId, selectedPlayers])

  // useEffect(() => {
  //   getPlayers(teamId)
  //     .then((res) => {
  //       setList(res.data)
  //     })
  // }, [teamId])

  useEffect(()=>{
    const getData = async() =>{
      await dispatch(getPlayersDetails(teamId,isTeamOne)).then((res:any)=>{
        // console.log("Players ",res.data)
        setList(res.data);
      });
    }
    getData()
  },[])
  useEffect(() => {
    if (removeId) {
      handleRemove()
    }
  }, [removeId, handleRemove])

  useEffect(() => {
    if (selectedPlayers.length === 8) {
      setTeamPlayers(selectedPlayers)
    }
  }, [selectedPlayers.length])
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="select-players" className="bg-info-subtle text-white px-5">
              Select Players
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {list.map((player, index) => {
                return (
                  <div className="d-flex p-2" key={index}>
                    <input type="checkbox" name="player" id={player.id} value={player.id} onChange={handleChange} className='select-player px-2 py-1 fs-4' />
                    <label htmlFor="player" className="fs-5 fw-bold px-2 py-1">{player.name}</label>
                  </div>
                )
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <ul>
          {selectedPlayers.map((player, index) => {
            return (
              <li key={index} className="d-flex player-list bg-white fs-4 fw-bold my-2" >
                <span className="mx-2" onClick={() => setRemoveId(player.id)}>x</span>
                {player.name}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
};

export default PlayersInput;