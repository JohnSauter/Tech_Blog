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

/* the dashboard button */
const dashboard = () => {
  document.location.replace('/dashboard');
};

const dashboard_btn = document.querySelector('#dashboard');
if (dashboard_btn) {
  dashboard_btn.addEventListener('click', dashboard);
}

/* The login button */
const login = () => {
  document.location.replace('/login');
};

const login_btn = document.querySelector('#login');
if (login_btn) {
  login_btn.addEventListener('click', login);
}

/* The home button */
const home = () => {
  document.location.replace('/');
};

const home_btn = document.querySelector('#home');
if (home_btn) {
  home_btn.addEventListener('click', home);
}
