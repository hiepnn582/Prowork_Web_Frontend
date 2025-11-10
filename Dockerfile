# Giai đoạn 1: Buld Vue/Vite
FROM node:20-alpine AS BUILD
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build



# Giai đoạn 2: Tạo Image chạy Web Server (nginx)
FROM nginx:alpine

# Sao chép output build từ giai đoạn 1 vào thư mục phục vụ của nginx
COPY --from=BUILD /app/dist /usr/share/nginx/html

# Mở cổng 80
EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]