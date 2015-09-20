"""
The flask application package.
"""

from flask import Flask, render_template

# Setup Flask
app = Flask(__name__)

# Main homepage
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run()


