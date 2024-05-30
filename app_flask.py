from flask import Flask, render_template, request, jsonify
from chatbot import predict_class, get_response, intents

app = Flask(__name__)

# Rutas
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get("prompt")
    if user_input:
        insts = predict_class(user_input)
        res = get_response(insts, intents)
        return jsonify({"role": "assistant", "content": res})
    return jsonify({"error": "No input received"}), 400

if __name__ == '__main__':
    app.run(debug=True)
