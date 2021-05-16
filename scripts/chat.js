class Chatroom{

    constructor(room,username){

        this.room=room;
        this.username=username;
        this.chats=db.collection('chats');
        this.unsub;

    }

   async addChat(message) {
     
        const date = new Date();
        const chat={
            message,
            username:this.username,
            room:this.room,
            created_at:firebase.firestore.Timestamp.fromDate(date)
        };
    
        // saving chats
        const response = this.chats.add(chat);
        return response;
    }

    getChats(callback){
       this.unsub = this.chats
        .where('room','==',this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot=>{

            snapshot.docChanges().forEach(change=>{
                if(change.type==='added'){
                    callback(change.doc.data())
                }
            })
        })
    }

    updateName(username){
        this.username = username;
        localStorage.setItem('username', this.username)
    }

    updateRoom(room){
        this.room = room;
        if(this.unsub){
            console.log("Room updated")
            this.unsub();
        }
    }

}
