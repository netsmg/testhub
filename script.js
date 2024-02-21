// Your web app's Firebase configuration
var firebaseConfig = {
 apiKey: "AIzaSyB6_twOhogk9QSRWVQQ1QAekLed-cqNVgQ",
 authDomain: "contact-database-9c47b.firebaseapp.com",
  databaseURL: "https://contact-database-9c47b-default-rtdb.firebaseio.com",
  projectId: "contact-database-9c47b",
  storageBucket: "contact-database-9c47b.appspot.com",
  messagingSenderId: "118822537955",
  appId: "1:118822537955:web:3ef795baeadbe37b7293d6",
  measurementId: "G-0WY0798WFC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("Please Tell Us Your Name");

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("chat/" + timestamp).set({
    username,
    message,
  });
}

// Reference the collection created earlier
const fetchChat = db.ref("chat/");

let messageCount = 0; // Track the order of messages

// Check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function(snapshot) {
  const messageData = snapshot.val();
  
  // Determine the CSS class based on the order of messages
  const messageClass = messageCount % 2 === 0 ? "blue sent" : "orange receive";
  
  const messageHTML = `
    <div class="container">
      <div class="message-${messageClass}">
        <div class="message-timestamp-left">${messageData.username}</div>
        <p class="message-content">${messageData.message}</p>
      </div>
    </div>`;
  
  // Increment the message count for the next message
  messageCount++;
  
  // Append the message to the page
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML += messageHTML;
});
