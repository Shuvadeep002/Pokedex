import { Image, ImageStyle, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface CarouselCardItemProps {
  item?: {
    key?: string;
  };
  index: number;
  From?: string;
  InternalComponent?: any;
  image?: any;
  imageStyle?: object
  showDynamicImage?: boolean
}

const CarouselCardItem: React.FC<CarouselCardItemProps> = ({ item, index, From, InternalComponent, image, imageStyle, showDynamicImage }) => {
  const [loading, setLoading] = React.useState(false)

  return (
    <View style={container(From)} key={index}>
      {/*  */}
      {InternalComponent}
      <>
        <Image
          source={{ uri: image }}
          style={[DynamicImageStyle(loading), imageStyle]}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />

      </>
    </View>
  );
};

const DynamicImageStyle = (loading: boolean): ImageStyle => ({
  width: loading ? 0 : '100%',
  height: loading ? 0 : '100%',
  resizeMode: 'contain'
})
const container = (x?: string): ImageStyle => ({
  borderRadius: 8,
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  // borderWidth:1
})
const styles = StyleSheet.create({
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,

  },
  body: {
    color: '#222',
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CarouselCardItem;