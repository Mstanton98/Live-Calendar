'use strict';

// eslint-disable-next-line new-cap

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const request = require('request');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.token = decoded;
    next();
  });
};

router.get('/events', authorize, (_req, res, next) => {
  const date = moment().format();

  request(`http://api.jambase.com/events?zipCode=98034&radius=50&startDate=${date}&page=0&api_key=jfjppb349bzsu36z5qkk8wqb`, (err, response, body) => {
    if (err) {
      return next(boom.create(400, 'Bad Request'));
    }
    const obj = JSON.parse(body);

    res.send(obj);
  });
});

router.get('/going', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('user_events')
    .where('user_id', userId)
    .andWhere('going', true)
    .andWhere('maybe', false)
    .then((rows) => {
      if (!rows) {
        return next(boom.create(400, 'something went wrong.'));
      }
      const userEvents = camelizeKeys(rows);

      res.send(userEvents);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/maybe', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('user_events')
    .where('user_id', userId)
    .andWhere('maybe', true)
    .andWhere('going', false)
    .then((rows) => {
      if (!rows) {
        return next(boom.create(400, 'something went wrong.'));
      }
      const userEvents = camelizeKeys(rows);

      res.send(userEvents);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/events', authorize, (req, res, next) => {
  const { userId } = req.token;

  const insertEvent = {
    userId: userId,
    going: req.body.going,
    maybe: req.body.maybe,
    artistName: req.body.artistName,
    venueName: req.body.venueName,
    eventDate: req.body.eventDate,
    eventId: req.body.eventId
  };

  knex('user_events')
    .insert(decamelizeKeys(insertEvent))
    .then((row) => {
      if (!row) {
        return next(boom.create(400, 'something went wrong.'));
      }

      res.send(true);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/events', authorize, (req, res, next) => {
  const { userId } = req.token;

  const eventId = req.body.eventId;

  knex('user_events')
    .del()
    .where('user_id', userId)
    .andWhere('event_id', eventId)
    .then((row) => {
      if (!row) {
        return next(boom.create(400, 'something went wrong.'));
      }

      res.send(true);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
