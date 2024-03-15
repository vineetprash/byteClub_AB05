# byteClub_AB05
Stock market investors often face the challenge
of navigating a vast sea of information to make sound and timely
investment decisions. 
- Our project is a Conversational Recommendation System, that is capable of
communicating with user in fluent natural language about a particular
investing decision and will provide recommendations for the same. 
- It compiles all neccessary information about the query in under one tab.
- User must ultimately take the decision according to their understanding 
and should not blindly follow the LLM's suggestions.



This project uses React Js frontend and Python-SQLite backend

### Installation
- Client
```
cd client
pnpm i
pnpm run dev
```
- Server
```
cd server
pip install .
uvicorn main:app --reload
```
