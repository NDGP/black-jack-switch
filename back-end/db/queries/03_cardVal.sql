db.query(`SELECT value FROM cards
WHERE name = $1;
`, [name])

