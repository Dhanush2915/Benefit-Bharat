from flask import Flask, request, jsonify

app = Flask(__name__)

# Dummy database for schemes
schemes_data = {
    "indian_schemes": {
        "Agriculture": ["PM-KISAN", "Soil Health Card Scheme", "Rashtriya Krishi Vikas Yojana"],
        "Healthcare": ["Ayushman Bharat", "Jan Aushadhi Yojana"],
        "Women": ["Beti Bachao Beti Padhao", "Mahila Samridhi Yojana"],
        "Pension": ["Atal Pension Yojana", "National Pension System"],
        "Sports": ["Khelo India", "National Sports Talent Search"],
        "Minority": ["Post Matric Scholarship", "Maulana Azad Fellowship"],
        "Education": ["National Means-cum-Merit Scholarship", "SWAYAM"],
        "Physically Handicapped": ["Sugamya Bharat Abhiyan", "Divyang Pension Yojana"]
    }
}

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    query = data.get("query")

    if query == "indian_schemes":
        categories = list(schemes_data["indian_schemes"].keys())
        response = "Select a category:\n" + "\n".join(categories)
    elif query in schemes_data["indian_schemes"]:
        response = "Schemes under " + query + ":\n" + "\n".join(schemes_data["indian_schemes"][query])
    else:
        response = "Invalid selection. Please choose from the options."

    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
