import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.input}>
        <div className={styles.info}>
          <div className={styles.all_line}>
            <h3>Name</h3>
            <input type="text" name='name' placeholder='John Doe' className={styles.one_line} required/>
          </div>
          <div className={styles.all_line}>
            <h3>Objective</h3>
            <input type="text" name='objective' placeholder='Software Developer' className={styles.one_line} required/>
          </div>
          <div className={styles.inline}>
            <div className={styles.biggest}>
              <h3>Email</h3>
              <input type="email" name="email" placeholder='example@exapmle.org'  required/>
            </div>
            <div>
              <h3>Phone</h3>
              <input type="number" name="phone" placeholder='Phone number...' required/>
            </div>
          </div>
          <div className={styles.inline}>
            <div className={styles.biggest}>
            <h3>Website</h3>
              <input type="text" name="website" placeholder='Your website...' required/>
            </div>
            <div>
            <h3>Location</h3>
              <input type="text" name="location" placeholder='Your location...' required/>
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <h1>Work experience</h1>
          <div className={styles.all_line}>
            <h3>Company</h3>
            <input type="text" name='company' placeholder='Company name...' className={styles.one_line} required/>
          </div>
          <div className={styles.inline}>
            <div className={styles.biggest}>
              <h3>Job title</h3>
              <input type="job-title" name="job-title" placeholder='example@exapmle.org'  required/>
            </div>
            <div>
              <h3>Date from</h3>
              <input type="date" name="date-from" required/>
            </div>
            <div>
              <h3>Date to</h3>
              <input type="date" name="date-to" required/>
            </div>
          </div>
          <div className={styles.all_line}>
            <h3>Description</h3>
            <div id="job-description" contentEditable='true' className={styles.editable}>
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <h1>Education</h1>
          <div className={styles.inline}>
            <div className={styles.biggest}>
              <h3>School</h3>
              <input type="text" name="school-name" placeholder='School name...'  required/>
            </div>
            <div>
              <h3>Date from</h3>
              <input type="date" name="date-from" required/>
            </div>
            <div>
              <h3>Date to</h3>
              <input type="date" name="date-to" required/>
            </div>
          </div>
          <div className={styles.inline}>
            <div className={styles.biggest}>
              <h3>Degree</h3>
              <input type="text" name='degree' placeholder='High school degree' required/>
            </div>
            <div>
              <h3>GPA</h3>
              <input type='number' placeholder='3.81' />
            </div>
          </div>
          <div className={styles.all_line}>
            <h3>Description</h3>
            <div id="school-description" contentEditable='true' className={styles.editable}>
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <h1>Skills</h1>
          <div className={styles.all_line}>
            <h3>Skills list</h3>
            <div id="skills-list" contentEditable='true' className={styles.editable}>
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.output}></div>
    </main>
  )
}
