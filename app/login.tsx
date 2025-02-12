import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { defaultStyles } from '@/constants/styles'
import colors from '@/constants/colors'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

enum LoginType {
	Phone,
	Email,
	Google,
	Apple,
}

const Page = () => {
	const [countryCode, setCountryCode] = useState('+1')
	const [phoneNumber, setPhoneNumber] = useState('')
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0

	const onLogIn = async (type: LoginType) => {
		switch (type) {
			case LoginType.Phone:
				break
			case LoginType.Email:
				break
			case LoginType.Google:
				break
			case LoginType.Apple:
				break
		}
	}

	return (
		<>
			<StatusBar style='dark' />
			<KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
				<View style={defaultStyles.container}>
					<Text style={defaultStyles.header}>Welcome back</Text>
					<Text style={defaultStyles.descriptionText}>Enter the phone number associated with your account.</Text>
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

					<TouchableOpacity
						style={[defaultStyles.pillButton, { marginBottom: 20 }, phoneNumber === '' ? styles.disabled : styles.enabled]}
						onPress={() => onLogIn(LoginType.Phone)}
					>
						<Text style={defaultStyles.buttonText}>Continue</Text>
					</TouchableOpacity>

					<View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
						<View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.gray }} />
						<Text style={{ fontSize: 20, color: colors.gray }}>or</Text>
						<View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.gray }} />
					</View>

					<TouchableOpacity
						onPress={() => onLogIn(LoginType.Email)}
						style={[defaultStyles.pillButton, { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: '#fff' }]}
					>
						<Ionicons name='mail' size={24} color='#000' />
						<Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with email</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => onLogIn(LoginType.Google)}
						style={[defaultStyles.pillButton, { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: '#fff' }]}
					>
						<Ionicons name='logo-google' size={24} color='#000' />
						<Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with email</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => onLogIn(LoginType.Apple)}
						style={[defaultStyles.pillButton, { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: '#fff' }]}
					>
						<Ionicons name='logo-apple' size={24} color='#000' />
						<Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with email</Text>
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
