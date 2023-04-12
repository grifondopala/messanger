import * as React from "react";
import styled from "styled-components/native";

export default function BottomNavbar({stage, navigation}: {stage: string, navigation: any}) {

    const setStage = (value: string) => {
        navigation.navigate(value)
    }

    return(
        <BackGround>
            <NavButton onPress={() => setStage('Messages')}>
                {stage === 'Messages' ?
                    <NavImage source={require('../assets/message_blue.png')}/> :
                    <NavImage source={require('../assets/message_gray.png')}/>
                }
            </NavButton>
            <NavButton onPress={() => setStage('Clock')}>
                {stage === 'Clock' ?
                    <NavImage source={require('../assets/clock_blue.png')}/> :
                    <NavImage source={require('../assets/clock_gray.png')}/>
                }
            </NavButton>
            <NavButton onPress={() => setStage('Phone')}>
                {stage === 'Phone' ?
                    <NavImage source={require('../assets/phone_blue.png')}/> :
                    <NavImage source={require('../assets/phone_gray.png')}/>
                }
            </NavButton>
            <NavButton onPress={() => setStage('Profile')}>
                {stage === 'Profile' ?
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
    z-index: 100;
`;

const NavButton = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
`;

const NavImage = styled.Image`
  width: 100%;
  height: 100%;
`;
