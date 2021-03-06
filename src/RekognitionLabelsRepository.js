'use strict';

var {
  MongoClient
} = require('mongodb');

if (process.env.DOCKER === 'true') {
  var url = 'mongodb://mongo:27017/RekognitionLabels';
} else {
  var url = 'mongodb://localhost:27017/RekognitionLabels';
};

var getAllLabels = () => {
  return MongoClient.connect(url)
    .then((db) => {
      var searchResult = db.collection('RekognitionLabels').find().toArray();
      db.close();
      return searchResult;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

var getLabels = (file) => {
  return MongoClient.connect(url)
    .then((db) => {
      var searchResult = db.collection('RekognitionLabels').find({
        fileName: file
      }).toArray();
      db.close();
      return searchResult;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

var deleteLabels = (file) => {
  return MongoClient.connect(url)
    .then((db) => {
      var deleteResult = db.collection('RekognitionLabels').findOneAndDelete({
        fileName: file
      });
      db.close();
      return deleteResult;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

var addLabels = (file, data) => {
  return MongoClient.connect(url)
    .then((db) => {
      var input = db.collection('RekognitionLabels').insertOne({
        fileName: file,
        labels: data
      });
      db.close();
      return input;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

module.exports = {
  getAllLabels,
  getLabels,
  deleteLabels,
  addLabels
};
