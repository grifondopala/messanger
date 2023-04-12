import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import React, {useEffect} from "react";
import axios from "axios";

import AsyncStorage from '@react-native-async-storage/async-storage';

// @ts-ignore
import { REACT_APP_SERVER_IP } from "@env"

export default function Auth( { navigation }: {navigation: any}) {

    const [stage, setStage] = React.useState('sign-in');
    const [token, setToken] = React.useState<string | null>('');

    useEffect( () => {
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
            method: 'get',
            url: `${REACT_APP_SERVER_IP}/admin/user`,
            headers: {Authorization: `Bearer ${token}`}
        })
        promise.then((res) => {
            console.log('Auth:', token)
            navigation.navigate('Messages')
        }).catch((e) => {
            console.log(e)
        })
    }, [token])

    if(stage == 'sign-in') {
        return <SignIn changeStage={setStage} navigation={navigation} />;
    } else {
        return <SignUp changeStage={setStage}/>;
    }

}

const SignIn = ({changeStage, navigation}: {changeStage: any, navigation: any}) => {

    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    const SignIn = () => {
        const promise = axios({
            method: 'post',
            url: `${REACT_APP_SERVER_IP}/login`,
            data: {username, password}
        })
        promise.then((res) => {
            const storeToken = async (value: string) => {
                try {
                    await AsyncStorage.setItem('token', value)
                } catch (e) {
                    console.log(e)
                }
            }
            storeToken(res.data.token)
            navigation.navigate('Messages')
        }).catch(e => console.log(e))
    }

    return(
        <BackGround>
            <Title>Авторизация</Title>
            <Label>Логин</Label>
            <Input value={username} onChangeText={text => setUsername(text)}/>
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

    const [stage, setStage] = React.useState(true)

    const [data, setData] = React.useState({
        username: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: '',
        email: ''
    })

    const SignUp = () => {
        const {confirm_password: _, ...newData} = data;
        const promise = axios({
            method: 'post',
            url: `${REACT_APP_SERVER_IP}/register`,
            data: {newData}
        })
        promise.then((res) => {
            setStage(true)
        }).catch(e => console.log(e))
    }

    if(stage) {
        return (
            <BackGround>
                <Title>Регистрация</Title>
                <Label>Логин</Label>
                <Input value={data.username} onChangeText={text => setData({...data, username: text})}/>
                <Label>Пароль</Label>
                <Input value={data.password} onChangeText={text => setData({...data, password: text})} secureTextEntry={true}/>
                <Label>Подтвердите пароль</Label>
                <Input value={data.confirm_password} onChangeText={text => setData({...data, confirm_password: text})} secureTextEntry={true}/>
                <ButtonView>
                    <ChangeStageText onPress={() => changeStage('sign-in')}>
                        Уже есть аккаунт?
                    </ChangeStageText>
                    <ContinueButton style={styles.continueSignUp} onPress={() => setStage(false)}>
                        <ContinueButtonText>Продолжить</ContinueButtonText>
                    </ContinueButton>
                </ButtonView>
            </BackGround>
        )
    }

    return (
        <BackGround>
            <Title>Регистрация</Title>
            <Label>Имя</Label>
            <Input value={data.first_name} onChangeText={text => setData({...data, first_name: text})}/>
            <Label>Фамилия</Label>
            <Input value={data.last_name} onChangeText={text => setData({...data, last_name: text})}/>
            <Label>Почта</Label>
            <Input value={data.email} onChangeText={text => setData({...data, email: text})}/>
            <ButtonView>
                <ChangeStageText onPress={() => setStage(true)}>
                    Обратно
                </ChangeStageText>
                <ContinueButton style={styles.signUpButton} onPress={SignUp}>
                    <ContinueButtonText>Зарегистрироваться</ContinueButtonText>
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

const styles = StyleSheet.create({
    continueSignUp: {
        width: 120,
    },
    signUpButton: {
        width: 200
    }
});
