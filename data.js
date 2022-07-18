module.exports = {
    filePath: process.env.FILEPATH || '/home/ecollectadmin/demandletters/', //'/app/nfs/demandletters/'
    //imagePath: process.env.IMAGEPATH || '/home/ecollectadmin/docxletters/routes/',
    smtpserver: process.env.SMTPSERVER || 'smtp.mailtrap.io',
    smtpport: process.env.SMTPPORT || 2525,
    user: process.env.SMTPUSER || 'b6eef9a1d905d6',
    pass:  process.env.PASS || 'e4a461f71a936a',
    reset: process.env.RESET || 'http://localhost:4200/passwordreset?username=',
    signin: process.env.SIGNIN || 'http://localhost:4200/signin?username='
}
