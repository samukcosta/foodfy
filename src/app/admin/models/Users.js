const db = require("../../../config/db")
const mailer = require("../../../lib/mailer")
const {hash} = require('bcryptjs')
const crypto = require("crypto")
const {temporaryPassword} = require("../../../lib/utils")
const { query } = require("../../../config/db")

module.exports = {
    async allChefs(){
        const query = `
            SELECT users.id, users.name, files.id AS id_files, files.name AS image, 
            COALESCE (files.path, 'sem_image') AS path,
            (SELECT count(r.pk_user_id) FROM recipes r WHERE r.pk_user_id = users.id) AS recipes_chef
            FROM users
            LEFT JOIN files ON (files.id = users.pk_files_id)
            WHERE is_chef = true
        `
        let results = await db.query(query)

        return results
    },
    async allUsers() {
        const query = `SELECT users.id, users.name, users.email, files.id AS id_files, files.name AS image, 
        COALESCE (files.path, 'sem_image') AS path
        FROM users
        LEFT JOIN files ON (files.id = users.pk_files_id)
        WHERE is_admin = false`

        let results = await db.query(query)

        return results.rows
    },
    async create(data, isAdmin, isChef){
        try {
            let query = `
                INSERT INTO users (
                    name,
                    email,
                    password,
                    is_admin,
                    is_chef,
                    reset_token,
                    reset_token_expires
                ) VALUES ($1, $2, $3, $4, $5, $6, $7)

                RETURNING id
            `

            let password = temporaryPassword()
            password = await hash(password, 8)

            const token = crypto.randomBytes(20).toString("hex")

            let now = new Date()
            now = now.setHours(now.getHours() + 36)

            let values = [
                data.name,
                data.email,
                password,
                isAdmin,
                isChef,
                token,
                now
            ]

            const results = await db.query(query, values)

            await mailer.sendMail({
                to: data.email,
                from: 'no-reply@foodfy.com.br',
                subject: 'Conta no Foodfy',
                html: `<h2>Sua conta foi criada no foodfy, ${data.name}</h2>
                <p>O próximo passo é criar uma senha nova para você. Clique no link abaixo para criar a nova senha.</p>
                <p><a href="http://localhost:3000/admin/password-reset?token=${token}" target="_blanck">
                    CRIAR SENHA </a>
                </p>
                `,
            })

            return results.rows[0].id
        } catch (err) {
            console.log(err)
        }

        return
    },
    async findOne(filters){

        let query = `SELECT * FROM users`

        Object.keys(filters).map(key => {
            query = `${query}
            ${key}`
            
            Object.keys(filters[key]).map(field => {
                query = `${query} ${field} = '${filters[key][field]}'`
            })
        })

        const results = await db.query(query)

        return results.rows[0]
    },
    findRecipesChef(id){
        return db.query(`SELECT id FROM recipes WHERE pk_chef_id = $1 ORDER BY id ASC`, [id])
    },
    async update(id, fields){

        let query = "UPDATE users SET"

        Object.keys(fields).map((key, index, array) => {
            if ((index + 1) < array.length) {
                query = `${query}
                    ${key} = '${fields[key]}',
                `
            } else {
                query = `${query}
                    ${key} = '${fields[key]}'
                    WHERE id = ${id}
                `
            }
        })

        await db.query(query)

        return
    },
    delete(id){
        db.query(`DELETE FROM users WHERE id=$1`, [id])
    }
}   