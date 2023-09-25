  'use client'

  import styles from './page.module.css'
  import { useState , useRef} from 'react'
  import downloadPDF from './downloadPDF';
  import { v4 as uuidv4 } from 'uuid';
  import { WorkExperience, Education, Languages, InputData } from './types';

  export default function Home() {

  const iframeRef = useRef(null);

  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    {
      id: uuidv4(),
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
      id: uuidv4(),
      company: '',
      job_title: '',
      date_job_from: '',
      date_job_to: '',
      job_description: ''
    }
    setWorkExperience([...workExperience, newField]);
    setInputData({ ...inputData, workExperience: [...workExperience, newField] });
  };

  const removeWorkExperience = (id: string) => {
    const updatedWorkExperience = workExperience.filter((experience) => experience.id !== id);
    setWorkExperience(updatedWorkExperience);
    setInputData({ ...inputData, workExperience: updatedWorkExperience });
  };

  const [education, setEducation] = useState<Education[]>([
    {
      id: uuidv4(),
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
      id: uuidv4(),
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

  const removeEducation = (id: string) => {
    const updatedEducation = education.filter((education) => education.id !== id);
    setEducation(updatedEducation);
    setInputData({ ...inputData, education: updatedEducation });
  };

  const [languages, setLanguages] = useState<Languages[]>([
    {
      language: '',
      rating: ''
    }
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

  function createInputField<T>(
    style = '',
    header: string,
    type = '',
    name: string,
    placeholder = '',
    classname = '',
    index: undefined | number,
    value: string | undefined,
    changeHandler: ((index: number, event: React.ChangeEvent<HTMLInputElement>, name: string) => void) | undefined
  ) {
    return (
      <div className={style ? styles[style] : ''}>
        <h3>{header}</h3>
        <input
          type={type}
          name={name as string}
          placeholder={placeholder ? placeholder : ''}
          className={classname ? styles[classname] : ''}
          required
          onChange={(e) => {
            if (changeHandler) {
              changeHandler(index as number, e, name);
            } else {
              setFieldChanged({ ...fieldChanged, [name]: true });
              setInputData({ ...inputData, [name]: e.target.value });
            }
          }}
          value={value || ''}
        />
      </div>
    );
  }

    function createEditableContentField<T>(
      header: string,
      id: string,
      index: number | undefined,
      stateData: T | T[],
      data: string | undefined,
      setState: undefined | React.Dispatch<React.SetStateAction<T[]>>,
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
              if (index !== undefined && data !== undefined && Array.isArray(stateData) && setState !== undefined) {
                const updatedData = [...stateData];
                (updatedData[index] as any)[id] = formattedContent;
                setState(updatedData);
                setInputData({
                  ...inputData,
                  [data]: updatedData,
                });
              } else {
                setInputData({
                  ...inputData,
                  [id]: formattedContent,
                });
              }
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
            {createInputField<InputData>('all_line', 'Name', 'text', 'full_name', 'John Doe', 'one_line', undefined, inputData.full_name, undefined)}
            {createInputField<InputData>('all_line', 'Objective', 'text', 'objective', 'Software Developer', 'one_line', undefined, inputData.objective, undefined)}
            <div className={styles.inline}>
              {createInputField<InputData>('biggest', 'Email', 'email', 'email', 'example@example.org', '', undefined, inputData.email, undefined)}
              {createInputField<InputData>('', 'Phone', 'number', 'phone', 'Phone number...', '', undefined, inputData.phone, undefined)}
            </div>
            <div className={styles.inline}>
              {createInputField<InputData>('biggest', 'Website', 'text', 'website', 'Your website...', '', undefined, inputData.website, undefined)}
              {createInputField<InputData>('', 'Location', 'text', 'location', 'Your location...', '', undefined, inputData.location, undefined)}
            </div>
          </div>
          <div className={styles.info} >
            <h1 className={styles.header}>Work experience</h1>
            <form>
              {workExperience.map((experience, index) => { 
              return (
                <div key={experience.id}>
                  {createInputField<WorkExperience>('all_line', 'Company', 'text', 'company', 'Company name...', 'one_line', index, experience.company, handleWorkExperienceChange)}
                  <div className={styles.inline}>
                    {createInputField<WorkExperience>('biggest', 'Job title', 'text', 'job_title', 'Software developer', '', index, experience.job_title, handleWorkExperienceChange)}
                    {createInputField<WorkExperience>('', 'Date from', 'text', 'date_job_from', 'Date from...', '', index, experience.date_job_from, handleWorkExperienceChange)}
                    {createInputField<WorkExperience>('','Date to', 'text', 'date_job_to','Date to...','',index, experience.date_job_to, handleWorkExperienceChange)}
                  </div>
                    {createEditableContentField<WorkExperience>('Description',`job_description`, index, workExperience, 'workExperience', setWorkExperience)}
                  <button type='button' className={styles.button} onClick={() => removeWorkExperience(experience.id)}>Remove Work Experience</button>
                </div>
              );
              })}
            </form>
            <button className={styles.button} onClick={addWorkExperience}>Add Work Experience</button>
        </div>
          <div className={styles.info}>
            <h1 className={styles.header}>Education</h1>
            <form>
              {education.map((edu, index) => (
                <div key={edu.id}>
                  <div className={styles.inline}>
                    {createInputField<Education>('biggest', 'School', 'text', 'school_name', 'School name', '', index, edu.school_name, handleEducationChange)}
                    {createInputField<Education>('','Date from', 'text', 'date_school_from', 'Date from...', '', index, edu.date_school_from, handleEducationChange)}
                    {createInputField<Education>('','Date to', 'text', 'date_school_to', 'Date to...', '', index, edu.date_school_to, handleEducationChange)}
                  </div>
                  <div className={styles.inline}>
                    {createInputField<Education>('biggest', 'Degree', 'text', 'degree', 'High school degree...', '', index, edu.degree, handleEducationChange)}
                    {createInputField<Education>('', 'GPA', 'text', 'gpa', '3.81', '', index, edu.gpa, handleEducationChange)}
                  </div>
                  {createEditableContentField<Education>('Description', 'school_description', index, education, 'education', setEducation)}
                  <button type='button' className={styles.button} onClick={() => removeEducation(edu.id)}>Remove Education</button>
                </div>
              ))}
            </form>
            <button className={styles.button} onClick={addEducation}>Add Education</button>
          </div>
          <div className={styles.info}>
            <h1 className={styles.header}>Skills</h1>
            {createEditableContentField('Skills list', 'skills_list', undefined, inputData, undefined, undefined)}
          </div>
          <div className={styles.info}>
            <h1 className={styles.header}>Languages</h1>
            <form>
              {languages.map((language , index) => (
                <div key={index}>
                  <div className={styles.inline}>
                    {createInputField<Languages>('biggest', 'Language', 'text', 'language', 'Language...', '', index, language.language, handleLanguagesChange)}
                    {createInputField<Languages>('', 'Overall rating', 'text', 'rating', 'B1', '', index, language.rating, handleLanguagesChange)}
                  </div>
                  <button type='button' className={styles.button} onClick={() => removeLanguage(index)}>Remove Language</button>
                </div>
              ))}
            </form>
            <button className={styles.button} onClick={addLanguage}>Add Language</button>
          </div>
        </div>
        <div className={styles.output} id='output'> 
        <iframe
            ref={iframeRef}
            srcDoc={`
            <!DOCTYPE html>
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
          <button className={styles.button} onClick={() => downloadPDF(iframeRef)}>Download PDF</button>
        </div>
      </main>
    </body>
  )
}
