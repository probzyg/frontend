'use client'

import styles from './page.module.css'
import { useState , useRef} from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Home() {

  const iframeRef = useRef(null);

  const downloadPDF = async () => {
    const iframe = iframeRef.current as any;
    if (!iframe) return;
  
    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
  
    if (!iframeDocument) {
      console.error("Failed to access iframe's content document");
      return;
    }

    const scale = 3;
  const canvas = await html2canvas(iframeDocument.body, {
    scale: scale,
    useCORS: true
  })
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('cv.pdf');
  };
  
  

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
    )
  }

  return (
    <body className={styles.body}>
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
            {createDescriptionField('Skills list', 'skills_list')}
          </div>
          <div className={styles.info}>
            <h1>Languages</h1>
            {createInputField('all_line', 'Language', 'text', 'language', 'English')}
            <div className={styles.inline}>
              {createInputField('', 'Reading', 'text', 'reading', 'B1')}
              {createInputField('', 'Listening', 'text', 'listening', 'B1')}
              {createInputField('', 'Writing', 'text', 'writing', 'B1')}
              <button>Add new Language</button>
            </div>
          </div>
        </div>
        
        <div className={styles.output} id='output'>
        <iframe
            ref={iframeRef}
            srcDoc={`<!DOCTYPE html>
              <html>
                <head>
                <style>
                .inline {
                  display: flex;
                  flex-direction: row;                  
                  justify-content: space-between;
                  gap: 5px;
                }
                .from_to {
                  display: flex;
                  flex-direction: row;
                  gap: 3px;
                  justify-content: flex-start;
                }

                .first_style {
                  background-color: white;
                  display: flex;
                  flex-direction: column;
                  gap: 5px;
                  margin: 30px;
                }
                .colored_box {
                  background-color: rgb(149, 188, 210);
                  height: 10px;
                  width: 100%;
                  position: absolute;
                  top: 0;
                  left: 0;
                }
                h1, h3, h4, ul, p {
                  margin: 0px;
                }
                h3 {
                  background-color: rgb(149, 188, 210);
                  border-radius: 3px;
                }
              </style>
                </head>
                <body class='first_style'>
                <div class='colored_box'></div>
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
                    ${fieldChanged.company ? `<h4>${inputData.company}</h4>` : ''}
                    <div class='inline'>
                      ${fieldChanged.job_title ? `<p>${inputData.job_title}</p>` : ''}
                      ${fieldChanged.date_job_from ? `<div class='from_to'><p>From ${inputData.date_job_from.toString()} till ${fieldChanged.date_job_to ? `<p>${inputData.date_job_to.toString()}` : 'now'}</p></div>` : ''}
                    </div>
                    ${fieldChanged.job_description ? `<ul>${inputData.job_description}</ul>` : ''}
                  </div>
                  <h3>Education</h3>
                  <div>
                    ${fieldChanged.school_name ? `<h4>${inputData.school_name}</h4>` : ''}
                    <div class='inline'>
                    ${fieldChanged.degree ? `<div class='from_to'><p>${inputData.degree} - ${fieldChanged.gpa ? `<p>${inputData.gpa}` : ''}</p></div>` : ''}
                      ${fieldChanged.date_school_from ? `<div class='from_to'><p>From ${inputData.date_school_from.toString()} till ${fieldChanged.date_school_to ? `<p>${inputData.date_school_to.toString()}` : 'now'}</p></div>` : ''}
                    </div>
                    ${fieldChanged.school_description ? `<ul>${inputData.school_description}</ul>` : ''}
                  </div>
                  <h3>Skills</h3>
                  <div>
                    ${fieldChanged.skills_list ? `<ul>${inputData.skills_list}</ul>` : ''}
                  </div>
                </body>
              </html>`}
            style={{ width: '100%', height: '100%' }}
          />
          <button onClick={downloadPDF}>Download PDF</button>
        </div>
      </main>
    </body>
  )
}
