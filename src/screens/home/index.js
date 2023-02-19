import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTask from "./AddTask";
import Profile from "./Profile";
import ViewTasks from "./ViewTasks";

const HomeStack = createNativeStackNavigator();

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="ViewTasks"
        component={ViewTasks}
      />
      <HomeStack.Screen
        options={{
          headerShown: true,
          title: "Add Your Task",
        }}
        name="AddTask"
        component={AddTask}
      />
      <HomeStack.Screen
        options={{
          headerShown: true,
          title: "Your profile",
        }}
        name="Profile"
        component={Profile}
      />
    </HomeStack.Navigator>
  );
};

export default HomeScreenStack;
