import os
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DOC_PATH = os.path.join(BASE_DIR, "real_estate_docs.txt")

def load_documents():
    with open(DOC_PATH, "r", encoding="utf-8") as file:
        text = file.read()

    chunks = text.split("\n\n")
    return chunks

documents = load_documents()

embeddings = model.encode(documents)
embeddings = np.asarray(embeddings, dtype="float32")

dimension = embeddings.shape[1]

index = faiss.IndexFlatL2(dimension)

index.add(embeddings) # type: ignore


def retrieve_context(query, k=2):

    query_embedding = model.encode([query])
    query_embedding = np.asarray(query_embedding, dtype="float32")

    distances, indices = index.search(query_embedding, k) # type: ignore

    retrieved_chunks = []

    for idx in indices[0]:
        retrieved_chunks.append(documents[idx])

    return "\n\n".join(retrieved_chunks)