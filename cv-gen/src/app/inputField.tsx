import React from 'react';
import styles from './page.module.css'
import { InputData, useFormData } from './formData';
function createInputField(
  style = '',
  header: string,
  type: string,
  name: string,
  placeholder = '',
  classname = ''
) {
  const { inputData, setInputData, fieldChanged, setFieldChanged } = useFormData();
  return (
    <div className={style ? styles[style] : ''}>
      <h3>{header}</h3>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={classname}
        required
        onChange={(e) => {
          setFieldChanged({ ...fieldChanged, [name]: true });
          setInputData({ ...inputData, [name]: e.target.value });
        }}
      />
    </div>
  );
}

export default createInputField;