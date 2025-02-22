import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Currency } from '@/interfaces/crypto'

const Page = () => {
	const currencies = useQuery({
		queryKey: ['listings'],
		queryFn: () => fetch('/api/listings').then((res) => res.json()),
	})

	const ids = currencies.data?.map((currency: Currency) => currency.id).join(',')

	const { data } = useQuery({
		queryKey: ['info', ids],
		queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
		enabled: !!ids,
	})

	return (
		<View>
			{currencies.data?.map((currency: Currency) => {
				return (
					<View style={{ flexDirection: 'row' }} key={currency.id}>
						<Image source={{ uri: data[currency.id].logo }} style={{ width: 32, height: 32 }} />
						<Text>{currency.name}</Text>
					</View>
				)
			})}
		</View>
	)
}

export default Page

const styles = StyleSheet.create({})
