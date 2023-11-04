var config = {
    apiKey: "AIzademo",
    authDomain: "puzzles-demo.firebaseapp.com",
    databaseURL: "https://puzzles-demo.firebaseio.com",
    projectId: "puzzles-demo",
    storageBucket: "puzzles-demo.appspot.com",
    messagingSenderId: "1000000000000000",
    appId: "1:1000000000:web:demo29958",
    measurementId: "G-demo"
  };
  var adminEmail = "";
  firebase.initializeApp(config);

    firebase.auth.Auth.Persistence.LOCAL; 

    $("#btn-login").click(function(){
        
        var email = $("#email").val();
        var password = $("#password").val(); 

       //=======Remote Config=========//
       const remoteConfig = firebase.remoteConfig();

       remoteConfig.settings.minimumFetchIntervalMillis = 1000;
    
       remoteConfig.fetchAndActivate()
       .then(() => {

         adminEmail = remoteConfig.getValue("email")._value;

         console.log('email',version);

       })
       .catch((err) => {
         console.log(err);
       });
       //=============================//
       if(adminEmail ==  email){
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
            // user signed in
         }).catch(function(error) {
             var errorCode = error.code;
             var errorMessage = error.message;
         
             if (errorCode === 'auth/wrong-password') {
                 alert('Wrong password.');
             } else {
                 alert("Please check the email");         
             }
             console.log("Please check your inputs");
         });
       }else{
        alert("Please insert the assigned admin email");         
       }
       
        //

    });
   
    $("#btn-logout").click(function(){
        firebase.auth().signOut();
    });

    function switchView(view){
        $.get({
            url:view,
            cache: false,  
        }).then(function(data){
            $("#container").html(data);
        });
    }