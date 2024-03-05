//Add Friend Request
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if(listBtnAddFriend.length > 0) {
    listBtnAddFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("add");

            const userId = button.getAttribute("btn-add-friend");

            socket.emit("CLIENT_ADD_FRIEND", userId);
        });
    });
}
//End Add Friend Request

// CLIENT_CANCEL_FRIEND
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if(listBtnCancelFriend.length > 0){
    listBtnCancelFriend.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.box-user').classList.remove('add');

            const userId = button.getAttribute('btn-cancel-friend');

            socket.emit('CLIENT_CANCEL_FRIEND', userId);
        });
    });
}
// CLIENT_CANCEL_FRIEND

//CLIENT_REFUSE_FRIEND
const listBtnRefuseFriend = document.querySelectorAll('[btn-refuse-friend]');
if(listBtnRefuseFriend.length > 0){
    listBtnRefuseFriend.forEach(button => {
        button.addEventListener('click', () => {
            button.closest(".box-user").classList.add("refuse");

            const userId = button.getAttribute('btn-refuse-friend');

            socket.emit('CLIENT_REFUSE_FRIEND', userId);
        });
    });
}
//End CLIENT_REFUSE_FRIEND