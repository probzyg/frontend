import React from 'react';
import styles from './page.module.css'

function createDescriptionField(header: string, 
    id: string, 
    fieldChanged: any, 
    inputData: any) {
  return (
    <div className={styles.all_line}>
      <h3>{header}</h3>
      <div
        id={id}
        contentEditable='true'
        className={styles.editable}
        onInput={(e) => {
          fieldChanged({ ...fieldChanged, [id]: true });
          const lines = e.currentTarget.innerText.split('\n').map(line => line.trim());
          const formattedContent = lines.map(line => line ? `<li>${line}</li>` : '').join('');
          inputData({
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