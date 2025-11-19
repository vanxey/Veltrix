const express = require('express')
const router = express.Router()
const tradeController = require('../controllers/tradeController')

router.get('/session', tradeController.getSessions)
router.get('/trade_calendar', tradeController.getTradeCalendar)
router.get('/trade', tradeController.getTrades)
router.delete('/trade/:id', tradeController.deleteTrade)
router.post('/trades', tradeController.createTrade)

module.exports = router