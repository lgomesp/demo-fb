//buttons
var authEmailPassButton = document.getElementById('authEmailPassButton');
var createUserButton = document.getElementById('createUserButton');
var authGitHubButton = document.getElementById('authGitHubButton');
var authFacebookButton = document.getElementById('authFacebookButton');
var authTwitterButton = document.getElementById('authTwitterButton');
var authGoogleButton = document.getElementById('authGoogleButton');
var authAnonymouslyButton = document.getElementById('authAnonymouslyButton');
var logOutButton = document.getElementById('logOutButton');

//inputs
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');

//displays
var displayName = document.getElementById('displayName');

//criar usuario
createUserButton.addEventListener('click', function(){
    firebase
        .auth()
        .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function (){
            alert('Bem Vindo ' + emailInput.value);
        })
        .catch(function (error){
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao cadastrar, verifique o console')
        });
});

authEmailPassButton.addEventListener('click', function() {
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value) //retorna uma promisse
        .then(function (result) {
            console.log(result);
            displayName.innerText = 'Bem Vindo, ' + emailInput.value;
            alert('Autenticado ' + emailInput.value); 
        })
        .catch( function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar, verifique o console')
        })
});

logOutButton.addEventListener('click', function() {
    firebase
        .auth()
        .signOut()
        .then(function () {
            displayName.innerText = 'Você não está autenticado';
            alert('Você se deslogou');
        }, function(error){
            console.error(error);
        });
});

authAnonymouslyButton.addEventListener('click', function() {
    firebase
        .auth()
        .signInAnonymously()
        .then(function (result) {
            console.log(result);
            displayName.innerText = 'Bem Vindo, desconhecido';
            alert('Autenticado Anonimamente '); 
        })
        .catch( function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar, verifique o console')
        })
});

//https://github.com/settings/applications/new
//ficar atento às permissões no firebase
authGitHubButton.addEventListener('click', function() {
    //providers
    var provider = new firebase.auth.GithubAuthProvider();
    signIn(provider);
});

function signIn(provider) {
    firebase.auth()
    .signInWithPopup(provider) //popup e redirect
    .then(function(result) {
        console.log(result);
        var token = result.credential.accessToken;
        displayName.innerText = 'Bem vindo, ' + result.user.displayName;
    }). catch (function (error) {
        console.log(error);
        alert('Falha na autenticação');
    });
}

authGoogleButton.addEventListener('click', function() {
    //providers
    var provider = new firebase.auth.GoogleAuthProvider();
    signIn(provider);
});

//https://apps.twitter.com/
authTwitterButton.addEventListener('click', function() {
    //providers
    var provider = new firebase.auth.TwitterAuthProvider();
    signIn(provider);
});


authFacebookButton.addEventListener('click', function() {
    //providers
    var provider = new firebase.auth.FacebookAuthProvider();
    signIn(provider);
});




