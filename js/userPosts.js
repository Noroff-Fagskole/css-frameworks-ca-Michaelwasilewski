import moment from 'moment';
import { GET_USER_POSTS_URL, DELETE_USER_POST_BY_ID } from './settings/api';
import { getToken } from './utils/storage';

let now = moment(new Date());
const accessToken = getToken();

const postsContainer = document.querySelector('#posts-container');
const postsNotificationMessage = document.querySelector('.posts__notification');

async function getUserPosts() {
  const response = await fetch(GET_USER_POSTS_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    const jsonResponse = await response.json();
    postsContainer.innerHTML = '';
    const { posts } = jsonResponse;
    if (!posts.length) {
      postsNotificationMessage.innerHTML =
        "Sorry you don't have posts currently";
    } else {
      const numberOfPosts = posts.length;
      for (let i = 0; i < numberOfPosts; i++) {
        const { created } = posts[i];
        const secondsSinceCreated = now.diff(created, 'seconds');
        postsContainer.innerHTML += `
            <li class="relative px-4 py-5 bg-white gap-y-4 flex flex-col">
                <div class="flex justify-between space-x-3">
                    <div class="flex-1 min-w-0">
                        <a href="#" class="block focus:outline-none">
                            <p class="text-sm font-medium text-gray-900 truncate">DragonLord77</p>
                            <p class="text-sm text-gray-500 truncate">${posts[i].title}</p>
                        </a>
                    </div>
                    <time datetime="2021-01-27T16:35" class="flex-shrink-0 text-sm text-gray-500 whitespace-nowrap">${secondsSinceCreated} s
                        ago
                    </time>
                </div>
                <div class="mt-1">
                    <p class="text-sm text-gray-600 line-clamp-2">${posts[i].body}</p>
                </div>
                <div class="flex gap-4">
                    <button
                        data-id="${posts[i].id}"
                        type="button"
                        class="delete-post-btn inline-flex items-center rounded-md border border-transparent bg-red-100 px-3 py-2 text-sm font-medium leading-4 text-red-700 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                            Delete
                        </button>
                        
                        <a href="/edit-post.html?post_id=${posts[i].id}" class="inline-flex items-center rounded-md border border-transparent bg-purple-100 px-3 py-2 text-sm font-medium leading-4 text-purple-700 hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                            Edit
                        </a>
                </div>
            </li>
            `;
      }
    }
  } else {
    postsNotificationMessage.innerHTML = await response.json();
  }
}

getUserPosts().then(() => {
  handleDeleteBtnsEvents();
});

function handleDeleteBtnsEvents() {
  let deleteButtons = document.getElementsByClassName('delete-post-btn');
  const totalNumberOfDeleteBtns = deleteButtons.length;
  for (let i = 0; i < totalNumberOfDeleteBtns; i++) {
    deleteButtons[i].addEventListener('click', function () {
      const postId = this.dataset.id;
      //TODO Delete post by id
      handleDeletePostById(postId);
    });
  }
}

function handleDeletePostById(id) {
  const deleteUserById = async () => {
    try {
      let response = await fetch(`${DELETE_USER_POST_BY_ID}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        getUserPosts().then(() => {
          handleDeleteBtnsEvents();
        });
      } else {
        const err = await response.json();
        const message = `Sorry some error ${err}`;
        throw Error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  deleteUserById().then((r) => {});
}
