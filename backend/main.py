from exa_py import Exa
import os
from dotenv import load_dotenv


load_dotenv()
EXA_API_KEY = os.getenv("EXA_API_KEY")
if not EXA_API_KEY:
    raise ValueError("EXA_API_KEY not found in environment variables. Make sure .env exists.")

exa = Exa(EXA_API_KEY)
def search_exa(query):
    response=exa.search(
        query,
        num_results=5,
        type='keyword',
        include_domains = ['https://instagram.com',
            'https://twitter.com',
            'https://facebook.com',
            'https://linkedin.com',
            'https://tiktok.com',
            'https://pinterest.com',
            'https://reddit.com']
    )
    return [{"title": r.title, "url":r.url} for r in response.results]

"""response = exa.search(
    query,
    num_results=5,
    type='keyword',
    include_domains = ['https://instagram.com']
)
for result in response.results:
    print(f'Title: {result.title}')
    print(f'URL: {result.url}')
    print()"""