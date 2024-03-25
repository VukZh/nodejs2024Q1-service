CREATE TABLE users (
  id UUID PRIMARY KEY,
  login VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  version INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE artists (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  grammy BOOLEAN NOT NULL
);

CREATE TABLE tracks (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  artist_id UUID,
  album_id UUID,
  duration INTEGER NOT NULL
);

CREATE TABLE albums (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  artist_id UUID
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    artists TEXT[],
    albums TEXT[],
    tracks TEXT[]
);
