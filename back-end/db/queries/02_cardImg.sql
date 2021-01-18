db.query(`SELECT img FROM cards
WHERE name = $1;
`, [name])


