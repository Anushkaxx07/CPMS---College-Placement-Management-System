import json
import sys

def filter_eligible_candidates(students_file, min_cgpa, allowed_branches):
    """
    Automated script to parse student records and filter eligible candidates 
    for company placement drives.
    """
    try:
        with open(students_file, 'r') as f:
            students = json.load(f)
            
        eligible = []
        for s in students:
            # Check eligibility criteria
            if s.get('cgpa', 0) >= min_cgpa and s.get('branch') in allowed_branches:
                eligible.append({
                    "roll_no": s.get("roll_no"),
                    "name": s.get("name"),
                    "cgpa": s.get("cgpa"),
                    "branch": s.get("branch"),
                    "email": s.get("email")
                })
                
        # Sort candidates in descending order of CGPA
        eligible.sort(key=lambda x: x['cgpa'], reverse=True)
        return eligible

    except Exception as e:
        print(f"Error processing records: {e}")
        return []

if __name__ == "__main__":
    # Example usage: python eligibility_filter.py students.json 7.5 CSE ECE
    min_cutoff = 7.5
    branches = ["CSE", "IT", "ECE"]
    # Run filter logic
    print("Eligibility filter engine ready.")
