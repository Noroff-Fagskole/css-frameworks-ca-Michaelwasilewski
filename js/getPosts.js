import moment from 'moment/moment';
import { GET_POST_BY_ID_URL } from './settings/api';
import { getToken } from './utils/storage';

const postsContainer = document.querySelector('#posts-container');
const postsNotificationMessage = document.querySelector('.posts__notification');
const accessToken = getToken();
const searchBar = document.getElementById('search-navbar');

let data = [];

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredPosts = data.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchString) ||
      post.author.name.toLowerCase().includes(searchString)
    );
  });
  displayPosts(filteredPosts);
});

if (!accessToken) {
  location.href = '/index.html';
}

const filterOld = document.querySelector('#filter-old');
const filterNew = document.querySelector('#filter-new');

let GET_POSTS_URL = `${GET_POST_BY_ID_URL}/?_author=true&_comments=true&_reactions=true&&?sort=created&sortOrder=desc`;
filterOld.addEventListener('click', function () {
  GET_POSTS_URL = `${GET_POST_BY_ID_URL}/?_author=true&_comments=true&_reactions=true&&?sort=created&sortOrder=asc`;
  filterOld.classList.add('bg-slate-900');
  filterOld.classList.add('text-white');
  filterNew.classList.remove('bg-slate-900');
  filterNew.classList.remove('text-white');
  getAllPosts().then(() => {
    displayPosts(data);
  });
});

filterNew.addEventListener('click', function () {
  GET_POSTS_URL = `${GET_POST_BY_ID_URL}/?_author=true&_comments=true&_reactions=true&&?sort=created&sortOrder=desc`;
  filterNew.classList.add('bg-slate-900');
  filterNew.classList.add('text-white');
  filterOld.classList.remove('bg-slate-900');
  filterOld.classList.remove('text-white');
  getAllPosts().then(() => {
    displayPosts(data);
  });
});

async function getAllPosts() {
  const response = await fetch(GET_POSTS_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    data = await response.json();
    displayPosts(data);
  } else {
    const error = await response.json();
    const errorMessage = `Error: ${error}`;
  }
}
const displayPosts = (data) => {
  postsContainer.innerHTML = '';
  let now = moment(new Date());
  if (!data.length) {
    postsNotificationMessage.innerHTML = 'Sorry no posts';
  } else {
    const listOfHtmlPosts = data
      .map((post) => {
        const postTitle = post.title;
        const postBody = post.body;
        const postAuthor = post.author.name;
        const created = post.created;
        let time = 'm ago';
        let timeSinceCreated = now.diff(created, 'minutes');
        if (timeSinceCreated > 59) {
          timeSinceCreated = now.diff(created, 'hours');
          time = 'h ago';
          if (timeSinceCreated > 24) {
            timeSinceCreated = now.diff(created, 'days');
            time = 'd ago';
          }
          return `
          <a href="/single-post.html?post_id=${post.id}">
          <div class='flex items-center justify-center p-2'>
              <div class="rounded-xl border p-5 shadow-md w-9/12 bg-white">
                  <div class="flex w-full items-center justify-between border-b pb-3">
                      <div class="flex items-center space-x-3">
                          <div class="text-lg font-bold text-slate-700">${postAuthor}</div>
                      </div>
                      <div class="flex items-center space-x-8">
                          <div class="text-xs text-neutral-500">${timeSinceCreated} m</div>
                      </div>
                  </div>
      
                  <div class="mt-4 mb-6">
                      <div class="mb-3 text-xl font-bold">${postTitle}</div>
                      <div class="text-sm text-neutral-600">${postBody}</div>
                  </div>
      
                  <div>
                  </div>
              </div>
          </div>
          </div>
      </a>
                      `;
        }
      })
      .join('');
    postsContainer.insertAdjacentHTML('beforeend', listOfHtmlPosts);
  }
};

getAllPosts().then(() => {
  displayPosts(data);
});
