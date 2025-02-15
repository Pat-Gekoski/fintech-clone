import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/styles'
import RoundButton from '@/app/components/RoundButton'
import Dropdown from '@/app/components/Dropdown'

const Page = () => {
	const balance = 1420

	const onAddMoney = () => {}

	return (
		<ScrollView style={{ backgroundColor: Colors.background }}>
			<View style={styles.account}>
				<View style={styles.row}>
					<Text style={styles.balance}>{balance}</Text>
					<Text style={styles.currency}>$</Text>
				</View>
			</View>
			<View style={styles.actionRow}>
				<RoundButton text='Add money' icon={'add'} onPress={onAddMoney} />
				<RoundButton text='Exchange' icon={'refresh'} onPress={onAddMoney} />
				<RoundButton text='Details' icon={'list'} onPress={onAddMoney} />
				{/* <RoundButton text='Add money' icon={'add'} onPress={onAddMoney} /> */}
				<Dropdown />
			</View>
		</ScrollView>
	)
}

export default Page

const styles = StyleSheet.create({
	account: {
		margin: 80,
		alignItems: 'center',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center',
		gap: 10,
	},
	balance: {
		fontSize: 50,
		fontWeight: 'bold',
	},
	currency: {
		fontSize: 20,
		marginLeft: 5,
		fontWeight: '500',
	},
	actionRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 20,
	},
})
