export const formatAIPrompt = (formData = {}) => {
    return `
Based on the following candidate profile and job details, generate one **insightful and role-specific technical question** that assesses the candidate's skills, experience, and suitability for the role.

### 📌 **Candidate Profile:**
- **Candidate Name:** ${formData.name || "No info included"}
- **Job Role:** ${formData.jobRole || "No info included"}
- **Experience Level:** ${formData.experienced || "No info included"}
- **Years of Experience:** ${formData.yearsOfExperience || "No info included"}
- **Technical Skills:** ${formData.skills || "No info included"}
- **Technology Stack:** ${formData.Technology || "No info included"}
- **Degree:** ${formData.degree || "No info included"}
- **Education Background:** ${formData.education || "Not included"}
- **Last Project Name:** ${formData.lastProjectName || "No project included"}

### 🏢 **Company Preferences:**
- **Preferred Company:** ${formData.companyName || "Midlevel Companies"}
- **Expected Salary Level:** ${formData.salaryLevel || "Desent"}

### 📄 **Job Description:**
${formData.jobDescription || "Not included"}

### 🎯 **Interview Context:**
- **Interview Type:** ${formData.interviewType || "General"}

The technical question should:
1. Be relevant to the candidate's experience and technical skills.
2. Assess problem-solving, optimization, or practical application of technology.
3. Reflect real-world scenarios or challenges related to the job role.
4. Be open-ended to encourage detailed responses.

**Provide only the question in the response, without any explanation or intent behind it. Do not include words like 'Question:', 'Intent:', or any additional context—just the question itself. The question must not more than 35 words.**
    `;
};
