"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template
from FlaskWebProject import app

@app.route('/')
@app.route('/index')
def home():
    """Renders the home page."""
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year,
    )

@app.route('/control')
def contact():
    """Renders the contact page."""
    return render_template(
        'control.html',
        title='Control',
        year=datetime.now().year,
        message='Your contact page.'
    )
