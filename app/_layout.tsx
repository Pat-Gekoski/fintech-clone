import React, { useEffect } from 'react'
import { Link, Stack, useRouter } from 'expo-router'
import { Colors } from '@/constants/styles'
import { TouchableOpacity } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
	const [loaded, error] = useFonts({
		SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	})

	const router = useRouter()

	useEffect(() => {
		if (error) throw error
	})

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [])

	if (!loaded) return null

	return (
		<Stack>
			<Stack.Screen name='index' options={{ headerShown: false }} />
			<Stack.Screen
				name='signup'
				options={{
					title: '',
					headerBackTitle: '',
					headerBackButtonDisplayMode: 'minimal',
					headerShadowVisible: false,
					headerStyle: { backgroundColor: Colors.background },
					headerLeft: () => {
						return (
							<TouchableOpacity onPress={router.back}>
								<Ionicons name='arrow-back' size={34} color={Colors.dark} />
							</TouchableOpacity>
						)
					},
				}}
			/>
			<Stack.Screen
				name='login'
				options={{
					title: '',
					headerBackTitle: '',
					headerBackButtonDisplayMode: 'minimal',
					headerShadowVisible: false,
					headerStyle: { backgroundColor: Colors.background },
					headerLeft: () => {
						return (
							<TouchableOpacity onPress={router.back}>
								<Ionicons name='arrow-back' size={34} color={Colors.dark} />
							</TouchableOpacity>
						)
					},
					headerRight: () => {
						return (
							<Link asChild href='/help'>
								<TouchableOpacity>
									<Ionicons name='help-circle-outline' size={34} color={Colors.dark} />
								</TouchableOpacity>
							</Link>
						)
					},
				}}
			/>
			<Stack.Screen name='help' options={{ title: 'Help', presentation: 'modal' }} />
		</Stack>
	)
}

const RootLayoutNav = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<StatusBar style='light' />
			<RootLayout />
		</GestureHandlerRootView>
	)
}

export default RootLayoutNav
