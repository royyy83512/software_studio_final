require('../../config.js');
const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL);

const schemaSql = `
    -- Extensions
    CREATE EXTENSION IF NOT EXISTS pg_trgm;

    -- Drop
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS activity;

    -- Create    
    CREATE TABLE users (
        user_id SERIAL PRIMARY KEY NOT NULL,
        nick_name text NOT NULL,
        country text NOT NULL,
        full_name text NOT NULL,
        birth_date bigint NOT NULL DEFAULT (extract(epoch from now())),
        created_at bigint NOT NULL DEFAULT (extract(epoch from now())),
        rating integer NOT NULL DEFAULT 5
    );

    CREATE TABLE activity (
        creator_id SERIAL PRIMARY KEY NOT NULL,
        title text NOT NULL,
        creator_nick_name text NOT NULL,
        body text NOT NULL,
        created_at bigint NOT NULL DEFAULT (extract(epoch from now())),
        done_at bigint NOT NULL DEFAULT (extract(epoch from now())),
        upVotes integer NOT NULL DEFAULT 0,
        dnVotes integer NOT NULL DEFAULT 0,
        heartVotes integer NOT NULL DEFAULT 0,
        smileVotes integer NOT NULL DEFAULT 0,
        angryVotes integer NOT NULL DEFAULT 0,
        cryVotes integer NOT NULL DEFAULT 0
    );
`;

const dataSql = `
    -- Populate dummy posts
    INSERT INTO activity (title, creator_nick_name, body, created_at)
    SELECT
        'Title' || i,
        'User' || i ,
        'I want to Play a game',
        round(extract(epoch from now()) + (i - 100) * 3600.0)
    FROM generate_series(1, 100) AS s(i);
        
    INSERT INTO users (nick_name, country, full_name, birth_date, created_at)
    SELECT
        'User' || i,
        'Taiwan',
        'Chen' || i,
        round(extract(epoch from now()) + (i - 1000) * 3600.0),
        round(extract(epoch from now()) + (i - 1000) * 3600.0)
    FROM generate_series(1, 1000) AS s(i);
`;

db.none(schemaSql).then(() => {
    console.log('Schema created');
    db.none(dataSql).then(() => {
        console.log('Data populated');
        pgp.end();
    });
}).catch(err => {
    console.log('Error creating schema', err);
});
