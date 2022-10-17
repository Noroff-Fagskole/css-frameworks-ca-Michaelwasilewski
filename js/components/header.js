import { getUserName } from '../utils/storage';

function createHeaderBar() {
  const { pathname } = document.location;
  const navBar = document.querySelector('#nav-bar');
  if (navBar) {
    const userName = getUserName();
    let navLinks;
    navLinks = `
            <li><a href="/index.html" class="${
              pathname === '/index.html' ? 'text-blue-600' : ''
            }">SignUp</a></li>
            <li><a href="/login.html" class="${
              pathname === '/login.html' ? 'text-blue-600' : ''
            }">LogIn</a></li>
            `;
    if (userName) {
      navLinks = `
            <li>
                <a href="/home.html" class="${
                  pathname === '/home.html' ? 'text-white' : ''
                } block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</a>
            </li>
            <li >
                <a href="/create-post.html" class="${
                  pathname === '/create-post.html' ? '' : ''
                }block py-2  text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"><svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg></a>
            </li>
            <li>
                <a href="/profile.html" class="${
                  pathname === '/profile.html' ? '' : ''
                } block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Posts</a>
            </li>
            <li><span class="block py-2 pr-4 pl-3 text-gray-700 rounded  md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">${userName}</span></li>
            <li><button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" id="logout-btn">Log Out</button></li>
`;
    }
    navBar.innerHTML = `
        <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
           ${navLinks}
        </ul>`;
  }
}

export default createHeaderBar;
