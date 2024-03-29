CREATE EXTENSION pg_trgm;

CREATE TABLE IF NOT EXISTS theatre (
	index SERIAL,
	id TEXT PRIMARY KEY NOT NULL UNIQUE,
	name TEXT NOT NULL,
	category TEXT NOT NULL,
	type TEXT NOT NULL,
	src TEXT NOT NULL,
	plays INTEGER NOT NULL,
	controls TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS trgm_idx ON theatre USING GIST (name gist_trgm_ops);

CREATE TABLE IF NOT EXISTS compat (
	host TEXT PRIMARY KEY NOT NULL UNIQUE,
	proxy TEXT NOT NULL
);
