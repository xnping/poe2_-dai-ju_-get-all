# Clean old files
if (Test-Path "assets") { Remove-Item -Path "assets" -Recurse -Force }
if (Test-Path "index.html") { Remove-Item -Path "index.html" -Force }
if (Test-Path "dist") { Remove-Item -Path "dist" -Recurse -Force }

# Run build
npm run build

# Create .nojekyll file
New-Item -Path ".nojekyll" -ItemType "file" -Force

# Copy build files
if (Test-Path "dist") {
    Copy-Item -Path "dist/*" -Destination "." -Recurse -Force
    Copy-Item -Path "public/vite.svg" -Destination "." -Force
    Remove-Item -Path "dist" -Recurse -Force
}