import Toast from 'react-native-toast-message';

/**
 * Show Toast service
 *
 * @param {string} type
 * @param {string} text1
 * @param {string} text2
 */
const showToast = function(type, text1, text2){
    Toast.hide();
    
    setTimeout(() => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2
        });
    }, 300);
}

export default showToast;