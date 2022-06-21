const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

// get one project
router.get('/:id', withAuth, async (req, res) => {
  // find a single project by its `id`
  // be sure to include its associated User data
  try {
    const project_id = req.params.id;
    const express_project_data = await Project.findByPk(project_id, {
      include: [User],
    });
    if (express_project_data === null) {
      res.status(404).end();
    } else {
      const project_data = express_project_data.get({ plain: true });

      res.render('one_project', {
        project: project_data,
        logged_in: req.session.logged_in,
        page_title: 'Project',
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
