import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCommonStyles } from '../../common/commonStyle'
import ProgressBar from '../../components/ProgressBar'
import { StaticColors } from '../../theme/StaticColors'

export default function PokemonStats({ data }: { data: any }) {
    const commonStyle = useCommonStyles()

    const colors = ["#A6F1E0", "#16C47F", "#577BC1", "#FFEB00", "#FB9EC6"];

    return (
        <View style={commonStyle.mainContainerWithPadding}>
            <FlatList
                data={data}
                renderItem={(({ item, index }) =>
                    <ProgressBar
                        name={item?.stat?.name}
                        max={100}
                        value={item?.base_stat}
                        color={colors[index % colors.length]}
                    />)}
            />
        </View>
    )
}

const styles = StyleSheet.create({})