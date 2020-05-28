import MongoClient, { ObjectId } from "mongodb";

export default class mongoQueryLib {
  constructor(connectionString) {
    this.connectMongo(connectionString);
  }
  connectMongo(connectionString) {
    MongoClient.connect(
      connectionString,
      {
        useNewUrlParser: true,
        poolSize: 2,
        promiseLibrary: global.Promise
      },
      (err, client) => {
        if (err) console.log(err);
        this.db = client.db("pg7db");
        console.log("database is connected");
      }
    );
  }

  insertData(collectionName, data) {
    return new Promise((resolve, reject) => {
      this.db.collection(collectionName).insertOne(data, (err, res) => {
        if (err) reject(err.errmsg);
        resolve(res.result);
      });
    });
  }
  insertDataInArray(collectionName, id, data, projection) {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collectionName)
        .update(
          id,
          { $push: { [projection]: data } },
          { upsert: true },
          (err, res) => {
            if (err) reject(err.errmsg);
            resolve(res.result);
          }
        );
    });
  }
  getData(collectionName) {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collectionName)
        .find()
        .toArray((err, res) => {
          if (err) reject(err);
          resolve(res);
        });
    });
  }


  getFilteredData(collectionName,where,projection) {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collectionName)
        .find(where,projection)
        .toArray((err, res) => {
          if (err) reject(err);
          resolve(res);
        });
    });
  }


  getDatabyId(collectionName, Id) {
    return new Promise((resolve, reject) => {
      this.db.collection(collectionName).findOne(Id, (err, res) => {
        if (err) {
          console.log(err.errmsg);
          reject(err.errmsg);
        } else {
          console.log(res);
          resolve(res);
        }
      });
    });
  }

  //db.sideservices.findOne({"_id" : ObjectId("5c65866488a1c53464e46dc7")},{providers: {$elemMatch: {"_id" : ObjectId("5c65866488a1c53464e46dca")}}})

  getDistinctData(collectionName, query) {
    return new Promise((resolve, reject) => {
      this.db.collection(collectionName).distinct(query, (err, res) => {
        if (err) {
          console.log("err.errmsg");
          reject(err.errmsg);
        } else {
          console.log(res);
          resolve(res);
        }
      });
    });
  }

  //db.sideservices.aggregate( [ { $project : { "_id" : 1, "cat_lang.en" :1 } } ] )

  getDistinctAggregatedData(collectionName, query) {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collectionName)
        .aggregate([{ $project: query }])
        .toArray((err, res) => {
          if (err) {
            console.log("err.errmsg");
            reject(err.errmsg);
          } else {
            console.log(res);
            resolve(res);
          }
        });
    });
  }

  getDataFromArray(collectionName, query) {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collectionName)
        .find(query)
        .project(query)
        .toArray((err, res) => {
          if (err) {
            console.log("err.errmsg");
            reject(err.errmsg);
          } else {
            console.log(res);
            resolve(res);
          }
        });

      // resolve(operation)

      //this.db.collection(collectionName).find(cid,projection).toArray((err,res) => {
      /*if(err){ 
                    console.log('err.errmsg');
                    reject(err.errmsg)
                }
                else {
                    console.log(res);
                    resolve(res);
                }
            })*/
    });
  }
  /*db.sideservices.update({"_id" : ObjectId("5c654265a02270147da0b2a0")},
    {$pull:{providers:{"_id" : ObjectId("5c654265a02270147da0b2a3")}}})*/
  deleteDataInArray(collectionName, where, set) {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collectionName)
        .updateOne(where, { $pull: set }, (err, res) => {
          if (err) {
            reject(err.errmsg);
            console.log(err.errmsg);
          } else {
            resolve(res.result);
            console.log(res.result);
          }
        });
    });
  }

  
  updateObjectInArray(collectionName, where, set) {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collectionName)
        .updateOne(where, { $set: set }, { upsert: false }, (err, res) => {
          if (err) {
            reject(err.errmsg);
            console.log(err.errmsg);
          } else {
            resolve(res.result);
            console.log(res.result);
          }
        });
    });
  }

  deleteDatabyId(collectionName, Id) {
    return new Promise((resolve, reject) => {
      this.db.collection(collectionName).deleteOne(Id, (err, res) => {
        if (err) {
          reject(err.errmsg);
        } else {
          resolve(res.result);
        }
      });
    });
  }
  updateData(collectionName, where, set) {
    console.log(where, set);
    return new Promise((resolve, reject) => {
      this.db
        .collection(collectionName)
        .updateOne(where, { $set: set }, { upsert: false }, (err, res) => {
          if (err) {
            reject(err.errmsg);
            console.log(err.errmsg);
          } else {
            resolve(res.result);
            console.log(res.result);
          }
        });
    });
  }

  getDataByProject(collectionName,innerKeys,fromTable,localKey,foreignKey,As,projection) {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collectionName)
        .aggregate([
          { $unwind: "$"+innerKeys },
          {
            $lookup: {
              from: fromTable,
              localField: innerKeys+"."+localKey,
              foreignField: foreignKey,
              as: innerKeys+"."+As
            }
          },
          {
            $unwind: "$"+ innerKeys+"."+As
          }
          ,
          {
            $group: {
              _id: '$_id',
              [innerKeys]: { $push: "$"+innerKeys},
              
            }
          },
          {
            $project: projection
           }
           
        ])
        .toArray((err, res) => {
          if (err) {
            console.log(err.errmsg);
            reject(err.errmsg);
          } else {
            resolve(res);
          }
        });
    });
  }
}





/*
db.rental.aggregate(
            [
                 {
                    $unwind: "$Autos"
                },
                
                {
                    $lookup:
                    {
                        from: "user",
                        localField: "Autos.userid",
                        foreignField: "_id",
                        as: "Autos.userinfo"
                    }
                },
                {
                    $unwind: "$Autos.userinfo"
                },
               
                {
                    $group:
                    {
                        _id: "$_id",
                         Autos:{$push:"$Autos"},
                    }
                },
                {
                    $project:{ //'Autos.userinfo.Username':1
                        _id:1,
                        'Autos.userinfo.Username':1
                    }
                }
            ]

*/
