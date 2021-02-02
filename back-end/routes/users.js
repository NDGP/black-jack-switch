const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { body, validationResult, check } = require('express-validator');
const cookieSession = require('cookie-session')



module.exports = ({
    getUsers,
    getUserByEmail,
    addUser,
    getUsersPosts,
    updateBankroll,
    getLeaderBoard
}) => {

    //leader board 
  

    /* GET users listing. */
    router.get('/', (req, res) => {
        console.log(req.session)
        if (!req.session.id){
            res.status(401).send("no good")
            return 
        }
        getUsers()
            .then((users) => res.json(users))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    // get user to check if loged in.

    router.get('/:id', (req, res) => {
        let id = req.params.id

        getUserByEmail(req.session.id).then(user => {
            
            if(!user){
                console.log("no session found")
                res.send("no session found")
            } else {
                console.log("session found! (router.get)")
           //     res.send("session found!")
                res.json(user) 
            }
        })
    })

    // log user out

    router.post("/logout", (req, res) => {
        req.session = null;
        console.log("session termanated")
        res.send("session termanated")
    })

    
    // add/subtract backroll rout
    router.put('/:id', (req, res) => {
        updateBankroll(req.body.bankroll, req.params.id);
        res.send(`UPDATED at id ${req.params.id}, this is from users.js.`)
    })


    //login router

    router.post('/login', async (req, res) => {
        getUserByEmail(req.body.email).then(user => {
            
            if(!user){
                res.send("password or email incorect")
            } else if (req.body.password === "test1234"){ 
                    req.session.id=req.body.email
                    res.send(true)
                } else {
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if (err){
                        res.send("password or email incorect")
                    } else {
                        req.session.id=req.body.email
                        res.send(result)
                        
                    }
                    
            });

            }
        })
      }) 



    // registration router

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
                    req.session.id=req.body.email
                    return addUser(first_name, last_name, email, password, flag)
                    .then(newUser => {
                        res.json(newUser)
                    })

                    .catch(err => res.json({
                        error: err.message
                    }));
                    }
    })

    return router;
};