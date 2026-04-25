import BaseInputField from './BaseInputField';
import { Input as InputText } from './Input';
import { Textarea as InputTextArea } from './Textarea';

/* Object.assign을 통해 BaseInputField 객체에 Text와 TextArea 프로퍼티 추가 */
export const Input = Object.assign(BaseInputField, {
  Text: InputText,
  TextArea: InputTextArea,
});

export default Input;
