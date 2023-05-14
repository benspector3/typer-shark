/* eslint-disable import/extensions */
import {
  fetchLoggedInUser,
  logOutHandler,
  updateUsernameHandler,
  setNav,
  fetchTop5UserScores,
} from './global.js';

const isAuthError = (err) => (err.status === 401 || err.status === 403);
const redirectToLogin = () => window.location.assign('/login.html');
const renderUsername = (username) => {
  document.querySelector('#username').textContent = username;
};

const main = async () => {
  const user = await fetchLoggedInUser();
  if (!user) return redirectToLogin();

  const logoutForm = document.querySelector('#logout-form');
  const updateUsernameForm = document.querySelector('#username-form');
  const scoresList = document.querySelector('#scores-list');

  logoutForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    logOutHandler();
  });

  updateUsernameForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const [response, err] = await updateUsernameHandler(event.target);

    if (err) return isAuthError(err) ? redirectToLogin() : alert('Something went wrong');
    renderUsername(response.username);

    event.target.reset();
  });

  updateUsernameForm.dataset.userId = user.id;

  setNav(!!user);
  renderUsername(user.username);

  let scores = await fetchTop5UserScores();
  scores.sort((a, b) => a.score > b.score ? -1: 1).forEach(({score, words_typed, words_missed}) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${score}</td>
      <td>${words_typed}</td>
      <td>${words_missed}</td>
    `
    scoresList.append(row);
  })
};

main();
