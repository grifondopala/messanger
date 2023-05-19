import * as React from 'react'
import styled from "styled-components/native";
import axios from "axios";

// @ts-ignore
import { REACT_APP_SERVER_IP, REACT_WEBSOCKET } from "@env"
import {Message} from "../models/Message";

export function InputMessage({userId, chatId, setMessages, companionId}: {userId: number, chatId: number, setMessages: any, companionId: number}){

    const [text, setText] = React.useState('')

    const SendMessage = () => {
        if(text == '') return;
        const promise = axios({
            method: 'post',
            url: `${REACT_APP_SERVER_IP}/messages/create`,
            data: {chat_id: chatId, sender_id: userId, text},
        })
        promise.then((res: any) => {
            setMessages((value: Message[]) => [...value, res.data.message])
            setText('')
            var ws = new WebSocket(`${REACT_APP_SERVER_IP}/ws/sendMessage`);
            ws.onopen = () => {
                //ws.send(JSON.stringify({user_id: companionId, sender_id: userId, text}))
                ws.send(JSON.stringify({user_id: companionId, message: res.data.message}))
            }
        })
    }

    return(
        <BackGround>
            <Smile>
                <ButtonImage source={require('../assets/smile.png')} />
            </Smile>
            <MessageInput placeholder={'Введите сообщение'} multiline={true} value={text} onChangeText={(text) => setText(text)}/>
            <Clip>
                <ButtonImage source={require('../assets/clip.png')} />
            </Clip>
            <Send onPress={SendMessage}>
                <ButtonImage source={require('../assets/send.png')} />
            </Send>
        </BackGround>
    )

}

const BackGround = styled.View`
    background-color: white;
    z-index: 100;
    height: 50px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
`;

const Smile = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`

const ButtonImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const MessageInput = styled.TextInput`
  margin-left: 10px;
  font-size: 18px;
  width: 70%
`;

const Clip = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  margin-left: auto;
  margin-right: 10px;
`;

const Send = styled.TouchableOpacity`
  width: 24px;
  height: 24px;    
`;


