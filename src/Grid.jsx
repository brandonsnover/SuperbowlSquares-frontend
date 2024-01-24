/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function Grid(props) {
  const pageparams = useParams();
  const userid = localStorage.getItem("user_id");
  const [gridInfo, setGridInfo] = useState({});
  const [numbersColumn, setNumbersColumn] = useState([]);
  const [numbersRow, setNumbersRow] = useState([]);
  const [showNumbersColumn, setShowNumbersColumn] = useState(false);
  const sortedSquares = [...props.squares].sort((a, b) => a.id - b.id);

  useEffect(() => {
    props.onIndexSquares(pageparams.id);

    // Check the current date and time
    const currentTime = new Date();
    const targetTime = new Date("2024-02-11T18:30:00"); // February 11, 2024, 6:30 PM

    if (currentTime > targetTime) {
      setShowNumbersColumn(true);
    }
  }, []);

  const handleUpdateSquare = (item) => {
    console.log("update square", item.id);
    axios
      .patch(`http://localhost:3000/squares/${item.id}.json`, {
        user_id: userid,
      })
      .then((response) => {
        console.log(response);
        props.onIndexSquares(pageparams.id);
      })
      .catch((error) => {
        console.error("error changng square", error);
      });
  };

  const handleClick = (item) => {
    axios
      .delete(`http://localhost:3000/squares/${item.id}.json`)
      .then((response) => {
        console.log(response);
        props.onIndexSquares(pageparams.id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGridInfo = (id) => {
    axios.get(`http://localhost:3000/grids/${id}.json`).then((response) => {
      setGridInfo(response.data);
      setNumbersColumn(response.data.columns_digit.toString().split(""));
      let numbers = response.data.rows_digit.toString().split("");
      numbers.unshift("");
      setNumbersRow(numbers);
    });
  };

  const winningRow = 0;
  const winningColumn = 0;

  const lastDigitOfWinningColumn = winningColumn.toString().slice(-1);
  const lastDigitOfWinningRow = winningRow.toString().slice(-1);

  const colIndex = numbersColumn.indexOf(lastDigitOfWinningColumn);
  const rowIndex = numbersRow.indexOf(lastDigitOfWinningRow);

  const winningSquare = colIndex * 10 + rowIndex;

  const objectWithLocation = sortedSquares.find((obj) => obj.location === winningSquare);

  useEffect(() => {
    handleGridInfo(pageparams.id);
  }, []);

  useEffect(() => {
    props.onIndexSquares(pageparams.id);
  }, []);

  for (let i = 0; i < sortedSquares.length; i += 11) {
    sortedSquares.splice(i, 0, { id: 9999 + i, location: i / 11, user_id: 1, grid_id: parseInt(pageparams.id) });
  }
  console.log(sortedSquares);
  return (
    <div className="grid-padding">
      <h1>{gridInfo.name}</h1>
      <h3>{gridInfo.code}</h3>
      {showNumbersColumn ? <p>Winner is: {objectWithLocation.user_id.username}</p> : <></>}
      <div>
        <div className="grid-container">
          {numbersRow.map((number) => (
            <div key={number}>
              {showNumbersColumn ? <p className="grid-item">{number}</p> : <p className="grid-item"></p>}
            </div>
          ))}
        </div>
        <div className="grid-container">
          {sortedSquares.map((item, index) => (
            <div key={item.id} className="grid-item">
              {index % 11 === 0 ? (
                showNumbersColumn ? (
                  <p> {numbersColumn[index / 11]}</p>
                ) : (
                  <> </>
                )
              ) : (
                <>
                  <button onClick={() => handleUpdateSquare(item)}>{item.location}</button>
                  <p>{item.user_id && item.user_id.username}</p>
                  {userid == item.user_id.id ? <button onClick={() => handleClick(item)}>Remove Name</button> : <></>}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
