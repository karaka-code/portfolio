const {Router} = require('express')
const router = Router()
const Contact = require('../models/Contact')


// api/contact/
router.post(
    '/',
    async (req, res) => {
        try {

            const {text, email} = req.body

            const f = new Contact({
                text, email
            })

            const savedC = await f.save()
            res.status(201).json(savedC)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'An error occurred'})
        }
    })


// api/contact/
// router.get(
//     '/',
//     async (req, res) => {
//         try {
//             const f = await Contact.find()
//             res.status(200).json(f)
//         } catch (e) {
//             res.status(500).json({message: 'An error occurred'})
//         }
//     })

module.exports = router