const mongodb = require('../database/model/model.js');

const controller = {
  post: (req, res) => {
    let startTime = new Date();
    mongodb.insertMany(req.body)
      .then(() => {
        let endTime = new Date();
        let timeDiff = endTime - startTime;
        res.status(201).send({timeDiff});
      })
      .catch(err => {
        console.error(err);
        res.status(404).send("error from mongo post")
      });
  },
  getPlay: (req, res) => {
    let startTime = new Date();
    mongodb.find({"propertyInfo_location": req.params.queries}).limit(1).skip(100000)
      .then(data => {
        let timeDiff = new Date() - startTime;
        let data2 = {timeDiff};
        Object.assign(data2, data[0]._doc);
        res.status(200).send(data2);
      })
      .catch(err => {
        console.error(err);
        res.status(404).send("error from mongo get")
      });
  },
  get: (req, res) => {
    let startTime = new Date();
    mongodb.findOne().where({id: req.params.id}).lean()
      .then(data => {
        let endTime = new Date();
        let timeDiff = endTime - startTime;
        let data2 = {timeDiff};
        if (data) Object.assign(data2, data);
        res.status(200).send(data2);
      })
      .catch(err => {
        console.error(err);
        res.status(404).send("error from mongo get")
      });
  },
  del: (req, res) => {
    let startTime = new Date();
    mongodb.deleteOne().where({id: req.params.id})
      .then(() => {
        let endTime = new Date();
        let timeDiff = endTime - startTime;
        res.status(202).send({timeDiff});
      })
      .catch(err => {
        console.error(err);
        res.status(404).send("error from mongo del")
      });
  },
  put: (req, res) => {
    let startTime = new Date();
    mongodb.findOneAndUpdate({id: req.params.id}, req.body)
      .then(() => {
        let endTime = new Date();
        let timeDiff = endTime - startTime;
        res.status(203).send({timeDiff});
      })
      .catch(err => {
        console.error(err);
        res.status(404).send("error from mongo put")
      });
  },

  getAll: (req, res) => {
    mongodb.find({}).lean().limit(100)
      .then(data => res.status(202).send(data))
      .catch(err => {
        console.error(err);
        res.status(404).send("error from mongo getAll")
      });
  },
  delAll: (req, res) => {
    mongodb.deleteMany({ __v: 0 })
      .then(() => res.status(202).send('ALL deleted'))
      .catch(err => {
        console.error(err);
        res.status(404).send("error from mongo delAll")
      });
  },
}

module.exports = controller;