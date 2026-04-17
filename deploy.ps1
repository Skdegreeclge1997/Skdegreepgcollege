# S.K. Degree & P.G. College - Deployment Script
 
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "Starting Production Deployment for S.K. College" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
 
# 1. Check for Node Modules
if (!(Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}
 
# 2. Build Check
Write-Host "Running production build check..." -ForegroundColor Yellow
npm run build
 
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Deployment aborted." -ForegroundColor Red
    exit $LASTEXITCODE
}
 
# 3. Deploy to Vercel
Write-Host "Pushing to Vercel Production..." -ForegroundColor Yellow
npx vercel deploy --prod --yes
 
if ($LASTEXITCODE -eq 0) {
    Write-Host "===============================================" -ForegroundColor Green
    Write-Host "DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
    Write-Host "Your site is live at: https://sk-degree-college-page.vercel.app" -ForegroundColor Green
    Write-Host "===============================================" -ForegroundColor Green
} else {
    Write-Host "Deployment to Vercel failed." -ForegroundColor Red
    exit $LASTEXITCODE
}
