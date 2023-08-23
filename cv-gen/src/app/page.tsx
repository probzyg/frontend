'use client'

import styles from './page.module.css'
import { useState } from 'react'

export default function Home() {

  const emptyDate = new Date(0);

type InputData = {
  full_name: string;
  objective: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  company: string;
  job_title: string;
  date_job_from: Date;
  date_job_to: Date;
  job_description: string;
  school_name: string;
  date_school_from: Date;
  date_school_to: Date;
  degree: string;
  gpa: number;
  school_description: string; 
  skills_list: string;
}; 

const [inputData, setInputData] = useState<InputData>({
  full_name: '',
  objective: '',
  email: '',
  phone: '',
  website: '',
  location: '',
  company: '',
  job_title: '',
  date_job_from: emptyDate,
  date_job_to: emptyDate,
  job_description: '',
  school_name: '',
  date_school_from: emptyDate,
  date_school_to: emptyDate,
  degree: '',
  gpa: 0,
  school_description: '',
  skills_list: ''
})

const [fieldChanged, setFieldChanged] = useState({
  email: false,
  phone: false,
  website: false,
  location: false,
  company: false,
  job_title: false,
  date_job_from: false,
  date_job_to: false,
  job_description: false,
  school_name: false,
  date_school_from: false,
  date_school_to: false,
  degree: false,
  gpa: false,
  school_description: false,
  skills_list: false
});

function createInputField(style = '', 
  header: string, 
  type: string, 
  name: string, 
  placeholder = '', 
  classname = '') {
  return (
    <div className={style ? styles[style] : ''}>
      <h3>{header}</h3>
      <input
        type={type}
        name={name}
        placeholder={placeholder? placeholder : ''}
        className={classname ? styles[classname] : ''}
        required
        onChange={(e) => {
          setFieldChanged({ ...fieldChanged, [name]: true });
          setInputData({ ...inputData, [name]: e.target.value });
        }}
      />
    </div>
  );
}


function createDescriptionField(header: string, 
  id: string 
  ) {
    return (
    <div className={styles.all_line}>
            <h3>{header}</h3>
            <div 
            id={id} 
            contentEditable='true'
            className={`${styles.editable} ${styles.overflowAuto}`}
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
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.input}>
        <div className={styles.info}>
            {createInputField('all_line', 'Name', 'text', 'full_name', 'John Doe', 'one_line')}
            {createInputField('all_line', 'Objective', 'text', 'objective', 'Software Developer', 'one_line')}
          <div className={styles.inline}>
            {createInputField('biggest', 'Email', 'email', 'email', 'example@example.org')}
            {createInputField('', 'Phone', 'number', 'phone', 'Phone number...')}
          </div>
          <div className={styles.inline}>
            {createInputField('biggest', 'Website', 'text', 'website', 'Your website...')}
            {createInputField('', 'Location', 'text', 'location', 'Your location...')}
          </div>
        </div>
        <div className={styles.info}>
          <h1>Work experience</h1>
          {createInputField('all_line', 'Company', 'text', 'company', 'Company name...', 'one_line')}
          <div className={styles.inline}>
            {createInputField('biggest', 'Job title', 'text', 'job_title', 'Software Developer')}
            {createInputField('', 'Date from', 'date', 'date_job_from')}
            {createInputField('', 'Date to', 'date', 'date_job_to')}
          </div>
          {createDescriptionField('Description', 'job_description')}
        </div>
        <div className={styles.info}>
          <h1>Education</h1>
          <div className={styles.inline}>
            {createInputField('biggest', 'School', 'text', 'school_name', 'School name...')}
            {createInputField('', 'Date from', 'date', 'date_school_from')}
            {createInputField('', 'Date to', 'date', 'date_school_to')}
          </div>
          <div className={styles.inline}>
          {createInputField('biggest', 'Degree', 'text', 'degree', 'High school degree')}
          {createInputField('', 'GPA', 'number', 'gpa', '3.81')}
          </div>
          {createDescriptionField('Description', 'school_description')}
        </div>
        <div className={styles.info}>
          <h1>Skills</h1>
          {createDescriptionField('Skill list', 'skills_list')}
        </div>
        
      </div>
      
      <div className={styles.output} id='output'>
      <iframe
          srcDoc={`<!DOCTYPE html>
            <html>
              <head>
              <style>
              .inline {
                display: flex;
                flex-direction: row;
                padding: 10px;
                justify-content: space-between;
                gap: 10px;
              }
              .from_to {
                display: flex;
                flex-direction: row;
                padding: 10px;
                gap: 3px;
                justify-content: flex-start;
              }

              .first_style {
                background-color: white;
              }
            </style>
              </head>
              <body class='first_style'>
                <h1>${inputData.full_name}</h1>
                <p>${inputData.objective}</p>
                <div class='inline'>
                  ${fieldChanged.email ? `<p>Email: ${inputData.email}</p>` : ''}
                  ${fieldChanged.phone ? `<p>Phone: ${inputData.phone}</p>` : ''}
                  ${fieldChanged.website ? `<p>Website: ${inputData.website}</p>` : ''}
                  ${fieldChanged.location ? `<p>Location: ${inputData.location}</p>` : ''}
                </div>
                <h3>Work experience</h3>
                <div>
                  ${fieldChanged.company ? `<h4>Company: ${inputData.company}<h4>` : ''}
                  ${fieldChanged.job_title ? `<p>Job title: ${inputData.job_title}</p>` : ''}
                  ${fieldChanged.date_job_from ? `<div class='from_to'><p>From ${inputData.date_job_from.toString()} to ${fieldChanged.date_job_to ? `<p>${inputData.date_job_to.toString()}` : ''}</p></div>` : ''}
                  ${fieldChanged.job_description ? `<h4>Job Description:</h4><ul><li>${inputData.job_description}</li></ul>` : ''}
                </div>
                <h3>Education</h3>
                <div>
                  ${fieldChanged.school_name ? `<h4>School name: ${inputData.school_name}<h4>` : ''}
                  ${fieldChanged.date_school_from ? `<div class='from_to'><p>From ${inputData.date_school_from.toString()} to ${fieldChanged.date_school_to ? `<p>${inputData.date_school_to.toString()}` : ''}</p></div>` : ''}
                  ${fieldChanged.degree ? `<div class='from_to'><p>${inputData.degree} - ${fieldChanged.gpa ? `<p>${inputData.gpa}` : ''}</p></div>` : ''}
                  <p>School Description: ${inputData.school_description}</p>
                </div>
                <h3>Skills</h3>
                <div>
                  <p>Skills List: ${inputData.skills_list}</p>
                </div>
              </body>
            </html>`}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </main>
  )
}
