# Use Playwright's official image (includes browser deps)
FROM mcr.microsoft.com/playwright:v1.45.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Optional but recommended to make Playwright update browser if missing
RUN npx playwright install --with-deps chromium

CMD ["npm", "run", "dev"]


