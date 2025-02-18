import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { Colors } from '@/constants/styles'
import 'react-native-get-random-values' // polyfill for uuid to work with React Native
import { BlurView } from 'expo-blur'
import CustomHeader from '@/app/components/CustomHeader'

const _layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.primary,
				tabBarStyle: {
					backgroundColor: 'transparent',
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					elevation: 0,
					borderTopWidth: 0,
				},
				tabBarBackground: () => (
					<BlurView intensity={100} tint='extraLight' style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.05)' }} />
				),
			}}
		>
			<Tabs.Screen
				name='home'
				options={{
					title: 'Home',
					headerTransparent: true,
					tabBarIcon: ({ size, color }) => <FontAwesome name='registered' size={size} color={color} />,
					header: () => <CustomHeader />,
				}}
			/>
			<Tabs.Screen
				name='invest'
				options={{ title: 'Invest', tabBarIcon: ({ size, color }) => <FontAwesome name='line-chart' size={size} color={color} /> }}
			/>
			<Tabs.Screen
				name='transfers'
				options={{ title: 'Transfers', tabBarIcon: ({ size, color }) => <FontAwesome name='exchange' size={size} color={color} /> }}
			/>
			<Tabs.Screen
				name='crypto'
				options={{ title: 'Crypto', tabBarIcon: ({ size, color }) => <FontAwesome name='bitcoin' size={size} color={color} /> }}
			/>
			<Tabs.Screen
				name='lifestyle'
				options={{ title: 'Lifestyle', tabBarIcon: ({ size, color }) => <FontAwesome name='th' size={size} color={color} /> }}
			/>
		</Tabs>
	)
}

export default _layout

const styles = StyleSheet.create({})
