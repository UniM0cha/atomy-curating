# Play Store 배포 가이드

## 목차

1. [사전 준비](#사전-준비)
2. [EAS 설정](#eas-설정)
3. [Google Service Account 설정](#google-service-account-설정)
4. [빌드 명령어](#빌드-명령어)
5. [Play Store 제출](#play-store-제출)
6. [버전 관리](#버전-관리)
7. [문제 해결](#문제-해결)

---

## 사전 준비

### 1. EAS CLI 설치

```bash
npm install -g eas-cli
```

### 2. Expo 계정 로그인

```bash
eas login
```

Expo 계정이 없다면 [expo.dev](https://expo.dev)에서 무료로 생성할 수 있습니다.

### 3. 프로젝트 EAS 설정

```bash
cd /path/to/atomy-curating
eas build:configure
```

이 명령은 `app.json`에 `extra.eas.projectId`를 자동으로 추가합니다.

---

## EAS 설정

### eas.json 빌드 프로필

| 프로필        | 용도            | 출력 형식 | 명령어                                       |
| ------------- | --------------- | --------- | -------------------------------------------- |
| `development` | 개발/디버깅     | APK       | `eas build -p android --profile development` |
| `preview`     | 테스트 배포     | APK       | `eas build -p android --profile preview`     |
| `production`  | Play Store 출시 | AAB       | `eas build -p android --profile production`  |

### 버전 자동 증가

`eas.json`에 `autoIncrement: true` 설정이 되어 있어 production 빌드 시 `versionCode`가 자동으로 증가합니다.

---

## Google Service Account 설정

CLI로 Play Store에 앱을 제출하려면 Service Account가 필요합니다.

### 1. Google Cloud Console에서 서비스 계정 생성

1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. **API 및 서비스** > **사용자 인증 정보** 이동
4. **사용자 인증 정보 만들기** > **서비스 계정** 선택
5. 서비스 계정 이름 입력 (예: `eas-submit`)
6. 역할은 비워두고 생성 완료

### 2. JSON 키 다운로드

1. 생성된 서비스 계정 클릭
2. **키** 탭 이동
3. **키 추가** > **새 키 만들기** > **JSON** 선택
4. 다운로드된 파일을 프로젝트 루트에 `google-service-account.json`으로 저장

⚠️ **중요**: 이 파일은 절대 Git에 커밋하지 마세요! (이미 `.gitignore`에 추가됨)

### 3. Play Console에서 API 액세스 권한 부여

1. [Google Play Console](https://play.google.com/console) 접속
2. **설정** > **API 액세스** 이동
3. **새 서비스 계정 연결** 클릭
4. 위에서 생성한 서비스 계정의 이메일 입력
5. **권한 부여**:
   - **앱 정보 보기 및 다운로드**
   - **버전 및 트랙 관리**
   - **출시 관리**

---

## 빌드 명령어

### 개발용 빌드 (APK)

테스트용 APK 파일을 생성합니다.

```bash
eas build --platform android --profile development
```

### 프리뷰 빌드 (APK)

내부 테스터에게 배포할 APK를 생성합니다.

```bash
eas build --platform android --profile preview
```

### 프로덕션 빌드 (AAB)

Play Store에 제출할 AAB 파일을 생성합니다.

```bash
eas build --platform android --profile production
```

### 빌드 + 자동 제출

빌드 완료 후 자동으로 Play Store에 제출합니다.

```bash
eas build --platform android --profile production --auto-submit
```

---

## Play Store 제출

### 첫 번째 제출 (수동 업로드 필수)

⚠️ **중요**: 첫 번째 AAB 파일은 반드시 Play Console에서 수동으로 업로드해야 합니다.

1. `eas build --platform android --profile production` 실행
2. 빌드 완료 후 EAS 대시보드에서 AAB 파일 다운로드
3. [Google Play Console](https://play.google.com/console) 접속
4. **앱 만들기** 클릭
5. 앱 정보 입력:
   - 앱 이름: 애터미 큐레이팅
   - 기본 언어: 한국어
   - 앱 유형: 앱
   - 무료/유료: 무료
6. **프로덕션** > **새 버전 만들기**
7. AAB 파일 업로드
8. 출시 노트 작성
9. **검토 요청**

### 두 번째 이후 제출 (CLI 사용 가능)

```bash
# 이미 빌드된 버전 제출
eas submit --platform android

# 빌드 + 제출 동시에
eas build --platform android --profile production --auto-submit
```

### 제출 트랙

| 트랙         | 설명                              |
| ------------ | --------------------------------- |
| `internal`   | 내부 테스터 (최대 100명) - 기본값 |
| `alpha`      | 알파 테스터                       |
| `beta`       | 베타 테스터                       |
| `production` | 공개 출시                         |

트랙 변경:

```bash
eas submit --platform android --profile production
# 프롬프트에서 트랙 선택
```

---

## 버전 관리

### 버전 번호 규칙

| 항목          | 위치           | 설명                             |
| ------------- | -------------- | -------------------------------- |
| `version`     | app.json       | 사용자에게 보이는 버전 (1.0.0)   |
| `versionCode` | app.json / EAS | Play Store 내부 버전 번호 (정수) |

### 업데이트 시 버전 변경

1. **app.json**의 `version` 수정 (예: 1.0.0 → 1.1.0)
2. `versionCode`는 EAS가 자동 증가 (`appVersionSource: "remote"` 설정 시)
3. production 프로필로 빌드
4. 제출

```bash
# 버전 확인
eas build:version:get --platform android

# 수동 버전 설정 (필요시)
eas build:version:set --platform android --build-number 10
```

---

## 문제 해결

### 빌드 실패

```bash
# 캐시 삭제 후 재빌드
eas build --platform android --profile production --clear-cache
```

### Service Account 인증 오류

1. JSON 키 파일 경로 확인
2. Play Console에서 권한 확인
3. 24시간 후 재시도 (권한 적용에 시간 소요)

### 버전 코드 충돌

```bash
# 현재 버전 확인
eas build:version:get --platform android

# 버전 코드 증가
eas build:version:set --platform android --build-number [새로운_번호]
```

---

## 체크리스트

### 빌드 전

- [ ] `npm run lint` 통과
- [ ] `npm run type-check` 통과 (있다면)
- [ ] 앱 아이콘 확인
- [ ] app.json 버전 확인
- [ ] eas.json 설정 확인

### 스토어 등록 전

- [ ] 개인정보처리방침 URL 준비 (GitHub Pages 배포)
- [ ] 스크린샷 4장 이상
- [ ] 앱 설명문 (`docs/store-listing.md` 참고)
- [ ] 콘텐츠 등급 설문 완료
- [ ] 앱 카테고리 선택

### 출시 전

- [ ] 내부 테스트 트랙에서 테스트
- [ ] 실제 기기에서 테스트
- [ ] 개인정보처리방침 링크 동작 확인

---

## 유용한 명령어

```bash
# EAS 프로젝트 정보
eas whoami
eas project:info

# 빌드 목록
eas build:list

# 특정 빌드 상태
eas build:view [BUILD_ID]

# 제출 목록
eas submit:list
```

---

## 참고 링크

- [Expo EAS 문서](https://docs.expo.dev/eas/)
- [EAS Submit 문서](https://docs.expo.dev/submit/introduction/)
- [Google Play Console 도움말](https://support.google.com/googleplay/android-developer)
