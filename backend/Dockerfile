FROM python:3.11-slim-bullseye

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /code

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your entire app folder into /code/app
COPY app ./app

EXPOSE 8000

# Run uvicorn pointing at your app folder module
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
