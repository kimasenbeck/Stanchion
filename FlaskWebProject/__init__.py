"""
The flask application package.
"""

from flask import Flask

# Setup Flask
app = Flask(__name__)

# from flask import 

# # Main homepage
# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/control')
# def control():
#     return render_template('control.html')

# if __name__ == "__main__":
#     app.run()

import FlaskWebProject.views