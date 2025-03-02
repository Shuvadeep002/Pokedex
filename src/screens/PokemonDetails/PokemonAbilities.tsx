import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCommonStyles } from '../../common/commonStyle'
import PokemonTypeItem from '../../components/PokemonTypeItem'
import { StaticColors } from '../../theme/StaticColors'

export default function PokemonAbilities({ data }: any) {
    const commonStyle = useCommonStyles()

    const colors = ["#A6F1E0", "#16C47F", "#577BC1", "#FFEB00", "#FB9EC6"];

    return (
        <View style={commonStyle.mainContainerWithPadding}>
            <FlatList
                numColumns={2}
                data={data}
                renderItem={(({ item, index }) =>
                    <PokemonTypeItem
                        style={{
                            backgroundColor: colors[index % colors.length],
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: 5
                        }}
                        StyleText={{ color: StaticColors.background }}
                        name={item?.ability?.name}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({})