from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from datetime import datetime
import re
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

def calculate_experience(resume_text):
    years = re.findall(r'\b(19|20)\d{2}\b', resume_text)
    if not years:
        return "Unable to determine"
    
    years = [int(year) for year in years]
    current_year = datetime.now().year
    earliest_year = min(years)
    
    experience = current_year - earliest_year
    
    if experience < 0:
        return "Unable to determine"
    elif experience == 0:
        return "Less than 1 year"
    elif experience == 1:
        return "1 year"
    else:
        return f"{experience} years"

def calculate_match_score(resume_skills, job_skills):
    matched_skills = set(resume_skills) & set(job_skills)
    return int((len(matched_skills) / len(job_skills)) * 100)

def create_prompt(job_description, resume, reference_resume, primary_skills, secondary_skills):
    prompt = f"""
    Job Description:
    {job_description}

    Resume to Evaluate:
    {resume}

    {"Reference Resume:" + reference_resume if reference_resume else ""}

    Primary Skills (Must-Have): {', '.join(primary_skills) if primary_skills else 'Not specified'}
    Secondary Skills (Nice-to-Have): {', '.join(secondary_skills) if secondary_skills else 'Not specified'}

    Please analyze the resume and provide the following information:
    1. Candidate Name: Extract the candidate's name from the resume.
    2. Position: Determine the most recent or current position of the candidate.
    3. Top Skills: List the top 5 skills from the resume that align with the job description, primary skills, and secondary skills.
    4. Education: Identify the highest level of education mentioned in the resume.
    5. Experience: Based on the resume content, provide a summary of the candidate's relevant full-time experience after graduation. Do not include freelance or part-time roles.

    Format your response as a JSON object with the following structure:
    {{
        "name": "Candidate's Name",
        "position": "Most recent or current position",
        "top_skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
        "education": "Highest level of education",
        "experience_summary": "Summary of relevant full-time experience"
    }}
    """
    return prompt

@app.route('/screen-resumes', methods=['POST'])
def screen_resumes():
    data = request.json
    job_description = data.get('job_description', '')
    resumes = data.get('resumes', [])
    reference_resume = data.get('reference_resume', '')
    primary_skills = data.get('primary_skills', [])
    secondary_skills = data.get('secondary_skills', [])

    all_skills = primary_skills + secondary_skills

    screening_results = []

    for resume in resumes:
        prompt = create_prompt(job_description, resume, reference_resume, primary_skills, secondary_skills)
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an AI assistant specialized in resume screening and analysis."},
                {"role": "user", "content": prompt}
            ]
        )

        result = response.choices[0].message['content']
        try:
            parsed_result = eval(result)
            parsed_result['experience'] = calculate_experience(resume)
            parsed_result['matchScore'] = calculate_match_score(parsed_result['top_skills'], all_skills)
            screening_results.append(parsed_result)
        except:
            screening_results.append({"error": "Failed to parse OpenAI response"})

    return jsonify({"screening_results": screening_results})

if __name__ == '__main__':
    app.run(debug=True)