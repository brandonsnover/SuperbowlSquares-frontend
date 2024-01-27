export function Rules() {
  return (
    <div className="rules-container">
      <h1>Super Bowl Squares: How to Play</h1>

      <div className="rules-section">
        <h2>Objective</h2>
        <p>The main objective is to have fun and potentially win money based on the score of the football game.</p>
      </div>

      <div className="rules-section">
        <h2>Game Setup</h2>
        <ol>
          <li>Create a 10x10 grid, resulting in 100 squares.</li>
          <li>Players claim squares by writing their name in the squares of their choice.</li>
          <li>Once all squares are claimed, numbers 0-9 are randomly assigned to the columns and rows.</li>
        </ol>
      </div>

      <div className="rules-section">
        <h2>How to Play</h2>
        <p>
          Players win by having the square that corresponds to the last number of each team's score at the end of each
          quarter.
        </p>
      </div>

      <div className="rules-section">
        <h2>Winning the Game</h2>
        <ol>
          <li>Winners are typically determined at the end of each quarter.</li>
          <li>The score at the end of each quarter's numbers should match the player's square numbers.</li>
          <li>
            There can be multiple winners if the game goes into overtime or if the score doesn't change between
            quarters.
          </li>
        </ol>
      </div>

      <div className="rules-section">
        <h2>Tips and Strategies</h2>
        <p>
          While mostly a game of chance, some prefer choosing squares that align with common football scores (e.g.,
          numbers like 0, 3, 7).
        </p>
      </div>

      <div className="rules-section">
        <h2>Variations</h2>
        <ul>
          <li>Some pools choose to re-randomize numbers at each quarter for added excitement.</li>
          <li>
            Payouts can be divided differently, with some pools offering bigger payouts for halftime and final scores.
          </li>
        </ul>
      </div>
    </div>
  );
}
