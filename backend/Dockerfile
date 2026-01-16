FROM node:18-bullseye

# Install Python + venv
RUN apt-get update && apt-get install -y \
    python3 \
    python3-venv \
    python3-pip

# Create virtual environment
RUN python3 -m venv /opt/venv

# Use venv python & pip
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app

# Install Node deps
COPY package.json ./
RUN npm install

# Copy backend code + ml folder
COPY . .

# Install ML deps INSIDE venv (THIS IS KEY)
RUN /opt/venv/bin/pip install --no-cache-dir -r ml/requirements.txt

EXPOSE 5000
CMD ["node", "src/server.js"]
