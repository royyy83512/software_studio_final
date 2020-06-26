import axios from 'axios';

// Develop server URL
const postBaseUrl = 'http://localhost:3000/api';

// Production server URL
// const postBaseUrl = 'http://weathermood-db-5.us-east-1.elasticbeanstalk.com/api';

console.log('Hello From log_in.js')

// export function createPost(mood, text) {
//     let url = `${postBaseUrl}/posts`;

//     console.log(`Making POST request to: ${url}`);

//     return axios.post(url, {
//         mood,
//         text
//     }).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.data;
//     });
// }

// export function createVote(id, mood) {
//     let url = `${postBaseUrl}/posts/${id}/${mood.toLowerCase()}Votes`;

//     console.log(`Making POST request to: ${url}`);

//     return axios.post(url).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.data;
//     });
// }
