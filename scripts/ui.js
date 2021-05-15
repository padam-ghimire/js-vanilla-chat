
class ChatUi{

    constructor(list){
        this.list=list;
    }


    render(data){
        const timeDistance = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix:true}
        )
        const html=`
            <li class="list-group-item">
                <span class="username"> ${data.username} </span>
                <span class="message"> ${data.message}</span>
                <div class="time">${timeDistance}</div>
            </li>
        `
        this.list.innerHTML += html;
    }


}