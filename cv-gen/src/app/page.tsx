'use client'

import styles from './page.module.css'
import { useState , useRef} from 'react'
import downloadPDF from './downloadPDF';

export default function Home() {

const iframeRef = useRef(null);
  
const emptyDate = new Date(0);

type WorkExperience = {
  company: string;
  job_title: string;
  date_job_from: string;
  date_job_to: string;
  job_description: string;
}

const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
  {
    company: '',
  job_title: '',
  date_job_from: '',
  date_job_to: '',
  job_description: ''
}
]);

const handleWorkExperienceChange = (index: number, event: React.ChangeEvent<HTMLInputElement>, name: string) => {
  const updatedFields = [...workExperience];
  updatedFields[index][event.target.name as keyof WorkExperience] = event.target.value;
  setWorkExperience(updatedFields);
  setInputData({ ...inputData, workExperience: updatedFields });
  setFieldChanged({ ...fieldChanged, [name]: true });
}

const addWorkExperience = () => {
  const newField = {
    company: '',
    job_title: '',
    date_job_from: '',
    date_job_to: '',
    job_description: ''
  }
  setWorkExperience([...workExperience, newField]);
  setInputData({ ...inputData, workExperience: [...workExperience, newField] });
};

const removeWorkExperience = (index: any) => {
  const updatedWorkExperience = [...workExperience];
  updatedWorkExperience.splice(index, 1);
  
  setWorkExperience(updatedWorkExperience);
  setInputData({ ...inputData, workExperience: updatedWorkExperience });
};

type Education= {
  school_name: string;
  date_school_from: string;
  date_school_to: string;
  degree: string;
  gpa: string;
  school_description: string;
}

const [education, setEducation] = useState<Education[]>([
  {
    school_name: '',
    date_school_from: '',
    date_school_to: '',
    degree: '',
    gpa: '',
    school_description: ''
  }
]);

const handleEducationChange = (index: number, event: React.ChangeEvent<HTMLInputElement>, name: string) => {
  const updatedEducation = [...education];
  updatedEducation[index][event.target.name as keyof Education] = event.target.value;
  setEducation(updatedEducation);
  setInputData({ ...inputData, education: updatedEducation });
  setFieldChanged({ ...fieldChanged, [name]: true });
}

const addEducation = () => {
  const newField = {
    school_name: '',
    date_school_from: '',
    date_school_to: '',
    degree: '',
    gpa: '',
    school_description: ''
  }
  setEducation([...education, newField]);
  setInputData({ ...inputData, education: [...education, newField] });
};

const removeEducation = (index: any) => {
  const updatedEducation = [...education];
  updatedEducation.splice(index, 1);
  setEducation(updatedEducation);
  setInputData({ ...inputData, education: updatedEducation });
};

type Languages = {
  language: string;
  rating: string;
}


const [languages, setLanguages] = useState<Languages[]>([
  {language: '',
    rating: ''}
]);

const handleLanguagesChange = (index: number, event: React.ChangeEvent<HTMLInputElement>, name: string) => {
  const updatedLanguages = [...languages];
  updatedLanguages[index][event.target.name as keyof Languages] = event.target.value;
  setLanguages(updatedLanguages);
  setInputData({ ...inputData, languages: updatedLanguages });
  setFieldChanged({ ...fieldChanged, [name]: true });
}

const addLanguage = () => {
    const newField = {
      language: '',
      rating: ''
    };
    setLanguages([...languages, newField]);
    setInputData({ ...inputData, languages: [...languages, newField] });
};

const removeLanguage = (index: any) => {
  const updatedLanguages = [...languages];
  updatedLanguages.splice(index, 1);
  setLanguages(updatedLanguages);
  setInputData({...inputData, languages: updatedLanguages})
};

type InputData = {
  full_name: string;
  objective: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  workExperience: WorkExperience[],
  education: Education[],
  skills_list: string;
  languages: Languages[]
}; 

const [inputData, setInputData] = useState<InputData>({
  full_name: '',
  objective: '',
  email: '',
  phone: '',
  website: '',
  location: '',
  workExperience: [],
  education: [],
  skills_list: '',
  languages: []
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
  skills_list: false,
  language: false,
  rating: false
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
    );
  }

  return (
    <body className={styles.body}>
      <main className={styles.main}>
        <div className={styles.input}>
          <div className={styles.info}>
              {createInputField('all_line', 'Name', 'text', 'full_name', 'John Doe', 'one_line')}
              {createInputField('all_line', 'Objective', 'text', 'objective', 'Software Developer', 'one_line')}
            <div className={styles.inline}>
              {createInputField('biggest', 'Email', 'email', 'email', 'example@example.org', '')}
              {createInputField('', 'Phone', 'number', 'phone', 'Phone number...', '')}
            </div>
            <div className={styles.inline}>
              {createInputField('biggest', 'Website', 'text', 'website', 'Your website...', '')}
              {createInputField('', 'Location', 'text', 'location', 'Your location...', '')}
            </div>
          </div>
          <div className={styles.info} >
            <h1>Work experience</h1>
            <form>
              {workExperience.map((experience, index) => { 
              return (
                <div key={index}>
                  <div className={styles.all_line}>
                    <h3>Company</h3>
                    <input 
                    type='text'
                    name='company'
                    placeholder='Company name...'
                    className={styles.one_line}
                    required
                    onChange={(e) => handleWorkExperienceChange(index, e, 'company')}
                    value={experience.company}
                    />
                  </div>
                  <div className={styles.inline}>
                    <div className={styles.biggest}>
                      <h3>Job title</h3>
                      <input
                        type='text'
                        name='job_title'
                        placeholder='Software Developer'
                        required
                        onChange={(e) => handleWorkExperienceChange(index, e, 'job_title')}
                        value={experience.job_title}
                      />
                    </div>
                    <div>
                      <h3>Date from</h3>
                      <input
                        type='text'
                        name='date_job_from'
                        placeholder='Date from...'
                        required
                        onChange={(e) => handleWorkExperienceChange(index, e, 'date_job_from')}
                        value={experience.date_job_from}
                      />
                    </div>
                    <div>
                      <h3>Date to</h3>
                      <input
                      type='text'
                      name='date_job_to'
                      placeholder='Date to...'
                      required
                      onChange={(e) => handleWorkExperienceChange(index, e, 'date_job_to')}
                      value={experience.date_job_to}
                      />
                    </div>
                  </div>
                  <div className={styles.all_line}>
                    <h3>Description</h3>
                    <div
                      id={`job_description_${index}`}
                      contentEditable='true'
                      className={styles.editable}
                      onInput={(e) => {
                        setFieldChanged({ ...fieldChanged, 'job_description': true });
                        const lines = e.currentTarget.innerText.split('\n').map(line => line.trim());
                        const formattedContent = lines.map(line => line ? `<li>${line}</li>` : '').join('');
                        const updatedWorkExperience = [...workExperience];
                        updatedWorkExperience[index].job_description = formattedContent;
                        setWorkExperience(updatedWorkExperience);
                        setInputData({
                          ...inputData,
                          workExperience: updatedWorkExperience
                        });
                      }}>
                      <ul>
                        <li></li>
                      </ul>
                    </div>
                  </div>
                  <button type='button' onClick={() => removeWorkExperience(index)}>Remove Work Experience</button>
                </div>
              );
              })}
            </form>
            <button onClick={addWorkExperience}>Add Work Experience</button>
        </div>
          <div className={styles.info}>
            <h1>Education</h1>
            <form>
              {education.map((edu, index) => (
                <div key={index}>
                  <div className={styles.inline}>
                      <div className={styles.biggest}>
                        <h3>School</h3>
                        <input
                          type='text'
                          name='school_name'
                          placeholder='School name...'
                          required
                          onChange={(e) => handleEducationChange(index, e, 'school_name')}
                          value={edu.school_name}
                        />
                      </div>
                      <div>
                        <h3>Date from</h3>
                        <input
                          type='text'
                          name='date_school_from'
                          placeholder='Date from...'
                          required
                          onChange={(e) => handleEducationChange(index, e, 'date_school_from')} 
                          value={edu.date_school_from}
                        />
                      </div>
                      <div>
                        <h3>Date to</h3>
                        <input
                        type='text'
                        name='date_school_to'
                        placeholder='Date to...'
                        required
                        onChange={(e) => handleEducationChange(index, e, 'date_school_to')}
                        value={edu.date_school_to}
                      />
                    </div>
                  </div>
                  <div className={styles.inline}>
                    <div className={styles.biggest}>
                      <h3>Degree</h3>
                      <input
                        type='text'
                        name='degree'
                        placeholder='High school degree...'
                        required
                        onChange={(e) => handleEducationChange(index, e, 'degree')}
                        value={edu.degree}
                      />
                    </div>
                    <div>
                      <h3>GPA</h3>
                      <input 
                        type='text'
                        name='gpa'
                        placeholder='3.81'
                        required
                        onChange={(e) => handleEducationChange(index, e, 'gpa')}
                        value={edu.gpa}
                      />
                    </div>
                  </div>
                  <div className={styles.all_line}>
                      <h3>Description</h3>
                      <div
                        id='school_description'
                        contentEditable='true'
                        className={styles.editable}
                        onInput={(e) => {
                          setFieldChanged({ ...fieldChanged, 'school_description': true });
                          const lines = e.currentTarget.innerText.split('\n').map(line => line.trim());
                          const formattedContent = lines.map(line => line ? `<li>${line}</li>` : '').join('');
                          const updatedEducation = [...education];
                          updatedEducation[index].school_description = formattedContent;
                          setEducation(updatedEducation);
                          setInputData({
                            ...inputData,
                            education: updatedEducation
                          });
                        }}
                      >
                        <ul>
                          <li></li>
                        </ul>
                      </div>
                    </div>
                  <button type='button' onClick={() => removeEducation(index)}>Remove Education</button>
                </div>
              ))}
            </form>
            <button onClick={addEducation}>Add Education</button>
          </div>
          <div className={styles.info}>
            <h1>Skills</h1>
            {createDescriptionField('Skills list', 'skills_list')}
          </div>
          <div className={styles.info}>
            <h1>Languages</h1>
            <form>
              {languages.map((language , index) => (
                <div key={index}>
                  <div className={styles.inline}>
                    <div className={styles.biggest}>
                      <h3>Language</h3>
                      <input
                        type='text'
                        name='language'
                        placeholder='Language...'
                        required
                        onChange={(e) => handleLanguagesChange(index, e, 'language')}
                        value={language.language}
                      />
                    </div>
                    <div>
                      <h3>Overall rating</h3>
                      <input
                        type='text'
                        name='rating'
                        placeholder='B1'
                        required
                        onChange={(e) => handleLanguagesChange(index, e, 'rating')}
                        value={language.rating}
                      />
                    </div>
                  </div>
                  <button type='button' onClick={() => removeLanguage(index)}>Remove Language</button>
                </div>
              ))}
            </form>
            <button onClick={addLanguage}>Add Language</button>
          </div>
          <pre>{JSON.stringify(inputData, null, 2)}</pre>
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
                ${workExperience.map((experience, index) => 
                  `
                  <div key=${index}>
                  ${fieldChanged.company ? `<h4>${experience.company}</h4>` : ''}
                  <div class='inline'>
                    ${fieldChanged.job_title ? `<p>${experience.job_title}</p>` : ''}
                    ${fieldChanged.date_job_from ? `<div class='from_to'><p>From ${experience.date_job_from.toString()} till ${fieldChanged.date_job_to ? `<p>${experience.date_job_to.toString()}` : 'now'}</p></div>` : ''}
                  </div>
                  ${fieldChanged.job_description ? `<ul>${experience.job_description}</ul>` : ''}
                  </div>
                  `
                ).join('')}
                <h3>Education</h3>
                ${education.map((education, index) =>
                  `
                    <div key=${index}>
                      ${fieldChanged.school_name ? `<h4>${education.school_name}</h4>` : ''}
                      <div class='inline'>
                        ${fieldChanged.degree ? `<div class='from_to'><p>${education.degree} - ${fieldChanged.gpa ? `<p>${education.gpa}` : ''}</p></div>` : ''}
                        ${fieldChanged.date_school_from ? `<div class='from_to'><p>From ${education.date_school_from.toString()} till ${fieldChanged.date_school_to ? `<p>${education.date_school_to.toString()}` : 'now'}</p></div>` : ''}
                      </div>
                      ${fieldChanged.school_description ? `<ul>${education.school_description}</ul>` : ''}
                    </div>
                  `
                ).join('')}
                <h3>Skills</h3>
                <div>
                  ${fieldChanged.skills_list ? `<ul>${inputData.skills_list}</ul>` : ''}
                </div>
                <h3>Languages</h3>
                ${languages.map((languages, index) =>
                  `
                    <div key=${index}>
                      <div class='inline'>
                        
                        ${fieldChanged.language ? `<div class='from_to'><p>${languages.language} - ${fieldChanged.rating ? `<p>${languages.rating}` : ''}</p></div>` : ''}
                      </div>
                      
                    </div>
                  `
                  ).join('')}
              </body>
            </html>`}
            style={{ width: '100%', height: '100%' }}
          />
          <button onClick={() => downloadPDF(iframeRef)}>Download PDF</button>
        </div>
      </main>
    </body>
  )
}
