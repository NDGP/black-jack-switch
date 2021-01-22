const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { body, validationResult, check } = require('express-validator');
const { getPostsByUsers } = require('../../client/src/helpers/dataHelpers');


module.exports = ({
    getUsers,
    getUserByEmail,
    addUser,
    getUsersPosts
}) => {
    /* GET users listing. */
    router.get('/', (req, res) => {
        getUsers()
            .then((users) => res.json(users))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.get('/posts', (req, res) => {
        getUsersPosts()
            .then((usersPosts) => {
                const formattedPosts = getPostsByUsers(usersPosts);
                res.json(formattedPosts);
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.post(
        '/', 
        check("first_name")
            .notEmpty()
            .withMessage('Must add first name')
            .trim()
            .unescape(),
        check("last_name")
            .notEmpty()
            .withMessage('Must add last name')
            .trim()
            .unescape(),
        check("email")
            .trim()
            .unescape()
            .isEmail()
            .withMessage('Must be valid email')
            .normalizeEmail(),
        check('email').custom(value => {
            return getUserByEmail(value).then(user => {
                if (user) {
                    return Promise.reject('E-mail already in use');
                }
            });
        }),
        check("password")
        .unescape()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),


        check('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Password confirmation does not match password');
            }
        
            // Indicates the success of this synchronous custom validator
            return true;
          }),

        
        (req, res) => {

            console.log(req.body)

            const {
                first_name,
                last_name,
                email,
                password,
                flag
            } = req.body;
            
            const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    console.log("this is the error" ,errors.array());
                    return res.status(299).json({ errors: errors.array()});
                } else {
                    return addUser(first_name, last_name, email, password, flag)
                    .then(newUser => res.json(newUser))

                    .catch(err => res.json({
                        error: err.message
                    }));
                    }
    })

    return router;
};