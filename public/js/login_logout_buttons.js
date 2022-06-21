/* the logout button */
const logout = async () => {
  /* Tell the back end to log out the user who is
   * on this session.  */
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    /* Display the login page.  */
    document.location.replace('/login');
  } else {
    alert('Failed to log out');
  }
};

const logout_btn = document.querySelector('#logout');
if (logout_btn) {
  logout_btn.addEventListener('click', logout);
}

/* the profile button */
const profile = () => {
  console.log('going to profile page');
  document.location.replace('/profile');
};

const profile_btn = document.querySelector('#profile');
if (profile_btn) {
  profile_btn.addEventListener('click', profile);
}

/* The login button */
const login = () => {
  console.log('going to login page');
  document.location.replace('/login');
};

const login_btn = document.querySelector('#login');
if (login_btn) {
  login_btn.addEventListener('click', login);
}
