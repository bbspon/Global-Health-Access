import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HealthPlansLanding from '../screens/HealthPlansLanding';
import PlanComparisonScreen from '../screens/PlanComparisonScreen';
import BuyPlanScreen from '../screens/BuyPlanScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HealthPlansLanding"
        component={HealthPlansLanding}
        options={{ title: 'Health Plans' }}
      />
      <Stack.Screen
        name="PlanComparisonScreen"
        component={PlanComparisonScreen}
        options={{ title: 'Compare Plans' }}
      />
      <Stack.Screen
        name="BuyPlanScreen"
        component={BuyPlanScreen}
        options={{ title: 'Buy Plan' }}
      />
    </Stack.Navigator>
  );
}
