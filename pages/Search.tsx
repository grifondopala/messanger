import * as React from 'react'
import styled from "styled-components/native";
import BottomNavbar from "../components/BottomNavbar";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import axios from "axios";
import {User} from "../models/User";
// @ts-ignore
import { REACT_APP_SERVER_IP } from "@env"

export default function Search({ navigation }: {navigation: any}){

    const [foundData, setFoundData] = React.useState<User[]>([])

    const [search, setSearch] = React.useState("")

    const FoundList = () => {

        if(foundData.length == 0){
            return(
                <EmptyView>
                    <Text>
                        Ничего не найдено
                    </Text>
                </EmptyView>
            )
        }

        return(
            <FlatList data={foundData} renderItem={FoundUserItem} />
        )

    }

    const FoundUserItem = ({ item }: {item : User}) => {
        return(
            <UserView>
                <UserImage source={{uri: `${REACT_APP_SERVER_IP}/static/${item.image_src}`}}/>
                <MessageInformation>
                    <UserName>{item.first_name} {item.last_name}</UserName>
                    <Text>@{item.username}</Text>
                </MessageInformation>
            </UserView>
        )
    }

    const SearchUsers = () => {
        const lower = search.toLowerCase()
        const promise = axios({
            url: `${REACT_APP_SERVER_IP}/users/findUsers`,
            method: 'post',
            data: {username: lower}
        })
        promise.then((res) => {
            setFoundData(res.data.users)
        }).catch(e => console.log(e))
    }

    return(
        <View>
            <Background>
                <Title>Поиск</Title>
                <TopNavbar>
                    <SearchInput value={search} onChangeText={(text) => setSearch(text)} />
                    <SearchButton>
                        <TouchableOpacity onPress={SearchUsers}>
                            <SearchButtonText>
                                Найти
                            </SearchButtonText>
                        </TouchableOpacity>
                    </SearchButton>
                </TopNavbar>
                <FoundList/>
            </Background>
            <BottomNavbar stage={'Messages'} navigation={navigation}/>
        </View>
    )
}

const Background = styled.View`
  height: 100%;
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 70px 20px;
`

const TopNavbar = styled.View`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const SearchButton = styled.View`
  width: 70px;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-right: 0;
  margin-left: auto;
  display: flex;
  background-color: #2f80ed;
  border-radius: 5px;
`;

const SearchButtonText = styled.Text`
  color: white;
`;

const SearchInput = styled.TextInput`
  width: 70%;
  height: 40px;
  border-bottom-width: 2px;
  border-bottom-color: #2f80ed;
`;

const EmptyView = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserView = styled.View`
  width: 100%;
  height: 60px;
  background-color: white;
  margin-top: 25px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 5px;
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