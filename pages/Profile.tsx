import * as React from 'react'
import styled from "styled-components/native";
import BottomNavbar from "../components/BottomNavbar";
import {View, Button, Image} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

import * as ImagePicker from 'expo-image-picker';


// @ts-ignore
import { REACT_APP_SERVER_IP } from "@env"
import {User} from "../models/User";

export default function Profile({ navigation }: {navigation: any}){

    const [token, setToken] = React.useState<string | null>('')
    const [user, setUser] = React.useState<User>()

    const [image, setImage] = React.useState<any>(null);

    React.useEffect(() => {
        const getToken = async () => {
            try {
                const value = await AsyncStorage.getItem('token');
                setToken(value);
            } catch (error) {
                console.log(error);
            }
        }
        getToken();
        if (token == null || token == '') {
            return;
        }
        const promise = axios({
            method: 'get',
            url: `${REACT_APP_SERVER_IP}/users/getUser`,
            headers: {Authorization: `Bearer ${token}`}
        })
        promise.then(res => {
            setUser(res.data.user)
        })
    }, [token])

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

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        let localUri = result.assets[0].uri;
        let filename = localUri.split('/').pop();

        // @ts-ignore
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        //@ts-ignore
        formData.append('photo', { uri: localUri, name: filename, type });

        const resultPromise = await fetch(`${REACT_APP_SERVER_IP}/users/savePhoto`, {
            method: 'POST',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        }).then((res) => res.json());

        console.log(resultPromise.image_src)
        //@ts-ignore
        setUser({...user, image_src: resultPromise.image_src})
    };

    if(typeof user == 'undefined') return (
        <View>
            <Background>
                <Button title={'Выйти'} onPress={Exit}></Button>
            </Background>
            <BottomNavbar stage={'Profile'} navigation={navigation}/>
        </View>
    )

    return(
        <View>
            <Background>
                <PhotoView>
                    <Photo source={{uri: `${REACT_APP_SERVER_IP}/static/${user.image_src}`}}/>
                    <ChangePhoto onPress={pickImage}>
                        <Image source={require('../assets/camera.png')}/>
                    </ChangePhoto>
                </PhotoView>

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
  padding: 0px 0px 70px 0px;
`

const Photo = styled.Image`
  width: 100%;
  aspect-ratio: 1/1;
  resizeMode: contain;
`;

const PhotoView = styled.View`
  width: 100%;
`

const ChangePhoto = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 20px;
  background-color: green;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;