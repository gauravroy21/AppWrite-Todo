import {Client, Account, Databases} from 'appwrite'

const client = new Client();

client.setEndpoint("http://161.35.124.162/v1").setProject("")

export const account = new Account(client)

//Database
export const databases = new Databases(client, "")