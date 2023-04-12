import * as React from 'react'
import styled from "styled-components/native";
import BottomNavbar from "../components/BottomNavbar";
import {View} from "react-native";

export default function Clock({ navigation }: {navigation: any}){
    return(
        <View>
            <Background>

            </Background>
            <BottomNavbar stage={'Clock'} navigation={navigation}/>
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
