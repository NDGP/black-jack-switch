const bcrypt = require('bcrypt');
const saltRounds = 10;

const bcryptPrommis = (password, saltRounds) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                reject(err)
            } else {
                resolve(hash)
            }
        })

    })
}

module.exports = (db) => {
    const getUsers = () => {
        const query = {
            text: 'SELECT * FROM users',
        };

        return db
            .query(query)
            .then((result) => result.rows)
    };

    const getUserByEmail = email => {

        const query = {
            text: `SELECT * FROM users WHERE email = $1`,
            values: [email]
        }
        // luigi@nintendo.com
        return db
            .query(query)
            .then(result => result.rows[0])

    }
    const updateBankroll = (amount, id) => {
        const query = {
            text: `UPDATE users SET bankroll = $1 WHERE id = $2`,
            values: [amount, id]
        }
        // i dont know if i need this
        return db
            .query(query)
            .then(result => result.rows[0])
    }

    // Store hash in your password DB.
    const addUser = (firstName, lastName, email, password, flag) => {

        return bcryptPrommis(password, saltRounds).then((hash) => {
            const query = {
                text: `INSERT INTO users (first_name, last_name, email, password, flag) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                values: [firstName, lastName, email, hash, flag]
            }

            return db.query(query)
                .then(result => result.rows[0])
        });
    }

    const getUsersPosts = () => {
        const query = {
            text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
        FROM users
        INNER JOIN posts
        ON users.id = posts.user_id`
        }

        return db.query(query)
            .then(result => result.rows)

    }

    //CARD QUERIES

    const getCards = (card) => {
        const query = {
            text: `SELECT * FROM cards;`
        }

        return db.query(query)
            .then(result => result.rows)
    }

    const getCard = (name) => {
        const query = {
            text: `SELECT * FROM cards WHERE name = $1;`,
            values: [name]
        }

        return db.query(query)
            .then(result => result.rows)
    }

    const getStats = () => {
        const query = {
            text: `select first_name, last_name,  thp as total_hands_played,  wp as win_percentage,  bj as blackjacks  from users order by thp desc;`
        }
        return db.query(query)
        .then(result => result.rows)
    }


    return {
        getUsers,
        getUserByEmail,
        addUser,
        getUsersPosts,
        getCards,
        getCard,
        updateBankroll,
        getStats
    };
};

