# My Brother Medical — Android

Android client for the `superG_Agent` super-agent backend.

## Product idea
The Android app is the user-facing layer. The super-agent performs research, source verification, orchestration, and response generation.

Core modules planned:
- Medical Q&A with source citations
- Medication reminders
- Nutrition cards and visual explanations
- Safety / urgent-symptom guidance
- Source audit trail
- Arabic-first UI

## Backend contract
The current client expects:
`POST /v1/medical/ask`

Request:
```json
{"message":"...","locale":"ar"}
```

Response:
```json
{
  "answer":"...",
  "sources":[{"title":"...","url":"...","publisher":"...","publishedAt":"..."}],
  "safetyNote":"..."
}
```

The endpoint URL should be supplied through a secure runtime configuration in the next integration pass. API keys must never be committed to GitHub.

## Build
Push to `main` or run the `Build Android APK` workflow manually. The debug APK is uploaded as a workflow artifact.
