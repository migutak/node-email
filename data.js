module.exports = {
    filePath: process.env.FILEPATH || '/home/ecollectadmin/demandletters/', //'/app/nfs/demandletters/'
    //imagePath: process.env.IMAGEPATH || '/home/ecollectadmin/docxletters/routes/',
    smtpserver: process.env.SMTPSERVER || 'smtp.gmail.com',
    smtpport: process.env.SMTPPORT || 587,
    user: process.env.SMTPUSER || 'ecollectsystem@gmail.com',
    pass:  process.env.PASS || 'W1ndowsxp'
}
