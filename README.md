# DevLog Frontend

DevLog는 개발 공부 기록을 작성하고 공유할 수 있는 웹 서비스
(AWS 실습용)

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- AWS S3 Static Website Hosting

## Features

- 회원가입
- 로그인 / 로그아웃
- JWT 토큰 저장
- 게시글 목록 조회
- 로그인한 사용자 글 작성
- Spring Boot 백엔드 API 연동

## Deployment

Frontend is deployed using AWS S3 static website hosting.

```text
Browser
→ S3 React Frontend
→ EC2 Nginx
→ Spring Boot Backend
→ RDS MySQL
