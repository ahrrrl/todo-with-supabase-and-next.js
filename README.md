# Supabase 와 next.js 15v으로 만든 간단한 todolist
- supabase를 이용하여 간단한 CRUD를 구현
- database.types.ts를 이용하여 만들어둔 table의 타입을 쉽게 가져오기
- RLS 정책을 만들어 테이블에서 회원본인 행만 접근 가능하게 설정

<br/>
<br/>

## 사용 라이브러리

### Shadcn UI, react-hot-toast, lucide-react
간단하고 빠른 ui 구성

### tip-tap
마크다운 기반 텍스트를 사용하고 JSON 형식으로 DB에 저장

### zod
form 유효성검사에 활용 
server action을 이용하여 form처리를 하였지만 클라이언트에서도 한번더 유효성검사(제출하기 전 즉각적인 유효성검사도 필요하다는 요구전제)

<br/>
<br/>

## 배포 주소
https://todo-with-supabase-and-next-2r4f9fa2k.vercel.app/
