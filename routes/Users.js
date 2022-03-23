const {Router} = require('express')
const router = Router()
const CharacterController = require('../controllers/UserController')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', CharacterController.game)
router.post('/api/v1/record/', urlencodedParser, CharacterController.create)

module.exports = router