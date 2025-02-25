import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Carousel, {
    ICarouselInstance,
} from "react-native-reanimated-carousel";
import CarouselCardItem from './CarouselCardItem';

interface CarouselCardsProps {
    data: any
}
export default function CarouselCards(props: CarouselCardsProps) {
    const width = Dimensions.get("window").width;
    const ref = React.useRef<ICarouselInstance>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePaginationPress = (index: number) => {
        ref.current?.scrollTo({ index });
    };

    return (
        <View style={{ height: 100 }}>
            <Carousel
                loop={props?.data?.length > 1 ? true : false}
                mode='parallax'
                ref={ref}
                width={width}
                height={100}
                data={props?.data}
                pagingEnabled={true}
                modeConfig={{
                    parallaxScrollingScale: 1,
                    parallaxScrollingOffset: 0,
                    parallaxAdjacentItemScale: 0.95,
                }}
                onProgressChange={(_, absoluteProgress) => {
                    setActiveIndex(Math.round(absoluteProgress));
                }}
                renderItem={({ item, index }: { item: any, index: number }) => (
                    <CarouselCardItem
                        showDynamicImage
                        image={item.image}
                        index={index} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 3,
        left: 0,
        right: 0
    }
})