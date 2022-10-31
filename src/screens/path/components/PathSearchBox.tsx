import React from 'react';
import {_getHeight, _getWidth} from 'constants/utils';
import {commonTypes} from '@types';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import FontList from 'constants/FontList';

interface props {
  editable?: boolean;
}

const PathSearchBox = ({editable}: props) => {
  const layout = useWindowDimensions();
  const nav = useNavigation<commonTypes.navi>();
  return (
    <View style={{width: '100%', backgroundColor: 'white'}}>
      {/* 검색창 및 좌, 우 버튼 */}
      <View style={{flexDirection: 'row', marginHorizontal: 16, marginTop: 16}}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Pressable>
            <Image
              source={require('@assets/switch_position.png')}
              style={{width: 16, height: 17}}
              resizeMode="contain"
            />
          </Pressable>

          <Pressable
            onPress={() => {}}
            style={{
              flex: 1,
              marginHorizontal: 5,
            }}>
            <View style={{backgroundColor: '#F4F2F2', borderRadius: 3}}>
              <Pressable
                onPress={() =>
                  editable ? undefined : nav.navigate('PathSearchMain')
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 8,
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    color: '#959595',
                  }}>
                  현위치
                </Text>
                <TextInput
                  onSubmitEditing={() => Keyboard.dismiss()}
                  editable={editable ? true : false}
                  style={{
                    flex: 1,
                    height: 39,
                    borderBottomWidth: 1,
                    marginHorizontal: 10,
                    borderColor: '#C6C6C6',
                  }}
                  placeholder="목적지를 검색하세요"
                />
              </Pressable>

              <Pressable
                onPress={() =>
                  editable ? undefined : nav.navigate('PathSearchMain')
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 8,
                }}>
                <Text
                  style={{
                    fontFamily: FontList.PretendardRegular,
                    color: '#959595',
                  }}>
                  도착지
                </Text>
                <TextInput
                  editable={editable ? true : false}
                  autoCapitalize="none"
                  onSubmitEditing={() => Keyboard.dismiss()}
                  style={{
                    flex: 1,
                    height: 39,
                    marginHorizontal: 10,
                  }}
                  placeholder="목적지를 검색하세요"
                />
              </Pressable>
            </View>
          </Pressable>
        </View>

        <Pressable style={{top: 15}}>
          <Image
            source={require('@assets/close_star.png')}
            style={{width: 14, height: 14}}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      {/* 하단 버튼 */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 6,
          marginBottom: 16,
          marginHorizontal: 36,
        }}>
        <Pressable
          style={{
            marginRight: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 23,
              height: 23,
              backgroundColor: '#0788FF',
              borderRadius: 23 / 2,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 4,
            }}>
            <Image
              source={require('@assets/main_home.png')}
              style={{width: 12, height: 12}}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{
              fontFamily: FontList.PretendardRegular,
              fontSize: 12,
              color: '#333333',
            }}>
            집
          </Text>
        </Pressable>

        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 23,
              height: 23,
              backgroundColor: 'white',
              borderRadius: 23 / 2,
              borderWidth: 1,
              borderColor: '#EEEEEE',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 4,
            }}>
            <Image
              source={require('@assets/star_favorite.png')}
              style={{width: 12, height: 12}}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{
              fontFamily: FontList.PretendardRegular,
              fontSize: 12,
              color: '#333333',
            }}>
            즐겨찾기
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PathSearchBox;

// <View
//       style={{
//         backgroundColor: 'white',
//         width: '100%',
//         alignItems: 'center',
//         alignSelf: 'center',
//         borderRadius: 3,
//         paddingLeft: 16,
//         paddingVertical: 16,
//         paddingRight: 38,
//       }}>
//       <View style={{flexDirection: 'row'}}>
//         <Pressable style={{backgroundColor: 'teal'}}>
//           <Image
//             source={require('@assets/switch_position.png')}
//             style={{width: 17, height: 17, marginRight: 6}}
//             resizeMode="contain"
//           />
//           <View
//             style={{
//               flex: 1,
//               backgroundColor: '#F4F2F2',
//               borderRadius: 3,
//               overflow: 'hidden',
//               paddingHorizontal: 10,
//               paddingVertical: 3,
//             }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}>
//               <Text>현위치</Text>
//               <View
//                 style={{
//                   flex: 1,
//                   marginLeft: 5,
//                   borderBottomWidth: 1,
//                   borderColor: '#C6C6C6',
//                 }}>
//                 <TextInput
//                   editable={false}
//                   onSubmitEditing={() => Keyboard.dismiss()}
//                   autoCapitalize="none"
//                   placeholder="목적지를 검색하세요"
//                   style={{
//                     width: '100%',
//                     height: 39,
//                   }}
//                 />
//               </View>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 backgroundColor: '#F4F2F2',
//               }}>
//               <Text>도착지</Text>
//               <View
//                 style={{
//                   flex: 1,
//                   marginLeft: 5,
//                 }}>
//                 <TextInput
//                   editable={false}
//                   onSubmitEditing={() => Keyboard.dismiss()}
//                   autoCapitalize="none"
//                   placeholder="목적지를 검색하세요"
//                   style={{
//                     width: '100%',
//                     height: 39,
//                   }}
//                 />
//               </View>
//             </View>
//           </View>
//         </Pressable>

//         <Pressable style={{position: 'absolute', right: 19, top: 28}}>
//           <Image
//             source={require('@assets/close_star.png')}
//             style={{
//               width: 14,
//               height: 14,
//             }}
//             resizeMode={'contain'}
//           />
//         </Pressable>
//       </View>
//       <View
//         style={{
//           width: 22,
//           height: 22,
//           alignItems: 'center',
//           justifyContent: 'center',
//           borderRadius: 22 / 2,
//           backgroundColor: '#0788FF',
//         }}>
//         <Image
//           source={require('@assets/main_home.png')}
//           style={{width: 11, height: 11}}
//           resizeMode="contain"
//         />
//       </View>
//     </View>
