import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { defaultStyles } from '@/constants/styles'
import colors from '@/constants/colors'
import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useSignUp } from '@clerk/clerk-expo'

const Page = () => {
	const router = useRouter()
	const [countryCode, setCountryCode] = useState('+1')
	const [phoneNumber, setPhoneNumber] = useState('')
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0
	const { signUp } = useSignUp()

	const onSignUp = async () => {
		const fullPhoneNumber = `${countryCode}${phoneNumber}`
		try {
			await signUp!.create({ phoneNumber: fullPhoneNumber })
			signUp!.preparePhoneNumberVerification()

			router.push({ pathname: '/verify/[phone]', params: { phone: fullPhoneNumber } })
		} catch (error) {
			console.error('Error signing up:', error)
		}
	}

	return (
		<>
			<StatusBar style='dark' />
			<KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
				<View style={defaultStyles.container}>
					<Text style={defaultStyles.header}>Let's get started!</Text>
					<Text style={defaultStyles.descriptionText}>Enter your phone number. We will send you a confirmation code there</Text>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder='Country code'
							placeholderTextColor={colors.gray}
							value={countryCode}
							keyboardType='number-pad'
						/>
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
						style={[defaultStyles.pillButton, { marginBottom: 20 }, phoneNumber === '' ? styles.disabled : styles.enabled]}
						onPress={onSignUp}
					>
						<Text style={defaultStyles.buttonText}>Sign up</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</>
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
