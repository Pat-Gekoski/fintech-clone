import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { defaultStyles } from '@/constants/styles'
import colors from '@/constants/colors'
import { Link } from 'expo-router'

const Page = () => {
	const [countryCode, setCountryCode] = useState('+1')
	const [phoneNumber, setPhoneNumber] = useState('')

	const onSignUp = async () => {}

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={100}>
			<View style={defaultStyles.container}>
				<Text style={defaultStyles.header}>Let's get started!</Text>
				<Text style={defaultStyles.descriptionText}>Enter your phone number. We will send you a confirmation code there</Text>
				<View style={styles.inputContainer}>
					<TextInput style={styles.input} placeholder='Country code' placeholderTextColor={colors.gray} value={countryCode} />
					<TextInput
						style={[styles.input, { flex: 1 }]}
						placeholder='Mobile number'
						keyboardType='phone-pad'
						value={phoneNumber}
						onChangeText={setPhoneNumber}
						placeholderTextColor={colors.gray}
					/>
				</View>

				<Link href={'/login'} replace asChild>
					<TouchableOpacity>
						<Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
					</TouchableOpacity>
				</Link>

				<View style={{ flex: 1 }} />

				<TouchableOpacity
					style={[defaultStyles.pillButton, { marginTop: 20 }, phoneNumber === '' ? styles.disabled : styles.enabled]}
					onPress={onSignUp}
				>
					<Text style={defaultStyles.buttonText}>Sign up</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	)
}

export default Page

const styles = StyleSheet.create({
	inputContainer: {
		marginVertical: 40,
		flexDirection: 'row',
	},
	input: {
		backgroundColor: colors.lightGray,
		padding: 20,
		borderRadius: 16,
		fontSize: 20,
		marginRight: 10,
	},
	enabled: {
		backgroundColor: colors.primary,
	},
	disabled: {
		backgroundColor: colors.primaryMuted,
	},
})
