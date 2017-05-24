from functools import wraps

import flask
from flask import request, render_template
from . import ex_blueprint

"""
The default_session is only used for testing purposes
Alternative: 11010001 34563456
"""
DEFAULT_SESSION = '11010001'
ZEEGUU_LOGIN = 'https://www.zeeguu.unibe.ch/login'
ZEEGUU_SESSION = 'sessionID'


def with_session(f):
    """
    Decorator for checking sessionID
    - query string
    - cookie parameter
    - defualt_session for tests
    Example: http://127.0.0.1:5000/?sessionID=11010001
    """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        print(request.args.get)
        request.sessionID = None
        if ZEEGUU_SESSION in request.cookies:
            print("Session is retrived from cookies")
            request.sessionID = request.cookies.get(ZEEGUU_SESSION)
        else:
            print("Redirecting Zeeguu login")
            return flask.redirect(ZEEGUU_LOGIN)
        return f(*args, **kwargs)

    return decorated_function


@ex_blueprint.route('/', methods=['GET'])
@with_session
def index():
    """
    Main entry point
    """
    return render_template('exercises/index.html')


@ex_blueprint.route('/get-ex', methods=['GET'])
@with_session
def get_ex():
    """
    Temporary route for distraction shield testing
    """
    return render_template('exercises/test.html')


@ex_blueprint.route('/test-set-cookie', methods=['GET'])
def set_cookie():
    """
    Test route for setting the cookie only for local resting
    """
    return render_template('exercises/set_cookie.html')

