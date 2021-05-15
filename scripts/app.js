const chatList =document.querySelector('.chat-list')
const chatForm =document.querySelector('.new-chat')

const listUi= new ChatUi(chatList);
const chatroom = new Chatroom('general','padam');

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


})



