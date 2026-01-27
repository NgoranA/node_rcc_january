import { DatabaseSync } from "node:sqlite"

const database = new DatabaseSync(":memory:");

database.exec(`
CREATE TABLE bicycles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand TEXT NOT NULL,
  color TEXT NOT NULL
  ) STRICT
`)

database.exec(`
INSERT INTO bicycles (brand, color) VALUES
  ('Trek', 'Red'),
  ('Giant', 'Blue'),
  ('Specialized', 'Green')
`)


export default database

