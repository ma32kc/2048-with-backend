const User = require ('../models/user')

class UserController {

    // async filter(req, res) {
    //     sex =  req.body.sex
    //     res.render('index', {
    //         title: 'Игра'
    //     })
    // }

    async game (req, res) {
        res.render ('index')
    }

    async create (req, res) {
        const {time, username} = req.body
        await User.create ({time, username})
        const users = await User.find().sort({"time":1}).lean()
        res.render ('leaderboard', {
            users
        })
        // try {
        //     const {time, username} = req.body
        //     const user = await User.create ({time, username})
        //     res.json (user)
        // } catch (e) {
        //     res.json (e)
        // }
    }

    // async getAll (req, res) {
    //     try {
    //         const users = await users.find ()
    //         return res.json (users)
    //     } catch (e) {
    //         res.status (500).json (e)
    //     }
    //
    // }
}

module.exports = new UserController ()