import { NavigationContainer } from "@react-navigation/native";

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import HomeScreen from "../screens/home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InfoScreen from "../screens/info";
import CustomBottomTabBar from "../components/bottom-tab-bar";
import EmptyScreen from "../screens/empty";

export type RootStackList = {
  First: undefined;
  Second: undefined;
  Third: undefined;
};

export type HomeStackList = {
  Home: undefined;
  Form: { id?: number };
};

export type RootStackProps = NativeStackNavigationProp<RootStackList>;
export type HomeStackProps = NativeStackNavigationProp<HomeStackList>;

const Stack = createNativeStackNavigator<HomeStackList>();
const BottomStack = createBottomTabNavigator<RootStackList>();

function HomeTabs() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Form"
        component={InfoScreen}
        options={{
          presentation: "containedModal",
          animation: "slide_from_bottom",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default function Navigator() {
  return (
    <NavigationContainer>
      <BottomStack.Navigator
        tabBar={(props) => <CustomBottomTabBar {...props} />}
        initialRouteName="First"
      >
        <BottomStack.Screen name="First" component={HomeTabs} />
        <BottomStack.Screen name="Second" component={EmptyScreen} />
        <BottomStack.Screen name="Third" component={EmptyScreen} />
      </BottomStack.Navigator>
    </NavigationContainer>
  );
}
