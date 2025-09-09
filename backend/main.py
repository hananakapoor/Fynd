from exa_py import Exa
exa=Exa('6700ce31-8d02-4a73-9967-3460721b967e')

def search_exa(query):
    response=exa.search(
        query,
        num_results=5,
        type='keyword',
        include_domains = ['https://instagram.com']
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