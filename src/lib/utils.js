module.exports = {
    date(timestamp){
        const date = new Date(timestamp)
    
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },
    lineBreak(str) {
        const forbd = str.replace(/(?:\r\n|\r|\n)/g, '~n')
        const forupdate = str.replace(/~n/g, '\n')
        const forhtml = str.replace(/~n/g, '<br>')
        
        return {
            fbd: forbd,
            fu: forupdate,
            fh: forhtml
        }
    },
    temporaryPassword() {
        return Math.random().toString(36).slice(-10);
    }
}