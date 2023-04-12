import * as React from 'react'
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import styled from "styled-components/native";
import {StyleSheet} from "react-native";

interface Category{
    id: number,
    text: string,
}

export default function CategoriesMessage() {

    const [data, setData] = React.useState<Category[]>([
        {id: 0, text: 'Все'},
        {id: 1, text: 'Работа'}
    ])

    const [selected, setSelected] = React.useState(0);

    const RenderItem = ({item}: {item: Category}) => {
        return(
            <TouchableOpacity onPress={() => setSelected(item.id)}>
                <View>
                    {selected === item.id ?
                        <CategoryDefault style={{backgroundColor: "#2F80ED"}}>
                            <Text style={{color: "white"}}>{item.text}</Text>
                        </CategoryDefault>
                        :
                        <CategoryDefault>
                            <Text>{item.text}</Text>
                        </CategoryDefault>
                    }
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <Categories>
            <FlatList contentContainerStyle={styles.listView} data={data} renderItem={RenderItem} horizontal={true}/>
        </Categories>
    )
}

const Categories = styled.View`
  height: 60px;
  width: 100%;
  margin-top: 15px;
`;

const CategoryDefault = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 40px;
  width: 70px;
  margin-right: 15px;
  border-radius: 10px;
`;

var styles = StyleSheet.create({
    listView: {
        flex: 1,
        alignItems: 'center',
    },
});