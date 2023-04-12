import {Chat} from "./Chat";
import {Message} from "./Message";
import {User} from "./User";

export interface LastChat{
    chat: Chat,
    message: Message,
    user: User
}