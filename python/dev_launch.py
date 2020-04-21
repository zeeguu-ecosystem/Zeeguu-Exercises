import os
from zeeguu_exercises.app import app


if 'PORT' in os.environ:
  port = int(os.environ['PORT'])
else:
  port = 5000

app.run(host='0.0.0.0', debug=True, port=port);