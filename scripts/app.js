const chatList =document.querySelector('.chat-list')
const chatForm =document.querySelector('.new-chat')
const newName =document.querySelector('.new-name')
const updateMessage =document.querySelector('.update-mssg')
const chatRooms =document.querySelector('.chat-rooms')


// check if username exist in localstorage

const username = localStorage.username ? localStorage.username : "unkonwn"


const listUi= new ChatUi(chatList);
const chatroom = new Chatroom('general',username);

chatroom.getChats((data)=>{
    listUi.render(data)
});

chatForm.addEventListener('submit',(e)=>{

    e.preventDefault();
    const message = chatForm.message.value.trim();
    chatroom.addChat(message)
        .then(()=>{
            console.log("Message sent")
        })
        .catch((error)=>{
            console.log(error)

        })
    chatForm.reset();


});

chatRooms.addEventListener('click',(e)=>{

    if(e.target.tagName==="BUTTON"){
        listUi.clear();

        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats((chats)=>{
            listUi.render(chats)
        });
        
    }

});

newName.addEventListener('submit',(e)=>{

    e.preventDefault();
    const name  = newName.name.value.trim();
    chatroom.updateName(name)
    newName.reset()
    updateMessage.innerText=`You name has been updated to ${name}`;

    setTimeout(()=>updateMessage.innerText='',3000)
})



