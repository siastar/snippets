import express from "express";
import bodyParser from "body-parser";
import mongoQueryLib from "./mongoquerylib";
import { ObjectId } from "mongodb";
import moment from "moment";
import path from "path";
import axios from "axios";
import PricingModel from "./PricingModel.js";
import { routingKeys } from "./RabbitSettings";
// import RabbitSender from "./RabbitSender";
// import RabbitConsumer from "./RabbitConsumer";
import MessageProvider from "./MessageProvider";
import MessageConsumer from "./MessageConsumer";
import WorkFlow from "./WorkFlow";
import { RequestEditor } from "./RequestEditor";
import { google } from "googleapis";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/build")));
app.use(function(req, res, next) {
  var whitelist = ["localhost:3000"];
  var host = req.get("host");

  whitelist.forEach(function(val, key) {
    if (host.indexOf(val) > -1) {
      res.setHeader("Access-Control-Allow-Origin", host);
    }
  });
  next();
});


app.listen(PORT);  
console.log(`express server listening on port ${5000}`);

const connectionString = "mongodb://admin:hitman47@54.93.236.63:27017/pg7db";
const queryObj = new mongoQueryLib(connectionString);
const pricing = new PricingModel();

const sendEmail = async (user, pass, to, subject, body) => {
  const send = await require("gmail-send")({
    user,
    pass,
    to,
    subject,
    html: body
  });
  send({}, (res, err) => console.log(res, err));
};

/*
 // Pricing TESTS
 const rentalPricesTest = pricing.getPriceList( 'rental' ),
 rentalPriceUpdateTest = pricing.updatePriceFromMetasArray( [{ price: { base: 50, negotiated: 60 } }], { base: 100, negotiated: 200 } );
 console.log( "\nAuto rental pricing:\n", rentalPricesTest[ 'autos' ] );
 console.log( "\nPrice from metas test:\n", pricing.getPriceFromMetasArray( [{ price: { base: 50, negotiated: 60 } }], 'final price' ) );
 console.log( "\nUpdated price:\n", pricing.getPriceFromMetasArray( rentalPriceUpdateTest ) );
 */
//pricing.setPriceList( { test: true } );
//console.log( "\nUpdated price list:\n", pricing.getPriceList() );

const workflow = new WorkFlow(); // pass 'debug' argument to log workflow processes
/* WorkFlow messaging TEST */

//console.log( `\nPG7 WorkFlow messaging (RabbitMQ) server:\n${workflow.getMessagingServer()}\n` );

app.get("/testpost", async (req, res) => {
  try {
    workflow.proceed({
      service: "RESE",
      fieldID: "abc123XYZ",
      meta: [
        { rentalType: "autos" },
        { size: "4x4" },
        { returnPlace: "Test return place" },
        { pickUpPlace: "Test pickup place" },
        { returnDate: "Tue 12:34" },
        { pickUpDate: "Mon 12:34" },
        { price: { base: 50, negotiated: false } },
        { confirmations: { provider: false, customer: false } }
      ]
    });
    const testOutput = workflow.getState("activeOutput");
    let testComm,
      testCount = 0;
    for (; testCount < testOutput.meta.length; testCount++) {
      if (testOutput.meta[testCount].communications) {
        testComm = testOutput.meta[testCount].communications;
      }
    }
    console.log(
      "\nTest data:\n",
      testOutput,
      "\n\nCommunications details:\n",
      //testOutput.meta[8].communications
      testComm
    );
    res.status(200).send(testOutput);
  } catch (err) {
    res.status(500).send(err);
  }
});

//
// ──────────────────────────────────────────────────────────────────────────────
//   :::::: R E N T A L   S E R V I C E : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────
//
/*
 app.get("/api/", async (req, res) => {
 try {
 const collectionName = "rental";
 const data = await queryObj.getData(collectionName);
 res.status(200).send(data);
 } catch (err) {
 res.status(500).send(err);
 }
 });*/

app.get("/api/rentalservices", async (req, res) => {
  try {
    const collectionName = "rental";
    const category = ["Autos", "Ironing", "Shoemaking", "Tailoring", "Laundry"];
    const fromTable = "user";
    const localKey = "userid";
    const foreignKey = "_id";
    const As = "userinfo";

    const dataBucket = category.map(async categoryItems => {
      const projection = {
        //_id: 1,
        //[categoryItems + "._id"]: 1,
        //[categoryItems + ".Size"]: 1,
        //[categoryItems + ".Status"]: 1,
        //[categoryItems + ".PostoRiconsegna"]: 1,
        //[categoryItems + ".PostoRitiro"]: 1,
        //[categoryItems + ".DataOraRiconsegna"]: 1,
        //[categoryItems + ".DataOraRitiro"]: 1,
        //[categoryItems + ".NumeroCapi"]: 1,
        //[categoryItems + ".UpdatedDate"]: 1,
        //[categoryItems + "." + As + ".Username"]: 1,

        [categoryItems]: {
          $filter: {
            input: "$" + [categoryItems],
            as: "alias",
            cond: { $eq: ["$$alias.deleted", 0] }
          }
        }
      };

      const data = await queryObj.getDataByProject(
        collectionName,
        categoryItems,
        fromTable,
        localKey,
        foreignKey,
        As,
        projection
      );
      return data;
    });

    const result = await Promise.all(dataBucket);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/rentalservices/d/", async (req, res) => {
  try {
    const { reqid, category } = req.body;
    const collectionName = "rental";

    const _category = category + "._id";
    const _set = category + ".$.deleted";

    const where = { [_category]: ObjectId(reqid) };
    const set = { [_set]: 1 };
    await queryObj.updateObjectInArray(collectionName, where, set);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
  //db.rental.updateOne({"Autos._id":ObjectId("5cac95cae51f32255f5044a3")},
  //{$set: {"Autos.$.deleted":1}} , { upsert: true })

  /*db.rental.find({"Autos":{"deleted":{$ne:1}}},{"Autos.$.deleted":0})
     db.rental.find({"Autos.deleted":{$ne: 1}}).pretty()
     db.rental.find({"Autos":  {$elemMatch: {deleted: 1 } } } ).pretty()
     db.rental.find({ "Autos": {deleted:   1 } }).pretty()
     db.rental.find(
     {"Autos.deleted": 0}, 
     {"Autos": {$elemMatch: {deleted:0}}});
     
     db.rental.update({"_id" : ObjectId("5c7e459f875ea5548de25722")},{$set:{"Autos":[]}})

     //  db.rental.updateOne({"Autos._id":ObjectId("5cac95cae51f32255f5044a3")}, {$set: {"Autos.$.deleted":1}} , { upsert: true })
     */
});

app.post("/api/rentalservices/c", async (req, res) => {
  try {
    const collectionName = "rental";
    const requestID = ObjectId();
    const _id = { _id: ObjectId(req.body.data._id) };
    const userid = ObjectId(req.body.data.userid);
    const project = req.body.data.category;
    const rentalPrices = pricing.getPriceList(collectionName);
    const createdDate = moment(new Date())
      .format("YYYY-MM-DD HH:mm:ss")
      .toString();
    console.log("TCL: rentalPrices", rentalPrices);

    if (project === "Autos") {
      const {
        Size,
        PostoRiconsegna,
        PostoRitiro,
        DataOraRiconsegna,
        DataOraRitiro,
        price
      } = req.body.data;

      if (
        parseInt(price) !==
        parseInt(rentalPrices[project.toLowerCase()][Size.toLowerCase()])
      ) {
        // if prices do not match
        console.log("\nPrices not matching!\n");
        res.status(500).send();
      } else {
        workflow.proceed({
          service: "RESE",
          fieldID: requestID,
          meta: [
            { rentalType: project },
            { size: Size },
            { returnPlace: PostoRiconsegna },
            { pickUpPlace: PostoRitiro },
            { returnDate: DataOraRiconsegna },
            { pickUpDate: DataOraRitiro },
            {
              price: {
                base: rentalPrices[project.toLowerCase()][Size.toLowerCase()],
                negotiated: false
              }
            },
            { confirmations: { provider: false, customer: false } }
          ]
        });
        const workflowStep = workflow.getState("activeOutput");

        const data = {
          _id: requestID,
          userid,
          Size,
          Status: workflowStep.statusCode,
          Meta: workflowStep.meta,
          PostoRiconsegna,
          PostoRitiro,
          DataOraRiconsegna,
          DataOraRitiro,
          createdDate,
          UpdatedDate: null,
          deleted: 0
        };
        queryObj.insertDataInArray(collectionName, _id, data, project);

        let comm;
        for (
          let metaCount = 0;
          metaCount < workflowStep.meta.length;
          metaCount++
        ) {
          if (workflowStep.meta[metaCount].communications) {
            comm = workflowStep.meta[metaCount].communications;
            metaCount = workflowStep.meta.length;
          }
        }
        comm = comm[comm.length - 1];
        console.log("TCL: workflowStep>>>>>", comm);
        const { email } = comm;
        console.log(req.body.data);
        sendEmail(
          "flinthash@gmail.com",
          "127hours",
          "saqygee@gmail.com",
          email.en.title,
          email.computed.en
        );
        res.status(204).send();
      }
    } else {
      const {
        NumeroCapi,
        DataOraRiconsegna,
        DataOraRitiro,
        price
      } = req.body.data;
      if (parseInt(price) !== parseInt(rentalPrices[project.toLowerCase()])) {
        // if prices do not match
        console.log("\nPrices not matching!\n");
        res.status(500).send();
      } else {
        workflow.proceed({
          service: "RESE",
          fieldID: requestID,
          meta: [
            { rentalType: project },
            { itemsAmount: NumeroCapi },
            { returnDate: DataOraRiconsegna },
            { pickUpDate: DataOraRitiro },
            {
              price: {
                base: rentalPrices[project.toLowerCase()],
                negotiated: false
              }
            },
            { confirmations: { provider: false, customer: false } }
          ]
        });
        const workflowStep = workflow.getState("activeOutput");

        const data = {
          _id: requestID,
          userid,
          NumeroCapi,
          Status: workflowStep.statusCode,
          Meta: workflowStep.meta,
          DataOraRiconsegna,
          DataOraRitiro,
          createdDate,
          UpdatedDate: null,
          deleted: 0
        };
        queryObj.insertDataInArray(collectionName, _id, data, project);

        //    workflowStep.meta.forEach(({communications},value) => {
        // 		if(value === communications)
        // 		console.log('>>>>>>>>>>>>',communications)
        // 	});

        let comm;
        for (
          let metaCount = 0;
          metaCount < workflowStep.meta.length;
          metaCount++
        ) {
          if (workflowStep.meta[metaCount].communications) {
            comm = workflowStep.meta[metaCount].communications;
            metaCount = workflowStep.meta.length;
          }
        }
        comm = comm[comm.length - 1];
        console.log("TCL: workflowStep>>>>>", comm);
        const { email } = comm;
        console.log(req.body.data);
        sendEmail(
          "flinthash@gmail.com",
          "127hours",
          "mauriziobiffi@gmail.com",
          email.en.title,
          email.computed.en
        );
        res.status(500).send();
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/rentalservices/u", async (req, res) => {
  try {
    const collectionName = "rental";
    const { category } = req.body;

    if (category === "Autos") {
      const {
        _id,
        reqid,
        size,
        status,
        pickUpPlace,
        returnPlace,
        pickUpDate,
        returnDate
      } = req.body;

      console.log(req.body);

      const data = {
        "Autos.$.Size": size,
        "Autos.$.Status": status.trim(),
        "Autos.$.PostoRiconsegna": returnPlace,
        "Autos.$.PostoRitiro": pickUpPlace,
        "Autos.$.DataOraRiconsegna": moment(returnDate).format(
          "DD/MM/YYYY HH:mm"
        ),
        "Autos.$.DataOraRitiro": moment(pickUpDate).format("DD/MM/YYYY HH:mm"),
        "Autos.$.UpdatedDate": moment().format("DD/MM/YYYY HH:mm")
      };

      const where = {
        _id: ObjectId(_id),
        "Autos._id": ObjectId(reqid)
      };
      const set = data;

      //console.log('XXXXXX',where,set);
      //db.rental.updateOne({"Autos._id":ObjectId("5cac95cae51f32255f5044a3")},
      // {$set: {"Autos.$.deleted":1}} , { upsert: true })
      ///console.log(data);

      await queryObj.updateObjectInArray(collectionName, where, set);
    } else {
      const {
        _id,
        reqid,
        status,
        pickUpDate,
        returnDate,
        totalPieces
      } = req.body;

      console.log(req.body);

      const data = {
        [category + ".$.NumeroCapi"]: totalPieces,
        [category + ".$.Status"]: status.trim(),
        [category + ".$.DataOraRiconsegna"]: moment(returnDate).format(
          "DD/MM/YYYY HH:mm"
        ),
        [category + ".$.DataOraRitiro"]: moment(pickUpDate).format(
          "DD/MM/YYYY HH:mm"
        ),
        [category + ".$.UpdatedDate"]: moment().format("DD/MM/YYYY HH:mm")
      };

      const where = {
        _id: ObjectId(_id),
        [category + "._id"]: ObjectId(reqid)
      };
      const set = data;
      await queryObj.updateObjectInArray(collectionName, where, set);
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

//
// ──────────────────────────────────────────────────────────────── I ──────────
//   :::::: S I D E   S E R V I C E : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────
//

app.get("/api/sideservices", async (req, res) => {
  try {
    const collectionName = "sideservices";
    const data = await queryObj.getData(collectionName);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/sideservice/c", async (req, res) => {
  try {
    //db.sideservices.update({_id:ObjectId("5c66dba70b486810d41a0e34")},
    //{$push:{providers:{'test':'test'}}},{upsert:true})
    const collectionName = "sideservices";
    const id = { _id: ObjectId(req.body.data._id) };
    const {
      provider_name,
      url,
      imageurl,
      desc_lang,
      slug,
      sortId
    } = req.body.data;
    const data = {
      _id: ObjectId(),
      provider_name,
      url,
      imageurl,
      desc_lang,
      slug,
      sortId
    };
    const projection = "providers";
    await queryObj.insertDataInArray(collectionName, id, data, projection);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/sideservice/u", async (req, res) => {
  try {
    const collectionName = "sideservices";
    const where = {
      _id: ObjectId(req.body.data.where._id),
      "providers._id": ObjectId(req.body.data.where["providers._id"])
    };
    const set = req.body.data.set;
    await queryObj.updateObjectInArray(collectionName, where, set);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get("/api/sideservices/:pid/:cid", async (req, res) => {
  try {
    // db.sideservices.findOne({"_id" : ObjectId("5c65866488a1c53464e46dc7")},
    //{providers: {$elemMatch: {"_id" : ObjectId("5c65866488a1c53464e46dca")}}})
    // {
    // "providers": { "$elemMatch": { "_id": ObjectId("5c669bdb3d5d83c750fdd59b") } }
    // }
    const collectionName = "sideservices";
    //const pid = {_id:ObjectId(req.params.pid)};
    const query = {
      providers: { $elemMatch: { _id: ObjectId(req.params.cid) } }
    };
    //const projection = {'providers.$._id':1}
    const data = await queryObj.getDataFromArray(collectionName, query);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/*db.sideservices.update({"_id" : ObjectId("5c654265a02270147da0b2a0")},
 {$pull:{providers:{"_id" : ObjectId("5c654265a02270147da0b2a3")}}})*/

app.post("/api/sideservice/d/", async (req, res) => {
  try {
    const collectionName = "sideservices";
    const where = { _id: ObjectId(req.body.parentid) };
    const set = { providers: { _id: ObjectId(req.body._id) } };
    await queryObj.deleteDataInArray(collectionName, where, set);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

//
// ──────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S I D E S E R V I C E   C A T E G O R Y : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────
//

app.get("/api/sideservicesgetcat/:lang", async (req, res) => {
  try {
    const collectionName = "sideservices";
    const query = { _id: 1, ["cat_lang." + req.params.lang]: 1 }; //'_id,cat_lang.'+req.params.lang;
    const data = await queryObj.getDistinctAggregatedData(
      collectionName,
      query
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/sideservicescat/:id", async (req, res) => {
  try {
    const collectionName = "sideservices";
    const id = { _id: ObjectId(req.params.id) };
    const data = await queryObj.getDatabyId(collectionName, id);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post("/api/sideservicecat/c/", async (req, res) => {
  try {
    const collectionName = "sideservices";
    const category = {
      cat_lang: [
        {
          _id: ObjectId(),
          [Object.keys(req.body)]: req.body[Object.keys(req.body)]
        }
      ]
    };
    await queryObj.insertData(collectionName, category);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post("/api/sideservicecat/d/:id", async (req, res) => {
  try {
    console.log("reached");
    const collectionName = "sideservices";
    const Id = { _id: ObjectId(req.params.id) };
    await queryObj.deleteDatabyId(collectionName, Id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

/*db.sideservices.update({"_id" : ObjectId("5c654265a02270147da0b2a0")},
 {$pull:{providers:{"_id" : ObjectId("5c654265a02270147da0b2a3")}}})*/

app.post("/api/sideservicecat/u", (req, res) => {
  try {
    const collectionName = "sideservices";
    const set = {
      [Object.keys(req.body)[1]]: req.body[Object.keys(req.body)[1]]
    };
    const where = {
      [Object.keys(req.body)[0]]: ObjectId(req.body[Object.keys(req.body)[0]])
    };
    console.log(set, where);
    queryObj.updateObjectInArray(collectionName, where, set);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

//
// ──────────────────────────────────────────────────────────────────────────────────────────
//   :::::: M A I N T E N A N C E : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────
//

app.get("/api/maintenanceservices", async (req, res) => {
  try {
    const collectionName = "maintenance";
    const data = await queryObj.getData(collectionName);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/maintenanceservices/c", async (req, res) => {
  try {
    console.log(req.body);
    const collectionName = "maintenance";
    const createdDate = moment(new Date())
      .format("YYYY-MM-DD HH:mm:ss")
      .toString();
    const {
      catid,
      userid,
      subject,
      description,
      damagedGood,
      uploadedImagePaths
    } = req.body;
    const id = { _id: ObjectId(catid) };
    const data = {
      _id: ObjectId(),
      userid,
      subject,
      description,
      damagedGood,
      uploadedImagePaths,
      createdDate,
      updatedDate: null,
      deleted: 0
    };
    const projection = "Requests";
    await queryObj.insertDataInArray(collectionName, id, data, projection);

    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/api/maintenanceservices/test", async (req, res) => {
  try {
    const collectionName = "maintenance";
    const query = {
      Requests: { $elemMatch: { _id: ObjectId(req.params.cid) } }
    };
    const data = await queryObj.getDataFromArray(collectionName, query);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//
// ──────────────────────────────────────────────────────────────────────────────────────────
//   :::::: M A I N T E N A N C E   C A T E G O R I E S : :  :   :    :     :        :
// ──────────────────────────────────────────────────────────────────────────────────────────
//

app.get("/api/maintenanceservicesgetcat/", async (req, res) => {
  try {
    const collectionName = "maintenance";
    const projection = { projection: { cat_lang: 1 } };
    const data = await queryObj.getFilteredData(collectionName, {}, projection);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//db.maintenance.find({'cat_lang.en':1})

app.get("/api/maintenanceservicesgetcat/:id", async (req, res) => {
  try {
    const collectionName = "maintenanceservices";
    /*
	 const id = { _id: ObjectId(req.params.id) };
	 const data = await queryObj.getDatabyId(collectionName, id);
	 res.status(200).send(data);
	 */
    console.log(
      "\nReached maintenance service category by ID!\nRequest:\n",
      req
    );
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

//
// ──────────────────────────────────────────────────────── I ──────────
//   :::::: M E N U   A P I : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────
//

app.get("/api/menu", async (req, res) => {
  try {
    const collectionName = "menu";
    const data = await queryObj.getData(collectionName);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/*
 app.post('/api/menu/d/:id', async (req, res) => {
 try {
 const collectionName = 'menu';
 const Id = {_id:ObjectId(req.params.id)};
 await queryObj.deleteDatabyId(collectionName,Id)
 res.status(204).send();
 } catch (err) {
 res.status(500).send(err);
 }
 });
 */

app.get("/api/menu/:id", async (req, res) => {
  try {
    const collectionName = "menu";
    const Id = { _id: ObjectId(req.params.id) };
    const data = await queryObj.getDatabyId(collectionName, Id);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/menu/update", (req, res) => {
  try {
    const collectionName = "menu";
    const where = {
      _id: ObjectId(req.body.data.where._id),
      "title_lang._id": ObjectId(req.body.data.where["title_lang._id"])
    };
    const set = req.body.data.set;
    queryObj.updateData(collectionName, where, set);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

//
// ──────────────────────────────────────────────────────────────────
//   :::::: P A Y M E N T S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────
//

// default payments process gateway
app.post("/api/payments", (req, res) => {
  "use strict";
  try {
    console.log("\nReached payment request!\nRequest:\n", req.body);
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

//
// ──────────────────────────────────────────────────────────────────
//   :::::: W O R K F L O W : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────
//

// default workflow process gateway
app.post("/workflow", async (req, res) => {
  /*
     req.query =
     reqstatus: request status code string
     requser: request access user 
     reqmode: workflow mode string ( 'identify' || 'setup' || 'proceed' )
     */
  try {
    console.log("\nRequested workflow operation!\nRequest query:\n", req.query);
    let response,
      serviceCheck = function() {
        return axios
          .get("http://localhost:5000/api/rentalservices") // check request validity
          .then(reqResponse => {
            return reqResponse.data;
          })
          .catch(err => {
            return err;
          });
      },
      maintenanceCheck = function() {
        return axios
          .get("http://localhost:5000/api/maintenanceservices") // check request validity
          .then(reqResponse => {
            return reqResponse.data;
          })
          .catch(err => {
            return err;
          });
      };
    // userCheck = axios.post( 'https://bedzzle.com/api/users' ), // TO FINISH! - hook Beddzle api check

    // TO FINISH! - include request query user check ( requser )
    if (!req.query.reqstatus || !req.query.reqmode) {
      // TO FINISH! - add req.query.requser
      response = "KO";
      res.status(200).send("Forbidden");
    }
    // if all needed query parameters are included
    else {
      await axios
        .all([serviceCheck(), maintenanceCheck()]) // TO FINISH! - add Bedzzle user check ( userCheck( )
        .then(
          axios.spread((serviceRequests, maintenanceRequests) => {
            // TO FINISH! - add Bedzzle user data ( userData )
            console.log(
              "\n\nGathered services:\n",
              serviceRequests,
              "\n\nGatehered maintenance:\n",
              maintenanceRequests
            );
            if (response !== "KO" && serviceRequests && maintenanceRequests) {
              // TO FINISH! - cross check user credentials and existing request ( userData )
              let allServices = [serviceRequests, maintenanceRequests],
                activeRequest = false,
                identifiedRequest,
                status;
              switch (
                req.query.reqmode // switch according to requested workflow mode
              ) {
                case "identify": // identify service request - used by GET /servicerequestdetails
                  allServices.forEach(thisServiceType => {
                    if (!activeRequest) {
                      // define request editor arguments to identify active request
                      const identifyingArgs = {
                          mode: "identify", // 'identify' || 'setup'
                          requestUser: req.query.requser,
                          requestStatusCode: req.query.reqstatus,
                          requestData: {
                            serviceRequests: serviceRequests,
                            maintenanceRequests: maintenanceRequests
                          }
                        },
                        requestEditor = new RequestEditor(identifyingArgs), // create new request editor to gather active request
                        result = requestEditor.getActiveRequest();
                      if (result) {
                        identifiedRequest = result;
                      }
                    }
                  });
                  // get service request status
                  status = workflow.getStatus(req.query.reqstatus); // TO FINISH! - hook up workflow.proceed
                  const requestArgs = {
                    // new request editor setup arguments
                    mode: "setup", // 'identify' || 'setup'
                    requestUser: req.query.requser,
                    requestStatusCode: req.query.reqstatus,
                    status: status,
                    activeRequest: identifiedRequest
                  };
                  const newRequestEditor = new RequestEditor(requestArgs); // create new request editor
                  activeRequest = newRequestEditor.launchEditorPage(); // set new request editor response page output
                  break;
              } // workflow request mode switch end
              // define response
              response = {
                serviceRequest: activeRequest // serviceRequests, maintenanceRequests
                // userData: userData
              };
            }
            // set and send response
            res.json({ workflowResponse: response });
            res.status(200).send();
          })
        );
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// workflow requested service details front ( GET ) gateway
app.get("/servicerequestdetails", async (req, res) => {
  // test - http://localhost:5000/servicerequestdetails?reqstatus=5WR80E35S6oExW2PzR5cee502c299bc755fe35c9c3
  try {
    /*
	 query parameters:
	 reqstatus: request status code string
	 requser: request access user 
	 */
    const reqStatus = req.query.reqstatus.replace(/[^a-zA-Z0-9]/g, ""),
      reqUser = req.query.requser; // TO FINISH! - strip user query when integrated with user check
    await axios
      .post(
        `http://localhost:5000/workflow?reqstatus=${reqStatus}&requser=${reqUser}&reqmode=identify`
      )
      .then(workflowResponse => {
        const workflowResponseData =
          workflowResponse.data.workflowResponse.serviceRequest;
        //console.log( '\n\nReceived workflow response:', workflowResponseData );
        if (workflowResponseData) {
          res.status(200).send(workflowResponseData);
        } else {
          // no request match
          res.status(200).send("Invalid request.");
        }
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

//
// ────────────────────────────────────────────────────────────── I ──────────
//   :::::: R A B B I T   T E S T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
//

//
// ─── PROVIDER ────────────────────────────────────────────────────────────────────
//

// const xchange = rProvider.getExchangeType().direct;
// console.log("TCL: xchange", xchange)

// const mProvider = new MessageProvider("amqp://localhost");

// const exName = "esthEx";
// const type = mProvider.getExchangeType().direct;
// const key = routingKeys.maintenance;

// mProvider.createExchange(exName, type);
// mProvider.createDurableQueue(key);
// // mProvider.sendMessageToQueue('Hello its from wrapper');
// mProvider.bindToQueue("response");

// const mConsumer = new MessageConsumer("amqp://localhost");
// const ctype = mConsumer.getExchangeType().direct;

// mConsumer.setExchange(exName, ctype);
// mConsumer.bindToQueue(key);
// //mConsumer.listMessage();
// mConsumer.respondBack("hogaya janny", "0.11226911644168802");

// const rSender = new RabbitSender('amqp://localhost');
// const channel  = rSender.createChannel();
// const type = rSender.exchangeType.direct;
// const key = routingKeys.maintenance;

// //create exchange
// rSender.createExchange(exName,type,channel,true);
// //creates queue possible need once only
// rSender.createDurableQueue(key,channel);

// //create messages using create queue
// rSender.sendMessageToQueue(exName,key,channel,'No electricity');
// //rSender.sendMessageToQueue(exName,key,channel,'No Water');

// //this line binds provider for reverse response
// rSender.bindToQueue('response',exName,channel,'response');

//
// ─── CONSUMER ────────────────────────────────────────────────────────────────────
//

// const rReceiver = new RabbitConsumer('amqp://localhost');
// const cCh = rReceiver.createChannel();

// //set exchange to same as provider
// rReceiver.setExchange(exName,type,cCh);
// //bind to queue
// rReceiver.bindToQueue(key,exName,cCh,key);

// //list all messages in queue
// rReceiver.listMessages(key,cCh);

//!!important use this function to empty the queue this function will
//decide which message to delete using correlationId which is random.

///rReceiver.respondBack(exName,key,cCh,'We fix it soon at 1:00pm','0.8361041925511183');

// app.get('/api/push/:message',(req,res)=>{
// 	console.log("SERVER:",req.params['message']);
// 	rSender.sendMessageToQueue(exName,key,channel,req.params['message']);
// 	res.send('OK').status(200)
// })

//
// ────────────────────────────────────────────────────────────────────────
//   :::::: G O O G L E D R I V E : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
//

app.get("/api/getdrivetoken", (req, res) => {
  //authorization to make api
  const privatekey = require("./key.json");
  let jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ["https://www.googleapis.com/auth/drive"]
  );
  //authenticate request
  jwtClient.authorize((err, tokens) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    } else {
      res.status(200).send(tokens);
    }
  });
});

//
// ────────────────────────────────────────────────────────────────────────
//   :::::: P R I C I N G : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
//

app.get("/api/pricing", (req, res) => {
  // test URL: localhost:5000/api/pricing?cat=rental&service=ironing
  const requestedCategory = req.query.cat ? req.query.cat.toLowerCase() : null,
    requestedService = req.query.service
      ? req.query.service.toLowerCase()
      : null,
    requestedItem = req.query.item ? req.query.item.toLowerCase() : null,
    price = pricing.getPriceList();
  let output = false,
    denied = false;
  for (let queryArg in res.query) {
    if (queryArg != "cat" && queryArg != "service" && queryArg != "item") {
      denied = true;
    }
  }
  if (denied) {
    // explicitly deny requests with unexpected parameters
    output = { message: "Forbidden" };
  } else {
    if (
      requestedCategory &&
      requestedService &&
      requestedItem &&
      price[requestedCategory][requestedService]
    ) {
      // if item requested ( rental auto service )
      output = {
        [requestedItem]:
          price[requestedCategory][requestedService][requestedItem]
      };
    } else if (
      requestedCategory &&
      requestedService &&
      price[requestedCategory][requestedService]
    ) {
      // if service category requested ( other rental services )
      output = {
        [requestedService]: price[requestedCategory][requestedService]
      };
    } else if (!requestedCategory && !requestedService && !requestedItem) {
      output = price;
    } else {
      // insufficient or wrong parameters, deny request
      output = { message: "Wrong request" };
    }
  }
  if (!output) {
    res.status(500).send();
  } else {
    res.status(200).send(output);
  }
});

//
// ────────────────────────────────────────────────────────────────────
//   :::::: I N F O P A G E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────
//

app.get("/api/infopages", async (req, res) => {
  try {
    const collectionName = "infopages";
    const data = await queryObj.getData(collectionName);
    res.status(200).send(data);
  } catch (err) {
	  console.log('Error:',err);
	  res.status(500).send();
  }
});

app.post("/api/infopages/u",async(req,res) => {
	try{
		const collectionName = "infopages";
		const {_id,title,content} = req.body;
		
		const where = {
			_id: ObjectId(_id),
		};
		const set =  {'privacyInfo': {'title': {en: title}}}
		
		
		//[{'privacyInfo':{title:{en:title}},{'privacyInfo':{content:{en:content}}}];
		queryObj.updateData(collectionName, where, set);
			
		} catch(err) {
			console.log('Error:',err);
			res.status(500).send();
		}
})


//
// ────────────────────────────────────────────────────────────────────────────────────────
//   :::::: D B   H E L P E R   F U N C T I O N S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────
//

//
// ─── CLEARS DB ──────────────────────────────────────────────────────────────────
//
//
// db.rental.insert([
// { "_id" : ObjectId("5c7e459f875ea5548de25722"),Autos:[]},
// { "_id" : ObjectId("5c7e45ce875ea5548de25723"),Shoemaking:[]},
// { "_id" : ObjectId("5c7e45e9875ea5548de25724"),Ironing:[] },
// { "_id" : ObjectId("5c7e4609875ea5548de25725"),Tailoring:[] },
// { "_id" : ObjectId("5c7e4625875ea5548de25726"), Laundry:[]}
// ])

//
// ─── INSERT DATA INTO DB INFOPAGES ──────────────────────────────────────────────
//
// db.infopages.insert([{
//     privacyInfo:{
//       title:{en:"English",it:"Italian"},
//       content:{en:"<h1>English</h1>",it:"<h1>Italian</h1>"},
//       active:{mobApp:true,webApp:false,web:false},
//       createdDate:"2019-06-05 13:09:58",
//       updatedDate:"2019-09-05 13:09:58",
//       delete:0
//     },
//     appPrivacyInfo:{
//       title:{en:"English",it:"Italian"},
//       content:{en:"<h1>English</h1>",it:"<h1>Italian</h1>"},
//       active:{mobApp:true,webApp:false,web:false},
//       createdDate:"2019-06-05 13:09:58",
//       updatedDate:"2019-09-05 13:09:58",
//       delete:0
//     }
//   }])


// Build redirection
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'), function(err) {
	    console.log('Path:\n', path.join(__dirname, '/build/index.html'));
	if (err) {
	    console.log('Reached ERROR!');
	    res.status(500).send(err);
	}
    });
});
