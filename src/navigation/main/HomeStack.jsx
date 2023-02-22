import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTask from "../../screens/home/AddTask";
import ViewTasks from "../../screens/home/ViewTasks";
import Profile from "../../screens/home/Profile";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="ViewTasks"
                component={ViewTasks}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Add Your Task",
                }}
                name="AddTask"
                component={AddTask}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Your profile",
                }}
                name="Profile"
                component={Profile}
            />
        </Stack.Navigator>


    );
};

export default HomeStack;