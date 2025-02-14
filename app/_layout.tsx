import React, { useEffect } from 'react'
import { Link, Stack, useRouter, useSegments } from 'expo-router'
import { Colors } from '@/constants/styles'
import { ActivityIndicator, Platform, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { TokenCache } from '@clerk/clerk-expo/dist/cache'
import * as SecureStore from 'expo-secure-store'

SplashScreen.preventAutoHideAsync()

const createTokenCache = (): TokenCache => {
	return {
		getToken: async (key: string) => {
			try {
				const item = await SecureStore.getItemAsync(key)
				return item
			} catch (error) {
				console.error('secure store get item error: ', error)
				await SecureStore.deleteItemAsync(key)
				return null
			}
		},
		saveToken: (key: string, token: string) => {
			return SecureStore.setItemAsync(key, token)
		},
	}
}

export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined

const RootLayout = () => {
	const router = useRouter()
	const { isLoaded, isSignedIn } = useAuth()
	const segments = useSegments()

	const [loaded, error] = useFonts({
		SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	})

	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	useEffect(() => {
		if (!isLoaded) return

		const inAuthGroup = segments[0] === '(authenticated)'

		if (isSignedIn && !inAuthGroup) {
			router.replace('/(authenticated)/(tabs)/home')
		} else if (!isSignedIn) {
			router.replace('/')
		}
	}, [isSignedIn])

	if (!loaded || !isLoaded) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' color={Colors.primary} />
			</View>
		)
	}

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
			<Stack.Screen
				name='verify/[phone]'
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
			<Stack.Screen name='(authenticated)/(tabs)' options={{ headerShown: false }} />
		</Stack>
	)
}

const RootLayoutNav = () => {
	const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

	if (!publishableKey) {
		throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
	}

	return (
		<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache!}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<StatusBar style='light' />
				<RootLayout />
			</GestureHandlerRootView>
		</ClerkProvider>
	)
}

export default RootLayoutNav
