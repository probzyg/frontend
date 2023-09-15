import { useState } from 'react';

export type InputData = {
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

export function useFormData() {
  const emptyDate = new Date(0);

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
    skills_list: '',
  });

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
  });

  return {
    inputData,
    setInputData,
    fieldChanged,
    setFieldChanged,
  };
}
