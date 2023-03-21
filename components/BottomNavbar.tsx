import * as React from "react";
import styled from "styled-components/native";

export default function BottomNavbar({stage, setStage}: {stage: string, setStage: any}) {
    return(
        <BackGround>
            <NavButton onPress={() => setStage('messages')}>
                {stage === 'messages' ?
                    <NavImage source={require('../assets/message_blue.png')}/> :
                    <NavImage source={require('../assets/message_gray.png')}/>
                }
            </NavButton>
            <NavButton onPress={() => setStage('clock')}>
                {stage === 'clock' ?
                    <NavImage source={require('../assets/clock_blue.png')}/> :
                    <NavImage source={require('../assets/clock_gray.png')}/>
                }
            </NavButton>
            <NavButton onPress={() => setStage('phone')}>
                {stage === 'phone' ?
                    <NavImage source={require('../assets/phone_blue.png')}/> :
                    <NavImage source={require('../assets/phone_gray.png')}/>
                }
            </NavButton>
            <NavButton onPress={() => setStage('profile')}>
                {stage === 'profile' ?
                    <NavImage source={require('../assets/profile_blue.png')}/> :
                    <NavImage source={require('../assets/profile_gray.png')}/>
                }
            </NavButton>
        </BackGround>
    )
}

const BackGround = styled.View`
    background-color: white;
    height: 50px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

const NavButton = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
`;

const NavImage = styled.Image`
  width: 100%;
  height: 100%;
`;
