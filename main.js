// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  const heartIcon = document.querySelector('#heart-icon'); // Select the heart element

  // Ensure the heart is initialized with an empty heart
  heartIcon.textContent = EMPTY_HEART;

  // Add event listener for click on the heart
  heartIcon.addEventListener('click', (e) => {
    if (heartIcon.classList.contains('activated-heart')) {
      // If heart is already full, un-like it (empty the heart)
      heartIcon.textContent = EMPTY_HEART;  // Change the heart to empty
      heartIcon.classList.remove('activated-heart'); // Remove the filled class
    } else {
      // If heart is empty, like it (fill the heart)
      mimicServerCall()
        .then(() => {
          // On success, fill the heart
          heartIcon.textContent = FULL_HEART;  // Change the heart to full
          heartIcon.classList.add('activated-heart');  // Add the filled class to the heart
        })
        .catch((error) => {
          // On failure, show the error modal
          const modal = document.getElementById('modal');
          const errorMessage = document.getElementById('error-message');
          errorMessage.textContent = 'Something went wrong. Please try again.'; // Set the error message
          modal.classList.remove('hidden'); // Show the modal

          // Hide the modal after 3 seconds
          setTimeout(() => {
            modal.classList.add('hidden'); // Hide the modal
          }, 3000);
        });
    }
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
