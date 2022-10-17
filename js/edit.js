import { getToken } from './utils/storage';

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postId = searchParam.get('post_id');
const accessToken = getToken();
const postTitle = document.querySelector('#post-title');
const postDescription = document.querySelector('#message');
const editPostForm = document.querySelector('#post-edit-form');

async function getPostById() {
  const response = await fetch(
    `https://nf-api.onrender.com/api/v1/social/posts/${postId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const data = await response.json();
  postTitle.value = data.title;
  postDescription.value = data.body;
}

getPostById();

editPostForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const postData = {
    title: postTitle.value,
    body: postDescription.value,
  };
  async function editPost() {
    const response = await fetch(
      `https://nf-api.onrender.com/api/v1/social/posts/${postId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      },
    );
    if (response.ok) {
      location.href = `single-post.html?post_id=${postId}`;
    }
  }
  editPost();
});
