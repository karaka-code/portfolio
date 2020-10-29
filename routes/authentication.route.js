const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


// api/auth/register
router.post(
    '/register',
    [
        check('name', 'Incorrect name').isLength({min: 3, max: 20}),
        check('email', 'Incorrect email').isEmail()
    ],
    async (req, res) => {
        try {
            console.log('Body on registration', req.body)
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect fields"
                })
            }

            const {name, email, password} = req.body

            const candidate = await User.findOne({name, email})

            if (candidate) {
                return res.status(400).json({message: "User already exist"})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({name, email, password: hashedPassword})

            await user.save()

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.status(200).json({
                name: user.name,
                email: user.email,
                password,
                isAuthenticated: true,
                token,
                userId: user.id,
                message: "User created and logged in"
            })


        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
        }
    })

// api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter correct email').isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            console.log('Body on login', req.body)
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect fields"
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: "No user found"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: "Wrong password, try again"})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.status(200).json({
                name: user.name,
                email: user.email,
                password,
                isAuthenticated: true,
                token,
                userId: user.id,
                message: "User logged in"
            })

        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
        }

    }
)

// api/auth/update
router.put(
    '/update',
    async (req, res) => {
        try {
            const updatedUser = await User.updateOne({_id: req.body.id},
                {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        password: await bcrypt.hash(req.body.password, 12)
                    }
                })

            res.status(200).json({updatedUser, message: 'User updated'})


        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
            console.log(e)
        }

    }
)


module.exports = router