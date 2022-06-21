/* Create a project  */
const project_create_form_handler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project_name').value.trim();
  const description = document
    .querySelector('#project_description')
    .value.trim();
  const needed_funding = document
    .querySelector('#project_funding')
    .value.trim();

  if (name && description) {
    const response = await fetch('/api/project', {
      method: 'POST',
      body: JSON.stringify({ name, description, needed_funding }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create project.');
    }
  }
};

document
  .querySelector('.project_create_form')
  .addEventListener('submit', project_create_form_handler);

/* Delete a project  */

async function project_delete_handler(event) {
  const the_button = event.target;
  const project_id = the_button.dataset.id;
  const response = await fetch('api/project/' + project_id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert('Failed to delete project.');
  }
}

document
  .querySelector('#projects')
  .addEventListener('click', project_delete_handler);
