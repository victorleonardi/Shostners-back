const urlModel = require('../models/urlModel')
const shortId = require('shortid')

async function checkUnique(name) {
    let code = name + shortId.generate()
    const count = await urlModel.countDocuments({encode: code})
    if (count>0){
        console.log(`has ${code}`)
        await checkUnique(name)
    }
    return code
}

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, 1);
         } else {
             map.set(key, map.get(key)+1);
         }
    });
    return map;
}

module.exports ={ checkUnique , groupBy }