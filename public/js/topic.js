/* Create a topic  */
const topic_create_form_handler = async (event) => {
  event.preventDefault();

  const subject = document.querySelector('#topic_subject').value.trim();
  const content = document.querySelector('#topic_content').value.trim();

  if (subject && content) {
    const response = await fetch('/api/topic', {
      method: 'POST',
      body: JSON.stringify({ subject, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      /* On success, refresh the dashboard to show the new topic.  */
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create topic.');
    }
  }
};

const topic_create_form = document.querySelector('#topic_create_form');
if (topic_create_form) {
  topic_create_form.addEventListener('submit', topic_create_form_handler);
}

/* Delete a topic */

async function topic_delete_handler(event) {
  const the_button = event.target;
  const topic_id = the_button.dataset.id;
  /* If there is no data-id on the target, we must be
   * seeing a click from somewhere else in the
   * page.  Ignore it.  */
  if (topic_id == null) {
    return;
  }

  const response = await fetch('api/topic/' + topic_id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    /* On success, refresh the dashboard to show that the topic
     * is no longer present.  */
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete topic.');
  }
}

const topics = document.querySelector('#topics');
if (topics) {
  topics.addEventListener('click', topic_delete_handler);
}

/* Modify the topic */

async function topic_edit_form_handler(event) {
  event.preventDefault();
  const the_button = event.target;
  const topic_id = the_button.dataset.id;
  /* If there is no data-id on the target, we must be
   * seeing a click from somewhere else in the
   * page.  Ignore it.  */
  if (topic_id == null) {
    return;
  }

  const subject = document.querySelector('#topic-subject').value.trim();
  const content = document.querySelector('#topic-content').value.trim();

  const response = await fetch('/api/topic/' + topic_id, {
    method: 'PUT',
    body: JSON.stringify({ subject, content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    /* On success, refresh the topic to show that
     * it has been updated.  */
    document.location.replace('/topic/' + topic_id);
  } else {
    alert('Failed to update topic.');
  }
}

const edit_topic = document.querySelector('#edit_topic');
if (edit_topic) {
  edit_topic.addEventListener('submit', topic_edit_form_handler);
}
