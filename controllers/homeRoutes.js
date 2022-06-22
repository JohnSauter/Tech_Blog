const router = require('express').Router();
const { Topic, Response, User } = require('../models');
const withAuth = require('../utils/auth');

/* Home page shows the topics.  */
router.get('/', async (req, res) => {
  try {
    const express_topic_data = await Topic.findAll();

    const topic_data = express_topic_data.map((topic) =>
      topic.get({ plain: true })
    );

    /* We wish to list the topics by date created.  */
    topic_data.sort(function (a, b) {
      const x = a.createdAt.toISOString();
      const y = b.createdAt.toISOString();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
    });

    res.render('homepage', {
      topics: { topic_data },
      logged_in: req.session.logged_in,
      page_title: 'The Tech Blog',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  /* If the user is already logged in, send his browser
   * the dashboard page.  */
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  /* Otherwise, send his browser the login page.  */
  res.render('login');
});

router.get('/dashboard', withAuth, async (req, res) => {
  /* Display information about this user.  */
  const user_id = req.session.user_id;
  if (user_id === null) {
    res.status(404).end();
  }
  const express_user_data = await User.findByPk(user_id, {
    include: [Topic],
    attributes: { exclude: ['password'] },
  });
  if (express_user_data === null) {
    res.status(404).end();
  }
  const user_data = express_user_data.get({ plain: true });
  res.render('one_user', {
    user: user_data,
    logged_in: req.session.logged_in,
    page_title: 'Your Dashboard',
  });
});

module.exports = router;
