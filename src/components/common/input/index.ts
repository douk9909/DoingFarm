import BaseInputField from './BaseInputField';
import InputText from './TextInput';
import TextAreaInput from './TextAreaInput';

/* Object.assign을 통해 BaseInputField 객체에 Text와 TextArea 프로퍼티 추가 */
export const Input = Object.assign(BaseInputField, {
  Text: InputText,
  TextArea: TextAreaInput,
});

export default Input;
