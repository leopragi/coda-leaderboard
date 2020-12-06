
const express = require('express')
const team = express.Router()
const Team = require('../models/team')
const {MODE, SEARCH} = require('../client/src/utils/enums')

function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}

team.get('/', async(req, res) => {
    const {limit = 20, page} = req.query
    const skipped = limit * page;
    return res.send({
        teams: await Team.find({}).sort({ score: 'desc' }).skip(skipped + 3).limit(Number(limit)),
        podium: await Team.find({}).sort({score: 'desc'}).limit(3)
    })
})

team.post('/', async(req, res) => {
    const team_name = req.body.teamName;
    const team = await Team.create({
        team_name
    })
    return res.send({ team })
})

team.get('/sort/:mode', async(req, res) => {
    const sort = req.params.mode;
    const field = sort == SEARCH.NAME ? 'team_name' : 'score';
    const order = sort == SEARCH.NAME ? 'asc': 'desc'
    return res.send({
        teams: await Team.find({}).sort({ [field]: order }),
    })
})

team.get('/search', async(req, res) => {
    const query = req.query.q;
    const conditions = [{
        team_name: { 
            $regex: `.*${query}.*`,
            $options: 'i'
        }
    }]
    if(isNormalInteger(query)){
        conditions.push({
            score: query
        })
    }
    return res.send({
        teams: await Team.find({ $or: conditions }),
    })
})

team.post('/publish', async(req, res) => {
    let { selection } = req.body
    for(const selectedTeam of selection) {
        const team = await Team.findOne({_id: selectedTeam.id})
        if(selectedTeam.type == MODE.WIN) {
            team.wins = team.wins + 1
            team.score = team.score + 3
        }
        if(selectedTeam.type == MODE.LOSS) {
            team.losses = team.losses + 1
        }
        if(selectedTeam.type == MODE.TIE) {
            team.ties = team.ties + 1
            team.score = team.score + 1
        }
        await team.save()
    }
    return res.send({
        teams: await Team.find({}).sort({ score: 'desc' }).skip(3).limit(20),
        podium: await Team.find({}).sort({score: 'desc'}).limit(3)
    })
})

module.exports = team