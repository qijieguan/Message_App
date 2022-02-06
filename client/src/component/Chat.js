const Chat = ({ chat, getSelect }) => {
    return (
        <div id="chat" onClick={() => getSelect(chat._id)}>
            <img src={chat.image_url} alt=""/>
            <h1>{chat.firstname} {chat.lastname}</h1>
        </div>
    );
}

export default Chat;