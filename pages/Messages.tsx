import * as React from 'react'
import styled from "styled-components/native";
import CategoriesMessage from "../components/CategoriesMessage";
import {FlatList, Text, StyleSheet, StatusBar, View} from "react-native";
import BottomNavbar from "../components/BottomNavbar";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// @ts-ignore
import { REACT_APP_SERVER_IP, REACT_WEBSOCKET } from "@env"
import { LastChat } from "../models/LastChat";


export default function Messages({ navigation }: {navigation: any}){

    const [chats, setChats] = React.useState<LastChat[]>([])

    const [token, setToken] = React.useState<string | null>('');
    const [ws, setWs] = React.useState<WebSocket>()

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
        let user_id: number;
        const getChats = async () => {
            try {
                const promise = axios({
                    method: 'get',
                    url: `${REACT_APP_SERVER_IP}/users/user_last_messages`,
                    headers: {Authorization: `Bearer ${token}`}
                })
                promise.then(res => {
                    user_id = res.data.user_id
                    setChats(res.data.user_last_messages)
                })
            } catch (error) {
                console.log(error);
            }
        };
        getChats()
        let ws = new WebSocket(`${REACT_APP_SERVER_IP}/ws`);
        ws.onopen = () => {
            console.log('1234')
            ws.send(JSON.stringify({'user_id': user_id}))
        }
        setWs(ws)
    }, [token])

    React.useEffect(() => {
        if(typeof ws === "undefined"){
            return
        }
        ws.onmessage = (e: any) => {
            const data = JSON.parse(e.data)
            let newChats = [...chats]
            let index = newChats.findIndex((e) => e.user.ID === data.sender_id)
            newChats[index].message = data
            let chat = {...newChats[index]}
            newChats.splice(index, 1)
            newChats.unshift(chat)
            setChats([...newChats])
        }
    }, [chats])

    const MessageItem = ({item}: {item: LastChat}) => {

        return(
            <MessageView onPress={() => navigation.navigate('Chat', { chat: item.chat, user: item.user })}>
                <StatusBar />
                <UserImage source={{uri: `${REACT_APP_SERVER_IP}/static/${item.user.image_src}`}}/>
                <MessageInformation>
                    <UserName>{item.user.first_name} {item.user.last_name}</UserName>
                    <Text>{item.message.text}</Text>
                </MessageInformation>
            </MessageView>
        )
    }

    return(
        <View>
            <StatusBar/>
            <Background>
                <Header>
                    <RecentImagesTitle>Сообщения</RecentImagesTitle>
                    <SearchButton onPress={() => navigation.navigate('Search')}>
                        <SearchButtonImage source={require('../assets/search-icon.png')}/>
                    </SearchButton>
                </Header>
                <CategoriesMessage />
                <FlatList data={chats} renderItem={MessageItem}/>
                <AddCategory>
                    <AddCategoryImage source={require('../assets/add-category-icon.png')}/>
                </AddCategory>
            </Background>
            <BottomNavbar stage={'Messages'} navigation={navigation}/>
        </View>
    )
}

const Background = styled.View`
  min-height: 100%;
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 70px 20px;
`

const Header = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const RecentImagesTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const SearchButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  margin-left: auto;
  margin-right: 0;
`

const SearchButtonImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const AddCategory = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  position: absolute;
  right: 20px;
  bottom: 80px;
  background-color: #2f80ed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddCategoryImage = styled.Image`
  height: 28px;
  width: 28px;
`;

const MessageView = styled.TouchableOpacity`
  width: 100%;
  height: 64px;
  border-radius: 8px;
  margin-top: 15px;
  background-color: white;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserImage = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;

const UserName = styled.Text`
  font-size: 18px;
  color: #1B1A57;
`;

const MessageInformation = styled.View`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`

var styles = StyleSheet.create({
    listView: {
        marginTop: '25px',
    },
});