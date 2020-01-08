CREATE TABLE ${schema~}.sentiment_events (
  event_id SERIAL PRIMARY KEY,
  sent_id INTEGER NOT NULL REFERENCES sentiment_types(sent_id),
  sender VARCHAR(12) NOT NULL,
  recipient VARCHAR(12) NOT NULL,
  amount INTEGER  NOT NULL
);
