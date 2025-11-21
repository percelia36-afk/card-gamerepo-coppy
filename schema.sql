-- building week12 card game db
-- users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  clerk_id TEXT,
  gamer_tag VARCHAR(30),
  user_profile TEXT,
  image_url TEXT

-- winners table - changed
--CREATE TABLE IF NOT EXISTS winners (
--  id INT PRIMARY KEY GENERATED ALWAYS AS identity,
--  user_id INT REFERENCES users(id),
--  wins INT,
--  played INT
-- );

CREATE TABLE IF NOT EXISTS posts (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP,
    imgurl TEXT,
    imginfo TEXT   
);

CREATE TABLE IF NOT EXISTS comments (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    post_id INT REFERENCES posts(id),
    user_id INT REFERENCES users(id),
    comment TEXT
);