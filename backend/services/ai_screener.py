import sys
import os
from pydantic import BaseModel, Field
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

# Pydantic Structured Output / Guardrail
class ScreeningResult(BaseModel):
    match_score: int = Field(description="Match score between 0 and 100")
    key_strengths: list[str] = Field(description="Matched skills and qualifications")
    missing_skills: list[str] = Field(description="Skills required by the JD but missing in resume")
    verdict: str = Field(description="Shortlist, Review, or Reject")

def screen_resume(resume_text: str, job_description: str):
    api_key = os.getenv("GEMINI_API_KEY")
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=api_key)
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=api_key)

    # 1. RAG Vectorstore using ChromaDB
    vectorstore = Chroma.from_texts([resume_text], embeddings)
    retriever = vectorstore.as_retriever(k=2)

    # 2. Prompt Template
    prompt = ChatPromptTemplate.from_template("""
    You are an expert technical recruiter and AI interviewer.
    Based on the following candidate resume context:
    {context}

    Evaluate the candidate objectively against this Job Description:
    {input}
    """)

    # 3. Chain with Pydantic structured output
    structured_llm = llm.with_structured_output(ScreeningResult)
    doc_chain = create_stuff_documents_chain(structured_llm, prompt)
    rag_chain = create_retrieval_chain(retriever, doc_chain)

    result = rag_chain.invoke({"input": job_description})
    return result["answer"]

if __name__ == "__main__":
    resume_arg = sys.argv[1] if len(sys.argv) > 1 else ""
    jd_arg = sys.argv[2] if len(sys.argv) > 2 else ""

    evaluation = screen_resume(resume_arg, jd_arg)
    print(evaluation.model_dump_json())
