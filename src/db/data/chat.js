import { pradeepImage, chandanImage, ritikImage, kalpeshImage } from '../../assets/images/friends'
import { USER1, USER2, USER3, USER4 } from '../../constants/user'

export const chats = [
    {
        id : 1,
        user_name : USER1,
        image : pradeepImage,
        time : '01:34 PM',
        message : 'Hii',
        unread : false,
        clientMessageStatus : 'delivered', // [read, sent, delivered, incoming]
        lines:'2',
    },
    {
        id : 2,
        user_name : USER2,
        image: chandanImage,
        time : '09:23 PM',
        message : 'Kysa hai',
        unread : false,
        clientMessageStatus : 'sent', // [read, sent, delivered, incoming]
        lines:'2',
    },
    {
        id : 3,
        user_name : USER3,
        image: ritikImage,
        time : 'Yesterday',
        message : 'Or bhai',
        unread : false,
        clientMessageStatus : 'read', // [read, sent, delivered, incoming]
        lines:'2',
    },
    {
        id : 4,
        user_name : USER4,
        image: kalpeshImage,
        time : '19/03/2024',
        message : 'Pyse to dede bhai',
        unread : true,
        clientMessageStatus : 'incoming',// [read, sent, delivered, incoming]
        lines:'2',
    },
]