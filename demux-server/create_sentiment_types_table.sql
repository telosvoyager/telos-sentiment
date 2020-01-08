CREATE TABLE ${schema~}.sentiment_types (
  sent_id SERIAL PRIMARY KEY,
  sent_name VARCHAR (50) UNIQUE NOT NULL
);
