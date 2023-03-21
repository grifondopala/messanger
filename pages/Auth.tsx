import {Button, StatusBar, Text, View} from "react-native";
import styled from "styled-components/native";
import React from "react";
import axios from "axios";

export default function Auth( { navigation }: {navigation: any}) {

    const [stage, setStage] = React.useState('sign-in');

    if(stage == 'sign-in') {
        return <SignIn changeStage={setStage} navigation={navigation} />;
    } else {
        return <SignUp changeStage={setStage}/>;
    }

}

const SignIn = ({changeStage, navigation}: {changeStage: any, navigation: any}) => {

    const [login, setLogin] = React.useState("")
    const [password, setPassword] = React.useState("")

    const SignIn = () => {
        // const promise = axios({
        //     method: 'post',
        //     url: ``,
        //     data: {login, password}
        // })
        // promise.then((res) => {
        //
        // })
        navigation.navigate('Main');
    }

    return(
        <BackGround>
            <Title>Авторизация</Title>
            <Label>Логин</Label>
            <Input value={login} onChangeText={text => setLogin(text)}/>
            <Label>Пароль</Label>
            <Input value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}/>
            <ButtonView>
                <ChangeStageText onPress={() => changeStage('sign-up')}>
                    Ещё нет аккаунта?
                </ChangeStageText>
                <ContinueButton onPress={SignIn}>
                    <ContinueButtonText>Войти</ContinueButtonText>
                </ContinueButton>
            </ButtonView>
        </BackGround>
    )
}

const SignUp = ({changeStage}: {changeStage: any}) => {

    const [login, setLogin] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")

    return(
        <BackGround>
            <Title>Регистрация</Title>
            <Label>Логин</Label>
            <Input value={login} onChangeText={text => setLogin(text)}/>
            <Label>Пароль</Label>
            <Input value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}/>
            <Label>Подтвердите пароль</Label>
            <Input  value={confirmPassword} onChangeText={text => setConfirmPassword(text)} secureTextEntry={true}/>
            <ButtonView>
                <ChangeStageText onPress={() => changeStage('sign-in')}>
                    Уже есть аккаунт?
                </ChangeStageText>
                <ContinueButton>
                    <ContinueButtonText>Войти</ContinueButtonText>
                </ContinueButton>
            </ButtonView>
        </BackGround>
    )
}


const BackGround = styled.View`
  background-color: #f7f7f7;
  min-width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 28px;
  color: #1b1a57;
`;

const Input = styled.TextInput`
  width: 80%;
  border-bottom-width: 2px;
  border-bottom-color: #2f80ed;
`;

const Label = styled.Text`
  font-size: 18px;
  text-align: left;
  width: 80%;
  margin-top: 15px;
`;

const ButtonView = styled.View`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ContinueButton = styled.TouchableOpacity`
  width: 80px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2f80ed;
  color: white;
`;

const ContinueButtonText = styled.Text`
  color: white;
  font-size: 18px;
`;

const ChangeStageText = styled.Text`
  font-size: 18px;
  text-decoration: underline;
  margin-right: 15px;
`;