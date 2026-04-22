# S.K. Degree & P.G. College - Deployment Script

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "Starting Production Deployment for S.K. College" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

# 1. Check for Node Modules
if (!(Test-Path "node_modules")) {
    Write-Host "[1/5] Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# 2. Build Check
Write-Host "[2/5] Running production build check..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Deployment aborted." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "[3/5] Build passed!" -ForegroundColor Green

# 3. Git Stage + Commit + Push
Write-Host "[4/5] Pushing to GitHub..." -ForegroundColor Yellow
git add -A
$commitMsg = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "deploy: update $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}
git commit -m $commitMsg
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Git push failed! Check your connection." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "[5/5] Pushed to GitHub. Vercel will auto-deploy." -ForegroundColor Green

Write-Host "===============================================" -ForegroundColor Green
Write-Host "DEPLOYMENT TRIGGERED!" -ForegroundColor Green
Write-Host "Check status at: https://vercel.com/YOUR_TEAM/YOUR_PROJECT" -ForegroundColor Cyan
Write-Host "Live site: https://skdegreecollege.edu.in" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Green
