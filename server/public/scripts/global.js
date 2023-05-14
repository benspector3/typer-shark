// Fetch Helpers
const handleFetch = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const { status, statusText, ok } = response;
    if (!ok) return [null, { status, statusText }];

    const content = (status === 204) || await response.json();
    return [content, null];
  } catch (error) {
    return [null, error];
  }
};

const getFetchOptions = (body, method = 'POST') => ({
  method,
  credentials: 'include', // IMPORTANT, this tells fetch to include cookies
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

// CREATE USER
const signupAndLoginHandler = async (url, form) => {
  const formData = new FormData(form);
  const options = getFetchOptions(Object.fromEntries(formData.entries()));
  const [_response, err] = await handleFetch(url, options);
  if (err) {
    form.reset();
    return alert('Something went wrong');
  }
  window.location.assign('/user.html');
};

// READ USER
const fetchLoggedInUser = async () => {
  const [response, _err] = await handleFetch('/api/me', { credentials: 'include' });
  return response;
};

// UPDATE USER
const updateUsernameHandler = async (form) => {
  const formData = new FormData(form);
  const username = formData.get('username');
  if (!username) return alert('Username is required');

  const url = `/api/users/${form.dataset.userId}`;
  const options = getFetchOptions({ username }, 'PATCH');

  const [response, err] = await handleFetch(url, options);
  return [response, err];
};

// DELETE USER
const logOutHandler = async () => {
  const [_response, err] = await handleFetch('/api/users/logout', { method: 'DELETE' });
  if (err) return alert('Something went wrong');
  window.location.assign('/');
};

// CREATE SCORE
const postScoreHandler = async (wordsTyped, wordsMissed) => {
  const options = getFetchOptions({ wordsMissed, wordsTyped });
  const [_response, err] = await handleFetch('/api/scores', options);
  if (err) {
    return alert('Something went wrong');
  }
};
// READ SCORE
const fetchTop5UserScores = async () => {
  const [scores, _err] = await handleFetch('/api/scores', { credentials: 'include' });

  scores.forEach(score => score.score = score.words_typed-score.words_missed);
  return scores.slice(0, 5);
}

// Nav Helper
const setNav = (hasLoggedInUser) => {
  const loggedOutNavHtml = `<ul>
    <li><a href="/">Play</a></li>
    <li><a href="./create.html">Sign Up</a></li>
    <li><a href="./login.html">Login</a></li>
  </ul>`;

  const loggedInNavHtml = `<ul>
    <li><a href="/">Play</a></li>
    <li><a href="./user.html">Profile</a></li>
  </ul>`;

  const navHtml = hasLoggedInUser ? loggedInNavHtml : loggedOutNavHtml;
  document.querySelector('nav').innerHTML = navHtml;
};

export {
  handleFetch,
  getFetchOptions,
  fetchLoggedInUser,
  signupAndLoginHandler,
  setNav,
  logOutHandler,
  updateUsernameHandler,
  fetchTop5UserScores,
  postScoreHandler,
};
