import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, SafeAreaView, View, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// App Page (Index page) ------------------------------------------------------//
export default class App extends React.Component {
  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
            />
            <Stack.Screen name="ListPOI" component={ListPOI} />
            <Stack.Screen name="MapPage" component={MapPage} />
            <Stack.Screen name="TestPage" component={TestPage} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}


// Login Page ------------------------------------------------------//
class LoginPage extends React.Component {
  render() {

    return (
      <View style={styles.container}> 
         <Image
          style={styles.logo}
          // source={logoLogin}
          source={require('./assets/tnl-login-logo3x.png')}
        />
        <TouchableOpacity 
          style={styles.buttonStyle}
          onPress={() =>
            this.props.navigation.navigate('ListPOI', { name: 'Jane' })
          }
        >
          <Text>Go To Map</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// List Page ------------------------------------------------------//
class ListPOI extends React.Component {
  render() {
    const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        image: './assets/tnl-maker3x.png',
        position : {
          coords: {
            latitude: 13.736717,
            longitude: 100.523186
          }
      }
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        image: './assets/tnl-maker3x.png',
        position : {
          coords: {
            latitude: 13.836717,
            longitude: 100.423186
          }
      }
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        image: './assets/tnl-maker3x.png',
        position : {
          coords: {
            latitude: 13.936717,
            longitude: 100.323186
          }
        }
      },
    ];

    const renderItem = ({item}) => (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('MapPage', { position: item.position })
        }
      >
        <View style={styles.item} >
          <Image style={styles.itemImage} source={require('./assets/tnl-marker3x.png')} />
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <SafeAreaView style={styles.containerList}>
        {/* <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} /> */}
        
        <FlatList 
          data={ DATA } 
          renderItem={ renderItem }
         />
      </SafeAreaView>
    );
  }
}

// Map Page ------------------------------------------------------//
class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        position: this.props.route.params.position,
    }
  }

  render() {
    return (
      <MapView style={styles.mapStyle} 
      initialRegion={{
        latitude: this.state.position.coords.latitude,
        longitude: this.state.position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <MapView.Marker 
        coordinate= {{
          latitude: this.state.position.coords.latitude,
          longitude: this.state.position.coords.longitude
      }}

        title={"Test"}
        description={"Descript Test"}
      />
    </MapView>
    );
  }
}

// Test Page ------------------------------------------------------//
class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: this.props.route.params.coords
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>result: {JSON.stringify(this.state.position)}</Text>
      </View>
    );
  }
}

// StyelSheet (CSS) ------------------------------------------------------//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerList: {
    flex: 1,
    marginTop: 0,
  },
  item: {
    backgroundColor: '#bbb',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  itemImage: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 32,
  },
  mapStyle: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  buttonStyle: {
    backgroundColor: '#008c00',
    padding: 10,  
  },tinyLogo: {
    alignItems: 'center',
  },
  logo: {
    width: 240,
    // height: '100%',
    resizeMode: 'contain',
  },
});