CREATE TABLE ${schema~}.telos_chess (
  id SERIAL PRIMARY KEY,
  player1 VARCHAR(12) NOT NULL,
  player2 VARCHAR(12) NOT NULL,
  winner VARCHAR(12) NULL,
  tx_hash VARCHAR(64) NOT NULL
);
