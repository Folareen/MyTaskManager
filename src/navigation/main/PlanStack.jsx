import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewPlans from "../../screens/plan/ViewPlans";

const Stack = createNativeStackNavigator();

const PlanStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="ViewPlans"
        component={ViewPlans}
      />
    </Stack.Navigator>
  );
};

export default PlanStack;
