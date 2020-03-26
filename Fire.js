import * as firebase from 'firebase' ; 

class Fire {
    constructor(){
        this.init()
        this.checkAuth()
    }
    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                
                    apiKey: "AIzaSyCxromQKhpWb-60MrfiWoWZe-QQrZYYU8U",
                    authDomain: "chat-68e9d.firebaseapp.com",
                    databaseURL: "https://chat-68e9d.firebaseio.com",
                    projectId: "chat-68e9d",
                    storageBucket: "chat-68e9d.appspot.com",
                    messagingSenderId: "921083325177",
                    appId: "1:921083325177:web:a704a60f45ede958745028",
                    measurementId: "G-Q3NX61177P"
                  
            }) ;
        }
        
    };
        checkAuth = ()=>{
            firebase.auth().onAuthStateChanged(user =>{
                if (!user){
                    firebase.auth().signInAnonymously(); 
                }
            })
        }
    send = messages => {
        messages.forEach(item =>{
            const message ={
                text : item.text ,
                timestamp:firebase.database.ServerValue.TIMESTAMP,
                user : item.user 
            }
            this.db.push(message)
        });
    };

    parse = message=> {
        const {user , text ,timestamp} = message.val();
        const { key: _id } = message ;
        const createAt = new Date(timestamp) ;

        return(
            _id , 
            createAt , 
            text , 
            user
        );

    };

    get = callback => {
        this.db.on('child_added',snapshot => callback(this.parse(snapshot))); 
    };
    off(){
        this.db.off() 
    }
    

    get db() {
        return firebase.database().ref("messages"); 
    }

    get uid(){
        return (firebase.auth().currentUser || {}).uid 
    }
}
export default new Fire() ; 