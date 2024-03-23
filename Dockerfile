# Node.js 공식 이미지를 사용합니다. 버전은 프로젝트 요구사항에 맞춰 선택하세요.
FROM node:14

# 앱 디렉토리 생성
WORKDIR /usr/src/app

# 앱 의존성 설치
# package.json 과 package-lock.json을 모두 복사합니다.
COPY package*.json ./

RUN npm install
# 프로덕션을 위해 코드를 실행하는 경우
# RUN npm ci --only=production

# 앱 소스 추가
COPY . .

# 앱이 3000 포트에서 실행됩니다. Docker 컨테이너 내부 포트 설정
EXPOSE 7070

# 앱 실행
CMD [ "node", "server.js" ]
