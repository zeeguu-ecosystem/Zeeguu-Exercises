#!/bin/env python
from app import app as application
application.run(
     host=application.config.get("HOST", "localhost"),
     port=application.config.get("PORT", 9000)
)


