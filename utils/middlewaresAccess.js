const UrlAccess = require('../models/urlAccess')
const shortId = require('shortid')
const { groupBy }  =require("../utils/utils")

async function getOneById(req, res, next) {
    let resultId
    const { accessId } = req.params
    console.log(accessId)
    try {
        resultId = await UrlAccess.findOne({_id: accessId})
        if (resultId == null){
            return res.status(404).json({message: 'Cannot find url'})
        }
    } catch (err) {
        res.json({message: err.message})
    }
    
    res.resultId = resultId
    next()
}

async function getAllByEncode(req, res, next) {
    let resultEncode
    const { encodeAccess } = req.params
    try {
        resultEncode = await UrlAccess.find({encode: encodeAccess})
        if (resultEncode == null){
            return res.status(404).json({message: 'Cannot find any encode record'})
        }
    } catch (err) {
        res.json({message: err.message})
    }
    
    res.resultEncode = resultEncode
    next()
}

async function groupByDate(req, res, next) {
    const groupByEncodeAndDate = await groupBy(res.resultEncode, access_date => access_date.access_date)
    res.groupByEncodeAndDate = groupByEncodeAndDate

    next()
}

async function getEncodeAndExactDate(req, res, next) {
    var resultEncodeAndExactDate
    const { encodeAccess } = req.params
    const { dateTime } = req.params
    console.log(encodeAccess)
    console.log(dateTime)
    try {
        resultEncodeAndExactDate = await UrlAccess.find({
            encode: encodeAccess,
            access_date: dateTime
        })
        if (resultEncodeAndExactDate == null){
            return res.status(404).json({message: 'Cannot find any encode record'})
        }
    } catch (err) {
        res.json({message: err.message})
    }
    
    res.resultEncodeAndExactDate = resultEncodeAndExactDate
    next()
}

module.exports ={ getAllByEncode, getEncodeAndExactDate, getOneById, groupByDate }