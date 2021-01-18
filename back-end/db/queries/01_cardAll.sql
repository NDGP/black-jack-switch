db.query(`SELECT * FROM cards
WHERE name = $1;
`, [name])


