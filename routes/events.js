'use strict';

// eslint-disable-next-line new-cap

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const request = require('request');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

router.get('/events', (_req, res, next) => {
  request('http://api.jambase.com/events?zipCode=98034&radius=50&startDate=2016-12-01&page=0&api_key=jfjppb349bzsu36z5qkk8wqb', (err, res, body) => {
    if (err) {
      return next(boom.create(400, 'Bad Request'));
    }

    const obj = JSON.parse(body);

    res.send(obj);
  });
});

module.exports = router;
