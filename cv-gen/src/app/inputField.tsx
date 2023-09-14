import React from 'react';
import styles from './page.module.css'

function createInputField(
  style = '',
  header: string,
  type: string,
  name: string,
  placeholder = '',
  classname = '',
  fieldChanged: any,
  inputData: any
) {
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
          fieldChanged({ ...fieldChanged, [name]: true });
          inputData({ ...inputData, [name]: e.target.value });
        }}
      />
    </div>
  );
}

export default createInputField;