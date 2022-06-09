//const WeightedAverage = require ('./WeightedAverage');
import {WeightedAverage} from "./calcWeightedAverage";


const MongoClient = require('mongodb').MongoClient;
const URL1 ='mongodb://localhost:27017';

MongoClient.connect(URL1,(err,client )=> {
    if(err)throw err;
    const db = client.db('EnergyExchange');
    let sorgu ={};
    db.collection('EnergyOffers').find(sorgu).toArray((err,result)=>{
        if (err)throw err;
        console.log(JSON.stringify(result,null,' '));       
        console.log(WeightedAverage(result));
        client.close();
    })
});