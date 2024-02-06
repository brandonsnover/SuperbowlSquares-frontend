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
  const [userSquareCounts, setUserSquareCounts] = useState([]);
  const [openSquareCount, setOpenSquareCount] = useState(0);
  const [showWinnersTable, setShowWinnersTable] = useState(false);

  useEffect(() => {
    props.onIndexSquares(pageparams.id);

    // Check the current date and time
    const currentTime = new Date();
    const targetTime = new Date("2024-02-11T18:30:00");
    // February 11, 2024, 6:30 PM

    if (currentTime > targetTime) {
      setShowNumbersColumn(true);
    }
  }, []);

  // checks current time and if its 4ish hours after kickoff, scores table shows
  useEffect(() => {
    props.onIndexSquares(pageparams.id);

    // Check the current date and time
    const currentTime = new Date();
    const gameEndTime = new Date("2024-02-11T22:30:00");
    // February 11, 2024, 10:30 PM

    if (currentTime > gameEndTime) {
      setShowWinnersTable(true);
    }
  }, []);

  // Function to determine if the current time is past the deadline
  const isPastDeadline = () => {
    // Adjust timezone as necessary for Eastern Time
    // Note: This simplistic approach does not account for daylight saving changes.
    const deadline = new Date("2024-02-11T18:30:00-05:00");
    // 'YYYY-MM-DDTHH:MM:SS-05:00' for Eastern Time
    const now = new Date();
    return now > deadline;
  };

  const handleUpdateSquare = (item) => {
    if (isPastDeadline()) {
      console.log("Square selections are now closed.");
      alert("Square selections are now closed.");
      return;
      // Exit the function to prevent further action
    }

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

  // const winningRow = 0;
  // const winningColumn = 0;

  // const lastDigitOfWinningColumn = winningColumn.toString().slice(-1);
  // const lastDigitOfWinningRow = winningRow.toString().slice(-1);

  // const colIndex = numbersColumn.indexOf(lastDigitOfWinningColumn);
  // const rowIndex = numbersRow.indexOf(lastDigitOfWinningRow);

  // const winningSquare = colIndex * 10 + rowIndex;

  // const objectWithLocation = sortedSquares.find((obj) => obj.location === winningSquare);

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

  // create table of square owners
  useEffect(() => {
    let totalOwnedSquares = 0;

    const counts = props.squares.reduce((acc, square) => {
      if (square.user_id && square.user_id.id !== 1) {
        const { id, username } = square.user_id;
        if (!acc[id]) {
          acc[id] = { username, count: 0 };
        }
        acc[id].count += 1;
        totalOwnedSquares += 1;
      }
      return acc;
    }, {});

    const sortedCounts = Object.values(counts).sort((a, b) => b.count - a.count);
    setUserSquareCounts(sortedCounts);
    setOpenSquareCount(100 - totalOwnedSquares);
    // Subtract from total squares (100)
  }, [props.squares]);

  //Updating points squares
  const fetchAndSaveScores = async () => {
    // Fetch scores from the API
    const options = {
      method: "GET",
      url: "https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLBoxScore",
      params: { gameID: "20240211_SF@KC" },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_APP_NFL_TANK01_API_KEY,
        "X-RapidAPI-Host": "tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      // Check if the game hasn't started yet based on the API response
      if (
        response.data.body &&
        response.data.body.error &&
        response.data.body.error.includes("Game hasn't started yet")
      ) {
        console.log("Game hasn't started yet. It will start at 6:30 PM (ET).");
        return;
        // Exit the function early if the game hasn't started
      }
      const lineScores = response.data.body.lineScore;
      // Assume response structure is as described and contains lineScore for home and away

      // Map lineScores to your rails expected format
      const scoresToUpdate = [
        { id: 1, points: lineScores.home.Q1 || "0" },
        { id: 2, points: lineScores.home.Q2 || "0" },
        { id: 3, points: lineScores.home.Q3 || "0" },
        { id: 4, points: lineScores.home.Q4 || "0" },
        { id: 5, points: lineScores.away.Q1 || "0" },
        { id: 6, points: lineScores.away.Q2 || "0" },
        { id: 7, points: lineScores.away.Q3 || "0" },
        { id: 8, points: lineScores.away.Q4 || "0" },
      ];

      // Update scores in the backend
      scoresToUpdate.forEach((score) => {
        axios
          .patch(`http://localhost:3000/scores/${score.id}.json`, { points: score.points })
          .then((response) => console.log(`Updated score ID ${score.id}`, response.data))
          .catch((error) => console.error(`Error updating score ID ${score.id}`, error));
      });
    } catch (error) {
      console.error("Error fetching scores from API", error);
    }
  };

  //sets tank01 api request to be made on feb 11 6:30 every 20 minutes for 5 hours
  useEffect(() => {
    const now = new Date();
    const startDateTime = new Date("2024-02-11T18:30:00-05:00");
    // 'YYYY-MM-DDTHH:MM:SS-05:00' for Eastern Time
    if (now > startDateTime) {
      // If it's past the start time, adjust the year for the next occurrence
      startDateTime.setFullYear(now.getFullYear() + 1);
    }
    const delayUntilStart = startDateTime - now;

    const fetchInterval = 20 * 60 * 1000;
    // 20 minutes in milliseconds
    const duration = 5 * 60 * 60 * 1000;
    // 5 hours in milliseconds
    let intervalId;

    setTimeout(() => {
      fetchAndSaveScores();
      // Initial fetch
      intervalId = setInterval(fetchAndSaveScores, fetchInterval);

      // Stop the interval after 5 hours
      setTimeout(() => {
        clearInterval(intervalId);
      }, duration);
    }, delayUntilStart);

    // Cleanup on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const [homeScore, setHomeScore] = useState({ Q1: 0, Q2: 0, Q3: 0, Q4: 0, totalPts: 0 });
  const [awayScore, setAwayScore] = useState({ Q1: 0, Q2: 0, Q3: 0, Q4: 0, totalPts: 0 });

  //updates scores table if possible
  useEffect(() => {
    axios
      .get("http://localhost:3000/scores.json")
      .then((response) => {
        const scores = response.data;
        // Assuming scores is an array with a specific order
        // and the first 4 are home Q1 to Q4 and the next 4 are away Q1 to Q4
        setHomeScore({
          Q1: scores[0]?.points || 0,
          Q2: scores[1]?.points || 0,
          Q3: scores[2]?.points || 0,
          Q4: scores[3]?.points || 0,
          totalPts: scores.slice(0, 4).reduce((acc, curr) => acc + (curr?.points || 0), 0),
        });
        setAwayScore({
          Q1: scores[4]?.points || 0,
          Q2: scores[5]?.points || 0,
          Q3: scores[6]?.points || 0,
          Q4: scores[7]?.points || 0,
          totalPts: scores.slice(4, 8).reduce((acc, curr) => acc + (curr?.points || 0), 0),
        });
      })
      .catch((error) => {
        console.error("Error fetching scores", error);
      });
  }, []);

  //new logic for winning squares
  const [winningSquare1, setWinningSquare1] = useState(null);

  useEffect(() => {
    const calculateWinningSquare = () => {
      const lastDigitOfWinningRow = homeScore.Q1.toString().slice(-1);
      const lastDigitOfWinningColumn = awayScore.Q1.toString().slice(-1);

      const colIndex = numbersColumn.indexOf(lastDigitOfWinningColumn);
      const rowIndex = numbersRow.indexOf(lastDigitOfWinningRow);

      const winningLocation = colIndex * 10 + rowIndex;
      // Adjust this calculation as necessary.
      const foundSquare = sortedSquares.find((obj) => obj.location === winningLocation);

      setWinningSquare1(foundSquare);
    };

    if (homeScore && awayScore) {
      calculateWinningSquare();
    }
  }, [homeScore, awayScore, numbersColumn, numbersRow, sortedSquares]);

  const [winningSquare2, setWinningSquare2] = useState(null);

  useEffect(() => {
    const calculateWinningSquare = () => {
      const lastDigitOfWinningRow = homeScore.Q2.toString().slice(-1);
      const lastDigitOfWinningColumn = awayScore.Q2.toString().slice(-1);

      const colIndex = numbersColumn.indexOf(lastDigitOfWinningColumn);
      const rowIndex = numbersRow.indexOf(lastDigitOfWinningRow);

      const winningLocation = colIndex * 10 + rowIndex;
      // Adjust this calculation as necessary.
      const foundSquare = sortedSquares.find((obj) => obj.location === winningLocation);

      setWinningSquare2(foundSquare);
    };

    if (homeScore && awayScore) {
      calculateWinningSquare();
    }
  }, [homeScore, awayScore, numbersColumn, numbersRow, sortedSquares]);

  const [winningSquare3, setWinningSquare3] = useState(null);

  useEffect(() => {
    const calculateWinningSquare = () => {
      const lastDigitOfWinningRow = homeScore.Q3.toString().slice(-1);
      const lastDigitOfWinningColumn = awayScore.Q3.toString().slice(-1);

      const colIndex = numbersColumn.indexOf(lastDigitOfWinningColumn);
      const rowIndex = numbersRow.indexOf(lastDigitOfWinningRow);

      const winningLocation = colIndex * 10 + rowIndex;
      // Adjust this calculation as necessary.
      const foundSquare = sortedSquares.find((obj) => obj.location === winningLocation);

      setWinningSquare3(foundSquare);
    };

    if (homeScore && awayScore) {
      calculateWinningSquare();
    }
  }, [homeScore, awayScore, numbersColumn, numbersRow, sortedSquares]);

  const [winningSquare4, setWinningSquare4] = useState(null);

  useEffect(() => {
    const calculateWinningSquare = () => {
      const lastDigitOfWinningRow = homeScore.totalPts.toString().slice(-1);
      const lastDigitOfWinningColumn = awayScore.totalPts.toString().slice(-1);

      const colIndex = numbersColumn.indexOf(lastDigitOfWinningColumn);
      const rowIndex = numbersRow.indexOf(lastDigitOfWinningRow);

      const winningLocation = colIndex * 10 + rowIndex;
      // Adjust this calculation as necessary.
      const foundSquare = sortedSquares.find((obj) => obj.location === winningLocation);

      setWinningSquare4(foundSquare);
    };

    if (homeScore && awayScore) {
      calculateWinningSquare();
    }
  }, [homeScore, awayScore, numbersColumn, numbersRow, sortedSquares]);

  return (
    <div className="grid-padding">
      <h1 className="centered">{gridInfo.name}</h1>
      <h4 className="centered">invite code: {gridInfo.code}</h4>
      <div className="tables-container">
        <div className="squares-table">
          Square Count
          {/* Table showing number of squares owned by each user */}
          <table className="table-margins">
            <thead></thead>
            <tbody>
              {userSquareCounts.map(({ username, count }) => (
                <tr key={username}>
                  <td>{username}</td>
                  <td>{count}</td>
                </tr>
              ))}
              {/* Row for open squares */}
            </tbody>
          </table>
          {openSquareCount} Open Squares
        </div>
        {showNumbersColumn ? (
          <div className="scores-table">
            Scores
            <table className="table-margins">
              <thead>
                <tr>
                  <th></th>
                  <th> Q1 </th>
                  <th>Q2</th>
                  <th>Q3</th>
                  <th>Q4</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Home</td>
                  <td>{homeScore.Q1}</td>
                  <td>{homeScore.Q2}</td>
                  <td>{homeScore.Q3}</td>
                  <td>{homeScore.Q4}</td>
                  <td>{homeScore.totalPts}</td>
                </tr>
                <tr>
                  <td>Away</td>
                  <td>{awayScore.Q1}</td>
                  <td>{awayScore.Q2}</td>
                  <td>{awayScore.Q3}</td>
                  <td>{awayScore.Q4}</td>
                  <td>{awayScore.totalPts}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h4 className="game-start">Square choices lock at 6:30pm ET</h4>{" "}
          </div>
        )}
      </div>
      <h2 className="centered">
        {showWinnersTable ? (
          winningSquare4 ? (
            <div>
              <p>1st Quarter Winner is: {winningSquare1.user_id.username}</p>
              <p>2st Quarter Winner is: {winningSquare2.user_id.username}</p>
              <p>3rd Quarter Winner is: {winningSquare3.user_id.username}</p>
              <p>Final Winner is: {winningSquare4.user_id.username}</p>
            </div>
          ) : (
            <p>No winner data available</p>
          )
        ) : null}{" "}
      </h2>
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
                  {!isPastDeadline() && userid == item.user_id.id ? (
                    <button onClick={() => handleClick(item)}>Remove Name</button>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
