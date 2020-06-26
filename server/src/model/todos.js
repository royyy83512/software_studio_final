if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

// function listTodos(searchText = '', start, unaccomplishedOnly = false) {
//     const where = [];
//     if (searchText)
//         where.push(`text ILIKE '%$1:value%'`);
//     if (start)
//         where.push('id < $2');
//     if (unaccomplishedOnly) 
//         where.push(`"doneTs" IS NULL`);
        
//     const sql = `
//         SELECT *
//         FROM todos
//         ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
//         ORDER BY id DESC
//         LIMIT 10
//     `;
//     return db.any(sql, [searchText, start]);
// }

function createTodo(email, pass) {
    console.log("Hello From Model.todos: createTodo");
    const sql = `
        INSERT INTO users ($<this:name>)
        VALUES ($<email>, $<pass>)
        RETURNING *
    `;
    return db.one(sql, {email, pass});
}

// function accomplishTodo(id){
//     const sql = `
//         UPDATE todos
//         SET "doneTs" = extract(epoch from now())
//         WHERE id = $1
//         RETURNING *
//     `;
//     return db.one(sql, [id]);
// }

module.exports = {
    // listTodos,
    createTodo
    // accomplishTodo,
};