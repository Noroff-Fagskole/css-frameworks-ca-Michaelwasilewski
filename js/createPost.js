import { getToken } from './utils/storage';
import { CREATE_POST_URL } from './settings/api';

const createPostForm = document.querySelector('#post-form');
const postTitle = document.querySelector('#post-title');
const posttitleError = document.querySelector('#titleError');
const createPost = document.querySelector('#message');
const postMessageError = document.querySelector('#postMessageError');
createPostForm.addEventListener('submit', function (event) {
  event.preventDefault();
  let isPostTitle = false;
  if (postTitle.value.trim().length > 0) {
    posttitleError.classList.add('hidden');
    isPostTitle = true;
  } else {
    posttitleError.classList.remove('hidden');
  }

  let isCreatePost = false;
  if (createPost.value.trim().length > 0) {
    postMessageError.classList.add('hidden');
    isCreatePost = true;
  } else {
    postMessageError.classList.remove('hidden');
  }

  let isFormValid = isPostTitle && isCreatePost;

  if (isFormValid) {
    const postData = {
      title: postTitle.value,
      body: createPost.value,
    };
    const accessToken = getToken();
    (async function createPost() {
      const response = await fetch(CREATE_POST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        const data = await response.json();
        location.href = '/home.html';
      } else {
        const err = await response.json();
        const message = 'Creating post failed';
        throw new Error(message);
      }
      createPostForm.reset();
    })().catch((err) => {
      console.log(err);
    });
  } else {
    console.log('FAILED!');
  }
});
