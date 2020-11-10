import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

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
              options={{ title: 'Welcome' }}
            />
            <Stack.Screen name="MapPage" component={MapPage} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}


// Login Page ------------------------------------------------------//
class LoginPage extends React.Component {
  render() {
    return (
      <View> 
        <Text>Login Page</Text>
        <TouchableOpacity 
          style={styles.buttonStyle}
          onPress={() =>
            this.props.navigation.navigate('MapPage', { name: 'Jane' })
          }
        >
          <Text>Go To Map</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// Map Page ------------------------------------------------------//
class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        position : {
            coords: {
              latitude: 13.736717,
              longitude: 100.523186
            }
        }
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginStyle: {
    backgroundColor: '#ddd',
  },
  mapStyle: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  buttonStyle: {
    backgroundColor: '#f00',
    padding: 10,
  },
});