import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewPlans from "./ViewPlans";

const PlanStack = createNativeStackNavigator();

const PlanScreenStack = () => {
  return (
    <PlanStack.Navigator>
      <PlanStack.Screen
        options={{ headerShown: false }}
        name="ViewPlans"
        component={ViewPlans}
      />
    </PlanStack.Navigator>
  );
};

export default PlanScreenStack;
