import os

BACKEND_DIR = "/Users/mehedihasanmridul/Backend/Bangla-store-Backend"

dockerfile_content = """FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir gunicorn

COPY . /app/

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "Bangla_store_Backend.wsgi:application"]
"""

dockerignore_content = """venv/
__pycache__/
*.pyc
db.sqlite3
.env
"""

with open(os.path.join(BACKEND_DIR, "Dockerfile"), "w") as f:
    f.write(dockerfile_content)

with open(os.path.join(BACKEND_DIR, ".dockerignore"), "w") as f:
    f.write(dockerignore_content)

# Update wsgi path, we don't know if it's Bangla_store_Backend or config
import glob
wsgi_files = glob.glob(os.path.join(BACKEND_DIR, "*", "wsgi.py"))
if wsgi_files:
    app_name = os.path.basename(os.path.dirname(wsgi_files[0]))
    dockerfile_content = dockerfile_content.replace("Bangla_store_Backend.wsgi", f"{app_name}.wsgi")
    with open(os.path.join(BACKEND_DIR, "Dockerfile"), "w") as f:
        f.write(dockerfile_content)

print("Created backend Dockerfile and .dockerignore")
