import styles from './styles.js';
import { TextInput, View, Text } from 'react-native';

/**
 * Custom Input Component
 *
 * @export
 * @param {function} {setValue}
 * @param {string} {fieldName}
 * @param {string} {placeholder}
 * @param {object} {error}
 * @param {string} {inputMode}
 * @param {boolean} {secureTextEntry}
 * @return {*} 
 */
export default function CustomInput({setValue, fieldName, placeholder, error, inputMode, secureTextEntry}){
    return <View>
        <TextInput
                onChangeText={(v) => setValue(fieldName, v)}
                placeholder={placeholder}
                style={[styles.input, !!error && styles.inputError]}
                inputMode={inputMode}
                secureTextEntry={secureTextEntry}
            />
        {!!error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
}