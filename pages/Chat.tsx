import * as React from 'react'


import {InputMessage} from "../components/InputMessage";
import {UserNavbar} from "../components/UserNavbar";
import axios from "axios";

// @ts-ignore
import { REACT_APP_SERVER_IP, REACT_WEBSOCKET } from "@env"
import {Message} from "../models/Message";
import styled from "styled-components/native";
import {FlatList, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Chat({ route, navigation }: {route: any, navigation: any}){

    let { chat, user } = route.params;

    const [messages, setMessages] = React.useState<Message[]>([])
    const [token, setToken] = React.useState<string | null>('')
    const [userId, setUserId] = React.useState(0)

    const [ws, setWs] = React.useState<any>()

    React.useEffect(() => {
        const getToken = async () => {
            try {
                const value = await AsyncStorage.getItem('token');
                setToken(value);
            } catch (error) {
                console.log(error);
            }
        };
        getToken();
        if (token == null || token == '') {
            return;
        }
        const promise = axios({
            method: 'post',
            url: `${REACT_APP_SERVER_IP}/chats/all_messages`,
            data: {...chat},
            headers: {Authorization: `Bearer ${token}`},
        })
        let id = 0;
        promise.then(res => {
            setMessages(res.data.all_messages)
            setUserId(res.data.user_id)
            id = res.data.user_id;
        })

        let ws = new WebSocket(`${REACT_APP_SERVER_IP}/ws/getMessage`);
        ws.onopen = () => {
            ws.send(JSON.stringify({user_id: id, companion_id: user.ID}))
        }
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)
            console.log('Пришло здесь и сейчас', data)
            const newData = [...messages]
            newData.push(data)
            setMessages(newData)
        }
        setWs(ws)
    }, [chat.id, token])

    React.useEffect(() => {
        if(typeof ws === "undefined"){
            return
        }
        ws.onmessage = (e: any) => {
            const data = JSON.parse(e.data)
            console.log('Пришло здесь и сейчас', data)
            const newData = [...messages]
            newData.push(data)
            setMessages(newData)
        }
    }, [messages, userId])

    const MessageItem = ({item}: {item: Message}) => {

        if(item.sender_id === user.ID){
            return(
                <MessageView>
                    <Text>{item.text}</Text>
                </MessageView>
            )
        }

        return(
            <MessageView style={{marginLeft: 'auto'}}>
                <Text>{item.text}</Text>
            </MessageView>
        )
    }

    return(
        <View>
            <UserNavbar navigation={navigation} user={user}/>
            <InputMessage userId={userId} chatId={chat.ID} setMessages={setMessages} companionId={user.ID}/>
            <Background>
                <FlatList data={messages} renderItem={MessageItem}/>
            </Background>
        </View>
    )
}

const Background = styled.View`
  min-height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  padding: 70px 20px 70px 20px;
`

const MessageView = styled.View`
  width: 60%;
  background-color: white;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;
