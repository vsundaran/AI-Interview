export const formatAIPrompt = (formData = {}) => {
    return `
Generate interview questions for the following candidate profile:

**Job Role:** ${formData.jobRole}  
**Experience:** ${formData.experienced}  
**Years of Experience:** ${formData.yearsOfExperience}  
**Technology:** ${formData.Technology}  
**Skills:** ${formData.skills}  
**Company Preferences:** ${formData.companyName}  
**Expected Salary Level:** ${formData.salaryLevel}  
**Degree:** ${formData.degree}  
**Education Background:** ${formData.education}  
**Candidate Name:** ${formData.name}  
**Last Project Name:** ${formData.lastProjectName}  
**Interview Type:** ${formData.interviewType}  

**Job Description:**  
${formData.jobDescription}

Generate a first technical interview questions relevant to the above profile.
`;
};
