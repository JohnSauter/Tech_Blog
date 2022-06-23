/* We need the topic ID to create a response.  We hide it in
 * the data attribute of the form.  */
const the_form = document.querySelector('#response_create_form');
const topic_id = the_form.dataset.id;

/* Create a response  */
const response_create_form_handler = async (event) => {
  event.preventDefault();

  const subject = document.querySelector('#response_subject').value.trim();
  const content = document.querySelector('#response_content').value.trim();

  if (subject && content) {
    const response = await fetch('/api/response', {
      method: 'POST',
      body: JSON.stringify({ subject, content, topic_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      /* On success, refresh the topic to show the new response.  */
      document.location.replace('/topic/' + topic_id);
    } else {
      alert('Failed to create response.');
    }
  }
};

the_form.addEventListener('submit', response_create_form_handler);


/* Delete a response */

async function response_delete_handler(event) {
  const the_button = event.target;
  const response_id = the_button.dataset.id;
  /* If there is no data-id on the target, we must be
   * seeing a click from somewhere else in the
   * page.  Ignore it.  */
  if (response_id == null) {
    return;
  }
  
  const response = await fetch('/api/response/' + response_id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    /* On success, refresh the page to show that the response
     * is no longer present.  */
    document.location.replace('/topic' + topic_id);
  } else {
    alert('Failed to delete response.');
  }
}

document
  .querySelector('#responses')
  .addEventListener('click', response_delete_handler);

/* Delete a topic */

async function topic_delete_handler(event) {
  const the_button = event.target;
  const button_topic_id = the_button.dataset.id;
  /* If there is no data-id on the target, or
   * the wronng one, we must be seeing a click 
   * from somewhere else in the page.  Ignore it.  
   */
  if (button_topic_id == null) {
    return;
  }
  if (button_topic_id != topic_id) {
    return;
  }
  
  const response = await fetch('/api/topic/' + topic_id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    /* On success, return to the dashboard to show that the topic
     * is no longer present.  */
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete topic.');
  }
}

document
  .querySelector('#topic-delete')
  .addEventListener('click', topic_delete_handler);

/* Edit a topic */

function topic_edit_handler(event) {
  event.preventDefault();
  const the_button = event.target;
  const button_topic_id = the_button.dataset.id;
  /* If there is no data-id on the target, or
   * the wronng one, we must be seeing a click 
   * from somewhere else in the page.  Ignore it.  
   */
  if (button_topic_id == null) {
    return;
  }
  if (button_topic_id != topic_id) {
    return;
  }
  
  /* Use a different page to perform the edit.  */
    document.location.replace('/api/topic/edit/' + topic_id);
  }

  document
  .querySelector('#topic-edit')
  .addEventListener('click', topic_edit_handler);