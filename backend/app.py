from flask import Flask, request,jsonify
from main import search_exa
from flask_cors import CORS

app=Flask(__name__)
CORS(app)

@app.route("/search",methods=["POST"])
def search():
    data = request.get_json()
    query=data.get("query","")
    if query:
        results=search_exa(query)
        return jsonify(results)
    return jsonify([])
if __name__=="__main__":
    app.run(debug=True)