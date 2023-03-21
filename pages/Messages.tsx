import * as React from 'react'
import styled from "styled-components/native";

export default function Messages(){
    return(
        <Background>
            <Header>
                <RecentImagesTitle>Сообщения</RecentImagesTitle>
                <SearchButton>
                    <SearchButtonImage source={require('../assets/search-icon.png')}/>
                </SearchButton>
            </Header>
            <AddCategory>
                <AddCategoryImage source={require('../assets/add-category-icon.png')}/>
            </AddCategory>
        </Background>
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

const Header = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const RecentImagesTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const SearchButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  margin-left: auto;
  margin-right: 0;
`

const SearchButtonImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const AddCategory = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  position: absolute;
  right: 20px;
  bottom: 80px;
  background-color: #2f80ed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddCategoryImage = styled.Image`
  height: 28px;
  width: 28px;
`;