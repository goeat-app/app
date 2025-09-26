
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import SignUp from './screens/signup/signup';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <SignUp />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}