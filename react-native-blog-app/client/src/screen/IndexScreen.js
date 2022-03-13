import React, { useContext, useEffect} from 'react'
import { Text, View, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native'
import { Context } from '../context/BlogContext'
import { Feather } from '@expo/vector-icons';

const IndexScreen = ( { navigation }) => {
  // console.log(v=navigation)
  const {state, deleteBlogPost, getBlogPosts} = useContext(Context)

  useEffect(() => {
    getBlogPosts();

    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <>
      <FlatList
        data={state}
        keyExtractor={blogPost => blogPost.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={()=> navigation.navigate('Show', {id: item.id})}>
              <View style={sytles.row}>
              <Text style={sytles.title}>{item.title} - {item.id}</Text>
              <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
              <Feather style={sytles.icon} name="trash" />
              </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        }}
    />
    </>
  )
}

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
}

const sytles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'grey'
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24
  }
})

export default IndexScreen