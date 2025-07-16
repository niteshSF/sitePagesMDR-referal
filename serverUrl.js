// ----------------------- connected to backend locally -----------------------------------

// function serverUrlPort() {
//     const currentHostname = window.location.hostname;
//     const port = "5000";
//     var urlport = null;
//     // Check if the current hostname is empty, null, 'localhost', or '127.0.0.1'
//     if (!currentHostname || currentHostname === '127.0.0.1' || currentHostname === 'localhost') urlport = `http://127.0.0.1:${port}`;
//     else urlport = `http://${currentHostname}:${port}`;
//     return urlport;
// }
// function serverUrl() {
//     const currentHostname = window.location.hostname;
//     var url = null;
//     // Check if the current hostname is empty, null, 'localhost', or '127.0.0.1'
//     if (!currentHostname || currentHostname === '127.0.0.1' || currentHostname === 'localhost') urlport = `http://127.0.0.1`;
//     else url = `http://${currentHostname}`;
//     return url;
// }
// function serverPort() {
//     return "5000"
// }
// function updateLoginURLWithRegex() {
//     // Get the current hostname from the browser's address bar
//     const currentHostname = window.location.hostname;

//     // Check if the current hostname is empty, null, 'localhost', or '127.0.0.1'
//     if (!currentHostname || currentHostname === '127.0.0.1' || currentHostname === 'localhost') {
//         console.log("Running on a local environment. No URL update required.");
//         return; // Bypass the update if running locally
//     }

//     // Define the regex pattern to match URLs with "127.0.0.1"
//     const regexPattern = /^http:\/\/127\.0\.0\.1:(\d{4})\/(.+)/;

//     // Get all the anchor tags in the document
//     const anchors = document.querySelectorAll('ul.nav li a');

//     // Loop through each anchor
//     anchors.forEach(anchor => {
//         // Get the current href value
//         let currentHref = anchor.getAttribute('href');

//         // Check if the href matches the pattern for URLs containing '127.0.0.1'
//         const match = currentHref.match(regexPattern);

//         if (match) {
//             // Extract the port (group 1) and the subpath (group 2) from the regex match
//             const port = match[1];
//             const subpath = match[2];

//             // Construct the new href with the current hostname, port, and subpath
//             let newHref = `http://${currentHostname}:${port}/${subpath}`;

//             // Set the new href value back to the anchor
//             anchor.setAttribute('href', newHref);

//             console.log('Login URL updated to:', newHref);
//         }
//     });
// }

// function updateButtonOnclickWithRegex() {
//     // Get the current hostname from the browser's address bar
//     const currentHostname = window.location.hostname;

//     // Check if the current hostname is empty, null, 'localhost', or '127.0.0.1'
//     if (!currentHostname || currentHostname === '127.0.0.1' || currentHostname === 'localhost') {
//         console.log("Running on a local environment. No URL update required.");
//         return; // Bypass the update if running locally
//     }

//     // Define the regex pattern to match URLs with "127.0.0.1" in the window.open call
//     const regexPattern = /window\.open\('http:\/\/127\.0\.0\.1:(\d{4})\/(.+?)'\)/;

//     // Get all the button elements with an onclick attribute
//     const buttons = document.querySelectorAll('button[onclick]');
//     console.log('onclick buttons', buttons.length);

//     // Loop through each button
//     buttons.forEach(button => {
//         // Get the current onclick attribute value
//         let onclickValue = button.getAttribute('onclick');

//         // Check if the onclick value matches the pattern for URLs containing '127.0.0.1'
//         const match = onclickValue.match(regexPattern);

//         if (match) {
//             // Extract the port (group 1) and the subpath (group 2) from the regex match
//             const port = match[1];
//             const subpath = match[2];

//             // Construct the new URL with the current hostname, port, and subpath
//             let newOnclickValue = `window.open('http://${currentHostname}:${port}/${subpath}')`;

//             // Set the new onclick value back to the button
//             button.setAttribute('onclick', newOnclickValue);

//             console.log('Button onclick URL updated to:', newOnclickValue);
//         }
//     });
// }

//   function updateDivOnclickWithRegex() {
//       // Get the current hostname from the browser's address bar
//       const currentHostname = window.location.hostname;

//       // Check if the current hostname is empty, null, 'localhost', or '127.0.0.1'
//       if (!currentHostname || currentHostname === '127.0.0.1' || currentHostname === 'localhost') {
//           console.log("Running on a local environment. No URL update required.");
//           return; // Bypass the update if running locally
//       }

//       // Define the regex pattern to match URLs with "127.0.0.1" in the window.location.href
//       const regexPattern = /window\.location\.href\s*=\s*"http:\/\/127\.0\.0\.1:(\d{4})\/(.+?)"/;

//       // Get all the div elements with an onclick attribute
//       const divs = document.querySelectorAll('div[onclick]');

//       // Loop through each div
//       divs.forEach(div => {
//           // Get the current onclick attribute value
//           let onclickValue = div.getAttribute('onclick');

//           // Check if the onclick value matches the pattern for URLs containing '127.0.0.1'
//           const match = onclickValue.match(regexPattern);

//           if (match) {
//               // Extract the port (group 1) and the subpath (group 2) from the regex match
//               const port = match[1];
//               const subpath = match[2];

//               // Construct the new URL with the current hostname, port, and subpath
//               let newOnclickValue = `window.location.href = "http://${currentHostname}:${port}/${subpath}"`;

//               // Set the new onclick value back to the div
//               div.setAttribute('onclick', newOnclickValue);

//               console.log('Div onclick URL updated to:', newOnclickValue);
//           }
//       });
//   }


// ------------------- netcup server backend connected ---------------------------------

// Returns the base API URL (Netcup server)
function serverUrl() {
  return "https://sciencetechnology.samskritifoundation.org/api";
}

// Builds a complete API URL using the given subpath
function getApiUrl(subpath) {
  return `${serverUrl()}/${subpath}`;
}

// Replaces anchor hrefs pointing to localhost with the Netcup API URL
function updateLoginURLWithRegex() {
  const anchors = document.querySelectorAll('ul.nav li a');
  const regexPattern = /^http:\/\/127\.0\.0\.1:(\d{4})\/(.+)/;

  anchors.forEach(anchor => {
    const currentHref = anchor.getAttribute('href');
    const match = currentHref.match(regexPattern);

    if (match) {
      const subpath = match[2];
      const newHref = `${serverUrl()}/${subpath}`;
      anchor.setAttribute('href', newHref);
      console.log('Anchor href updated to:', newHref);
    }
  });
}

// Replaces window.open links in buttons that point to localhost
function updateButtonOnclickWithRegex() {
  const regexPattern = /window\.open\('http:\/\/127\.0\.0\.1:(\d{4})\/(.+?)'\)/;
  const buttons = document.querySelectorAll('button[onclick]');

  buttons.forEach(button => {
    const onclickValue = button.getAttribute('onclick');
    const match = onclickValue.match(regexPattern);

    if (match) {
      const subpath = match[2];
      const newOnclickValue = `window.open('${serverUrl()}/${subpath}')`;
      button.setAttribute('onclick', newOnclickValue);
      console.log('Button onclick updated to:', newOnclickValue);
    }
  });
}

// Replaces window.location.href links in divs that point to localhost
function updateDivOnclickWithRegex() {
  const regexPattern = /window\.location\.href\s*=\s*"http:\/\/127\.0\.0\.1:(\d{4})\/(.+?)"/;
  const divs = document.querySelectorAll('div[onclick]');

  divs.forEach(div => {
    const onclickValue = div.getAttribute('onclick');
    const match = onclickValue.match(regexPattern);

    if (match) {
      const subpath = match[2];
      const newOnclickValue = `window.location.href = "${serverUrl()}/${subpath}"`;
      div.setAttribute('onclick', newOnclickValue);
      console.log('Div onclick updated to:', newOnclickValue);
    }
  });
}
