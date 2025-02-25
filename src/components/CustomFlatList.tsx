import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, FlatListProps } from 'react-native';
import Loader from '../common/Loader';

interface CustomFlatListProps<T> extends FlatListProps<T> {
  onRefreshing?: any;
  loading?: boolean
}

const CustomFlatList = <T extends any>(props: CustomFlatListProps<T>) => {
  const [refreshing, setRefreshing] = useState(false);

  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait()
      .then(() => {
        console.log('Refresh completed');
      })
      .catch(error => {
        console.error('Error during refresh:', error);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  const wait = () => {
    console.log('wait block..');
    return new Promise<void>((resolve, reject) => {
      const onRefreshingPromise = props.onRefreshing();

      if (
        !onRefreshingPromise ||
        typeof onRefreshingPromise.then !== 'function'
      ) {
        reject(new Error('onRefreshing should return a Promise'));
        return;
      }

      onRefreshingPromise
        .then(() => {
          setTimeout(resolve);
        })
        .catch((error: any) => {
          console.error('Error during onRefreshing:', error);
          setTimeout(reject, 0, error);
        });
    });
  };
  return (
    // <SafeAreaView >
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      nestedScrollEnabled
      onEndReached={props.onEndReached}
      onEndReachedThreshold={0.1}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <>
          {props.onRefreshing && <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        </>
      }
      ListFooterComponent={
        <>
          {props?.loading && <Loader />}
        </>
      }
      keyboardShouldPersistTaps="always"
      {...props}
    />
    // </SafeAreaView >
  );
};

export default CustomFlatList;
