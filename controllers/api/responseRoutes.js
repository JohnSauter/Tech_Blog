const router = require('express').Router();
const { Response } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newResponse = await Response.create({
      ...req.body,
      user_id: req.session.user_id,
      topic_id: req.session.topic_id,
    });

    res.status(201).json(newResponse);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const responseData = await Response.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
        topic_id: req.session.topic_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No response found with this id!' });
      return;
    }

    res.status(200).json(responseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
