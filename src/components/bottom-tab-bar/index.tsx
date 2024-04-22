import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { Animated, Easing, useWindowDimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { RootStackList, RootStackProps } from "../../navigation";
import { StyledTabBar, StyledTabItem, StyledTabItemLabel } from "./styles";
import colors from "../../theme/colors";

function TabItem({
  name,
  width,
  isActive,
}: {
  name: string;
  width: number;
  isActive: boolean;
}) {
  const navigation = useNavigation<RootStackProps>();

  return (
    <StyledTabItem
      style={{
        width: `${width}%`,
      }}
      activeOpacity={1}
      onPress={() => {
        navigation.navigate(name as keyof RootStackList);
      }}
    >
      <StyledTabItemLabel
        style={{
          color: isActive ? colors.white : colors.black,
        }}
      >
        {name}
      </StyledTabItemLabel>
    </StyledTabItem>
  );
}

export default function CustomBottomTabBar(props: BottomTabBarProps) {
  const { navigation } = props;
  const { routes, index: activeIndex } = navigation.getState();
  const { width } = useWindowDimensions();

  const space = 100 / routes.length;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const tabSize = width / routes.length;

  const animate = (num: number) => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: num,
          easing: Easing.elastic(0.5),
          useNativeDriver: true,
        }),
        Animated.timing(borderAnim, {
          toValue: num,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(scaleAnim, {
        toValue: 2,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    animate(activeIndex);
  }, [activeIndex]);

  return (
    <LinearGradient
      start={{ x: 0, y: 0.7 }}
      end={{ x: 0, y: 0.7 }}
      colors={[colors.white, colors.white, colors.red, colors.red]}
      style={{ height: 75 }}
    >
      <StyledTabBar>
        {routes.map((route, index) => {
          const isRouteActive = index === activeIndex;
          return (
            <TabItem
              key={route.name}
              width={space}
              name={route.name}
              isActive={isRouteActive}
            />
          );
        })}
      </StyledTabBar>
      <Animated.View
        style={{
          transform: [
            {
              translateX: fadeAnim.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [0, tabSize, tabSize * 2],
              }),
            },
          ],
          borderTopEndRadius: borderAnim.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [15, 15, 0],
          }),
          borderTopStartRadius: borderAnim.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, 15, 15],
          }),
          width: tabSize,
          height: 50,
          backgroundColor: colors.red,
          position: "absolute",
        }}
      >
        <Animated.Text
          style={{
            textAlign: "center",
            color: "white",
            paddingTop: 10,
            transform: [
              {
                scale: scaleAnim.interpolate({
                  inputRange: [1, 2],
                  outputRange: [1, 1.5],
                }),
              },
            ],
          }}
        >
          {routes[activeIndex].name}
        </Animated.Text>
      </Animated.View>
    </LinearGradient>
  );
}
