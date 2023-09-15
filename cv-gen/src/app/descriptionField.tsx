import React from 'react';
import styles from './page.module.css'
import { InputData, useFormData } from './formData';

function createDescriptionField(header: string, 
    id: string) {
      const { inputData, setInputData, fieldChanged, setFieldChanged } = useFormData();
  return (
    <div className={styles.all_line}>
      <h3>{header}</h3>
      <div
        id={id}
        contentEditable='true'
        className={styles.editable}
        onInput={(e) => {
          setFieldChanged({ ...fieldChanged, [id]: true });
          const lines = e.currentTarget.innerText.split('\n').map(line => line.trim());
          const formattedContent = lines.map(line => line ? `<li>${line}</li>` : '').join('');
          setInputData({
            ...inputData,
            [id]: formattedContent
          });
        }}
      >
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default createDescriptionField;