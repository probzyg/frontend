import styles from './page.module.css'

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
            className={styles.editable}>
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
    )
  }

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.input}>
        <div className={styles.info}>
            {createInputField('all_line', 'Name', 'text', 'name', 'John Doe', 'one_line')}
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
            {createInputField('biggest', 'Job title', 'text', 'job-title', 'Software Developer')}
            {createInputField('', 'Date from', 'date', 'date-job-from')}
            {createInputField('', 'Date to', 'date', 'date-job-to')}
          </div>
          {createDescriptionField('Description', 'job-description')}
        </div>
        <div className={styles.info}>
          <h1>Education</h1>
          <div className={styles.inline}>
            {createInputField('biggest', 'School', 'text', 'school-name', 'School name...')}
            {createInputField('', 'Date from', 'date', 'date-school-from')}
            {createInputField('', 'Date to', 'date', 'date-school-to')}
          </div>
          <div className={styles.inline}>
          {createInputField('biggest', 'Degree', 'text', 'degree', 'High school degree')}
          {createInputField('', 'GPA', 'number', 'gpa', '3.81')}
          </div>
          {createDescriptionField('Description', 'school-description')}
        </div>
        <div className={styles.info}>
          <h1>Skills</h1>
          {createDescriptionField('Skill list', 'skills-list')}
        </div>
      </div>

      <div className={styles.output} id='output'>
        <iframe id="dynamic-iframe" className={styles.iframe} srcDoc=''></iframe>
      </div>
    </main>
  )
}
