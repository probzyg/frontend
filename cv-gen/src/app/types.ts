export type WorkExperience = {
    id: string,
    company: string;
    job_title: string;
    date_job_from: string;
    date_job_to: string;
    job_description: string;
}

export type Education= {
    id: string,
    school_name: string;
    date_school_from: string;
    date_school_to: string;
    degree: string;
    gpa: string;
    school_description: string;
}

export type Languages = {
    language: string;
    rating: string;
}


export type InputData = {
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
}