function toggleSignIn(e) {
            e.preventDefault();
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function(userCredential) {
                    var user = userCredential.user;
                    alert('Login successful!');
                    window.location.replace("./p/dashboard.html"); // Redirect to main page
                })
                .catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else {
                        alert('Login failed: ' + errorMessage);
                    }
                });
        }

        // Initialize Firebase and add your configuration here

        document.getElementById('access').addEventListener('click', toggleSignIn, false);
