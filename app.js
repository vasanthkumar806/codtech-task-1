// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXqBzML3YK86CakLuDsgnvZVp0a6cQw1Q",
  authDomain: "codtechit-f2d93.firebaseapp.com",
  projectId: "codtechit-f2d93",
  storageBucket: "codtechit-f2d93.appspot.com",
  messagingSenderId: "846062389114",
  appId: "1:846062389114:web:91ca596517cc6d238f38c3",
  measurementId: "G-GMSRBY8320"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Authenticate the user anonymously
signInAnonymously(auth).catch((error) => {
  console.error(error);
});

// References
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Send message to Firebase
sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message.trim() !== '') {
    push(ref(database, 'messages'), {
      text: message,
      timestamp: Date.now()
    });
    messageInput.value = '';
  }
});

// Receive messages from Firebase
onChildAdded(ref(database, 'messages'), (snapshot) => {
  const message = snapshot.val();
  const messageElement = document.createElement('div');
  messageElement.textContent = message.text;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
});
