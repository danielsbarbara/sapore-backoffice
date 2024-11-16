const { MongoClient } = require('mongodb')

const url: string = 'mongodb://localhost:27017/'//process.env.DB_URL! //'mongodb://localhost:27017/'
export const DBname: string = 'saporev1'

let client: any = undefined
async function GetMongoClient() {
    if (!client) {
        try {
            client = new MongoClient(url)
            await client.connect()
            console.log('⚡️ DB connections successfully! ⚡️')
        } catch (err) {
            console.log(err)
        }
    }
    return client
}

export async function GetCollection(dbName: string | undefined = DBname, collectionName: string | undefined) {
    const cli = await GetMongoClient()
    const db = await cli.db(dbName)
    return db.collection(collectionName)
}