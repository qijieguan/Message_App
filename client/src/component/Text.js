const Text = ({ friend, text }) => {

    var made_by = 'default';

    const handleMadeBy = () => {
        if (text.user_id === friend._id) { made_by = friend.firstname; }
        else { made_by = JSON.parse(sessionStorage.getItem('user')).firstname; }
    }

    handleMadeBy();

    const getStyle = () => {
        if ((JSON.parse(sessionStorage.getItem('user'))._id === text.user_id)) {
            return {background: 'rgb(55, 243, 243)', marginLeft: 'auto', marginRight: '3px'}
        }
    }

    return (
        <div className="text-format flex" style={getStyle()}>
            <div className='text-content'>{text.content}</div>
            <div className='text-made-by'>{made_by}</div>
        </div>
    );
}

export default Text;