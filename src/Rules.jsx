/* eslint-disable react/no-unescaped-entities */
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
          <li>The board is a 10 x 10 grid, resulting in 100 squares.</li>
          <li>Once the game kicks off on February 11th, numbers 0-9 are randomly assigned to the columns and rows.</li>
          <li>The numbers correspond to the last digit of the score of each team.</li>
          <li>
            The home team score goes across the top vertically and the away team score goes down the side horizontally.
          </li>
        </ol>
      </div>

      <div className="rules-section">
        <h2>Winning the Game</h2>
        <ul>
          <li>Winners are typically determined at the end of each quarter.</li>
          <li>The score at the end of each quarter's numbers should match the player's square numbers.</li>
          <li>
            There can be multiple winners if the game goes into overtime or if the score doesn't change between
            quarters.
          </li>
        </ul>
      </div>

      <div className="rules-section">
        <h2>Variations</h2>
        <ul>
          <li>
            Payouts can be divided differently, with some pools offering bigger payouts for halftime and final scores.
          </li>
        </ul>
      </div>
    </div>
  );
}
