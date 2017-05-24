from flask import Blueprint

exercisesblue = Blueprint('exercisesblue', __name__,
                          template_folder='templates',
                          static_folder='static')

print ("created exercisesblue...")

