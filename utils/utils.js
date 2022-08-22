async function checkUnique(name) {
    let code = name + shortId.generate()
    const count = await urlModel.countDocuments({encode: code})
    if (count>0){
        console.log(`has ${code}`)
        await checkUnique(name)
    }
    return code
}
module.exports ={ checkUnique }