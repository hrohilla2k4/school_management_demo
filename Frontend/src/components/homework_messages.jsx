import axios from "axios";
const Homeworkmsg = () => {
    axios.post('http://localhost:3000/chat/sendmessage/8684809123', {
        message: 'Hello World',
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default Homeworkmsg