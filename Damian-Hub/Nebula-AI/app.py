from flask import Flask, render_template, request, jsonify
import subprocess

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():

    message = request.json["message"]

    result = subprocess.run(
        ["ollama", "run", "phi3", message],
        capture_output=True,
        text=True
    )

    return jsonify({
        "reply": result.stdout
    })


if __name__ == "__main__":
    app.run(debug=True)