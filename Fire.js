import firebase from 'firebase' 
require ('firebase/firestore')
import FirebaseKeys from './config'

// import {} from ''
// 
    // firebase.initializeApp(config);

class Fire{
    connect = async(uid) => {
        // const remoteUri = await this.uploadPhotoAsync(localUri,`photos/${this.uid}/${Date.now()}` )

        // const path = `connections/${this.uid}` 
        let db = this.firestore.collection("connections").doc(this.uid)

        // return new Promise((res,rej)=>{
            // this.firestore.collection("connections")
            db
            .set({
                // text,
                uid: uid,
                timeStamp: this.timeStamp,
                // image: remoteUri
            }, {merge: true})
            // .then(ref => {
            //     res(ref)
            // }).catch(error => {
            //     rej(error)
            // })
        // })
    }

    
    

    uploadPhotoAsync = async (uri, filename) => {
        // const path = `${this.uid}/images/${filename}.jpg` 

        return new Promise(async (res,rej)=> {
            const response = await fetch(uri)
            const file = await response.blob()

            let upload = firebase.storage().ref(filename).put(file)

            upload.on("state_changed", snapshot => {}, err => { rej(err)}, 
            async() => { 
                const url = await upload.snapshot.ref.getDownloadURL()
                res(url);
             } )
        })    
    };

    // getConnections = async user => {
        
    // }
    
    createUser = async user => {
        let remoteUri = null

        try{
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            
            
            let db = this.firestore.collection("users").doc(this.uid)

            db.set({
                name: user.name,
                email: user.email,
                avatar: null
            })

            if(user.avatar){
                remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`)

                db.set({avatar: remoteUri}, {merge: true})
            }
        } 
        catch(error){
            alert("Error Found: ", error)
        }
    }

    send = messages =>{
        messages.forEach(item => {
            const message = {
                text: item.text,
                timeStamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }

            this.db.push(message)
        })
    }

    parse = message =>{
        const{user,text,timeStamp} = message.val();
        const{key: _id} = message;
        const createAt = new Date(timeStamp);

        return{
            _id,
            createAt,
            text,
            user
        }
    }

    // currentUser = () => {
    //     firebase.auth().currentUser;
    // }

    get = callback =>{
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)))
    }

    off() {
        this.db.off()
    }

    updateUserStuff = async user =>{
        let db = this.firestore.collection("users").doc(this.uid)

        db.update({
            insta: user.insta,
            twitter: user.twitter,
            whatsapp: user.whatsapp,
            bio: user.bio
          });
    }

    signOut = () => {
        firebase.auth().signOut();
    };
    
    get firestore() {
        return firebase.firestore()
    }

    get uid(){
        return  (firebase.auth().currentUser || {}).uid;
    }

    get timeStamp() {
        return Date.now()
    }

    get db(){
        return firebase.database().ref("messages")
    }

    // createFaceUser = () => {
    //     firebase.auth().
    // }
}

Fire.shared = new Fire();
export default Fire;