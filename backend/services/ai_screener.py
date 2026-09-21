import os
from pydantic import BaseModel, Field
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

class ScreeningResult(BaseModel):
    match_score: int = Field(description="Match score between 0 and 100")
    key_strengths: list[str] = Field(description="Matched skills and strengths")
    missing_skills: list[str] = Field(description="Skills required by JD but missing in resume")
    verdict: str = Field(description="Shortlist, Review, or Reject")


api_key = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=api_key)
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=api_key)


def screen_resume(resume_text: str, job_description: str):
    vectorstore = Chroma.from_texts([resume_text], embeddings)
    retriever = vectorstore.as_retriever(k=2)

    prompt = ChatPromptTemplate.from_template("""
    You are an expert technical recruiter. Based on the retrieved resume context:
    {context}
    Evaluate the candidate against this Job Description:
    {input}
    """)

  
    structured_llm = llm.with_structured_output(ScreeningResult)
    doc_chain = create_stuff_documents_chain(structured_llm, prompt)
    rag_chain = create_retrieval_chain(retriever, doc_chain)

    result = rag_chain.invoke({"input": job_description})
    return result["answer"]
