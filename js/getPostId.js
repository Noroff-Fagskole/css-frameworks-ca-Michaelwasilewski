import { getToken } from './utils/storage';
import { GET_POST_BY_ID_URL } from './settings/api';

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postId = searchParam.get('post_id');
const accessToken = getToken();
const postDetails = document.querySelector('#post-details');

async function getPostById() {
  const response = await fetch(`${GET_POST_BY_ID_URL}/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  const title = data.title;
  const body = data.body;
  postDetails.innerHTML = `
          <div class='flex items-center justify-center p-2'>
                  <div class="mt-4 mb-6">
                      <div class="mb-3 text-xl font-bold">${title}</div>
                      <div class="text-sm text-neutral-600">${body}</div>
                  </div>
            </div>
    `;
}

getPostById();
