'use client'

import styles from './page.module.css'
import { useState } from 'react'

export default function Home() {

  const emptyDate = new Date(0);

type InputData = {
  full_name: string;
  objective: string;
  email: string;
  phone: number;
  website: string;
  location: string;
  company: string;
  job_title: string;
  date_job_from: Date;
  date_job_to: Date;
  jobDescription: string;
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
  phone: 0,
  website: '',
  location: '',
  company: '',
  job_title: '',
  date_job_from: emptyDate,
  date_job_to: emptyDate,
  jobDescription: '',
  school_name: '',
  date_school_from: emptyDate,
  date_school_to: emptyDate,
  degree: '',
  gpa: 0,
  school_description: '',
  skills_list: ''
})

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
        onChange={(e) => setInputData({ ...inputData, [name]: e.target.value })}
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
            className={styles.editable}
            onInput={(e) => setInputData({ ...inputData, [id]: e.currentTarget.textContent })}
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
        <pre>{JSON.stringify(inputData, null, 2)}</pre>
      </div>
    </main>
  )
}
