/* Create a topic  */
const topic_create_form_handler = async (event) => {
  event.preventDefault();

  const subject = document.querySelector('#topic_subject').value.trim();
  const contents = document.querySelector('#topic_contents').value.trim();

  if (subject && contents) {
    const response = await fetch('/api/topic', {
      method: 'POST',
      body: JSON.stringify({ subject, contents }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create topic.');
    }
  }
};

document
  .querySelector('.topic_create_form')
  .addEventListener('submit', topic_create_form_handler);

/* Delete a topic */

async function topic_delete_handler(event) {
  const the_button = event.target;
  const topic_id = the_button.dataset.id;
  const response = await fetch('api/topic/' + topic_id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert('Failed to delete topic.');
  }
}

document
  .querySelector('#topics')
  .addEventListener('click', topic_delete_handler);
