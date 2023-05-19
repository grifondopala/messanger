import * as React from 'react'
import styled from "styled-components/native";

// @ts-ignore
import { REACT_APP_SERVER_IP } from "@env"
import { User } from "../models/User";

export function UserNavbar({navigation ,user}: {navigation: any, user: User}){


    return(
        <BackGround>
            <BackButton onPress={() => navigation.goBack()}>
                <BackImage source={require('../assets/back-icon.png')}/>
            </BackButton>
            <UserImage source={{uri: `${REACT_APP_SERVER_IP}/static/${user.image_src}`}}/>
            <UserName>{user.first_name} {user.last_name}</UserName>
        </BackGround>
    )

}

const BackGround = styled.View`
    background-color: white;
    height: 60px;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    z-index: 100;
`;

const BackButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`

const BackImage = styled.Image`
  width: 100%;
  height: 100%;
`

const UserImage = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin-left: 10px;
`;

const UserName = styled.Text`
  font-size: 18px;
  color: #1B1A57;
  margin-left: 10px;
`;


