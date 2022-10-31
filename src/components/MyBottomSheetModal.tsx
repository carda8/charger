// import {View, Text, StyleSheet} from 'react-native';
// import React, {useCallback, useMemo, useRef} from 'react';
// import {BottomSheetModal} from '@gorhom/bottom-sheet';
// import BottomButton from './BottomButton';

// const MyBottomSheetModal = () => {
//   //   const snapPoints = useMemo(() => [pick ? '40%' : '80%'], [pick]);
//   const bottomSheetRef = useRef<BottomSheetModal>(null);

//   // callbacks
//   const handleSheetChanges = useCallback((index: number) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   const sheetStyle = useMemo(
//     () => ({
//       ...styles.sheetContainer,
//       shadowColor: 'black',
//     }),
//     ['linen'],
//   );
//   return (
//     <BottomSheetModal
//       style={sheetStyle}
//       ref={bottomSheetRef}
//       animateOnMount={true}
//       footerComponent={() =>
//         pick ? (
//           <BottomButton
//             text="도착지 설정"
//             style={{marginHorizontal: 16}}
//             setVisible={setVisible}
//           />
//         ) : (
//           <></>
//         )
//       }
//       index={0}
//       snapPoints={snapPoints}
//       onChange={handleSheetChanges}>
//       {/* </View> */}
//     </BottomSheetModal>
//   );
// };

// export default MyBottomSheetModal;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },

//   sheetContainer: {
//     // height: 100,
//     backgroundColor: 'white',
//     borderTopStartRadius: 24,
//     borderTopEndRadius: 24,
//     shadowOffset: {
//       width: 0,
//       height: 12,
//     },
//     shadowOpacity: 0.75,
//     shadowRadius: 16.0,
//     elevation: 30,
//   },
// });
