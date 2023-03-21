import * as React from 'react'
import {StatusBar, Text, View} from "react-native";
import styled from "styled-components/native";
import BottomNavbar from "../components/BottomNavbar";
import Messages from "./Messages";

export default function Main() {

    const [stage, setStage] = React.useState('messages');

    return(
        <Background>
            {stage === 'messages' ? <Messages/> : <View></View>}
            <StatusBar />
            <BottomNavbar stage={stage} setStage={setStage}/>
        </Background>
    )
}

const Background = styled.View`
  background-color: #f7f7f7;
  min-width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: row;
`;