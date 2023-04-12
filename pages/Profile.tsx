import * as React from 'react'
import styled from "styled-components/native";
import BottomNavbar from "../components/BottomNavbar";
import {View, Button} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ navigation }: {navigation: any}){

    const Exit = () => {
        const deleteToken = async () => {
            try {
                await AsyncStorage.removeItem('token')
            } catch (e) {
                console.log(e)
            }
        }
        deleteToken()
        navigation.navigate('Auth')
    }

    return(
        <View>
            <Background>
                <Button title={'Выйти'} onPress={Exit}></Button>
            </Background>
            <BottomNavbar stage={'Profile'} navigation={navigation}/>
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
