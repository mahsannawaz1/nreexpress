const bcrypt = require('bcrypt')

async function run(password){
    const salt = await bcrypt.genSalt(5)
    const hashedPassword = await bcrypt.hash(password,salt)
    console.log(salt)
    console.log(hashedPassword)
}
run('1234')
