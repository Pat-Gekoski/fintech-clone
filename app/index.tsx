import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ResizeMode, Video } from 'expo-av'
import { useAssets } from 'expo-asset'
import { Link } from 'expo-router'
import { defaultStyles } from '@/constants/styles'
import colors from '@/constants/colors'
import { StatusBar } from 'expo-status-bar'

const Page = () => {
	const [assets] = useAssets([require('@/assets/videos/intro.mp4')])

	return (
		<>
			<StatusBar style='dark' />
			<View style={styles.container}>
				{assets && (
					<Video
						resizeMode={ResizeMode.COVER}
						isMuted
						isLooping
						shouldPlay
						source={{ uri: assets[0].uri }}
						style={styles.video}
					/>
				)}
				<View style={{ marginTop: 80, padding: 20 }}>
					<Text style={styles.header}>Ready to change the way you money?</Text>
				</View>
				<View style={styles.buttons}>
					<Link href={'/login'} asChild style={[defaultStyles.pillButton, { flex: 1, backgroundColor: colors.dark }]}>
						<TouchableOpacity>
							<Text style={{ color: 'white', fontSize: 22, fontWeight: '500' }}>Log in</Text>
						</TouchableOpacity>
					</Link>
					<Link href={'/signup'} asChild style={[defaultStyles.pillButton, { flex: 1, backgroundColor: 'white' }]}>
						<TouchableOpacity>
							<Text style={{ fontSize: 22, fontWeight: '500' }}>Sign up</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</View>
		</>
	)
}

export default Page

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	video: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	header: {
		fontSize: 36,
		fontWeight: '900',
		textTransform: 'uppercase',
		color: 'white',
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 20,
		marginBottom: 60,
		paddingHorizontal: 20,
	},
})
