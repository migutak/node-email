module.exports = {
    filePath: process.env.FILEPATH || '/home/ecollectadmin/demandletters/', //'/app/nfs/demandletters/'
    //imagePath: process.env.IMAGEPATH || '/home/ecollectadmin/docxletters/routes/',
    smtpserver: process.env.SMTPSERVER || 'office365.officer',
    smtpport: process.env.SMTPPORT || 587,
    user: process.env.USER || 'ecollect',
    pass:  process.env.PASS || ''
}
