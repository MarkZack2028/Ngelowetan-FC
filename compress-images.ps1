Add-Type -AssemblyName System.Drawing

$maxWidth = 800
$quality = 75L

$folders = @("public\assetMinsoc", "public\players", "public\hero")

$encoder = [System.Drawing.Imaging.Encoder]::Quality
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, $quality)
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

$totalSaved = 0

foreach ($folder in $folders) {
    if (Test-Path $folder) {
        Write-Host "Mengecek folder: $folder..." -ForegroundColor Cyan
        $files = Get-ChildItem -Path $folder -Filter "*.jpg" -File
        
        foreach ($file in $files) {
            $originalSize = $file.Length
            
            # Load gambar
            $img = [System.Drawing.Image]::FromFile($file.FullName)
            
            # Hitung dimensi baru
            if ($img.Width -gt $maxWidth) {
                $ratio = $maxWidth / $img.Width
                $newWidth = $maxWidth
                $newHeight = [int]($img.Height * $ratio)
            } else {
                $newWidth = $img.Width
                $newHeight = $img.Height
            }

            # Buat bitmap baru (hasil resize)
            $bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
            $graphics = [System.Drawing.Graphics]::FromImage($bmp)
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
            $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            $graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)
            
            $graphics.Dispose()
            $img.Dispose() # Tutup file asli supaya bisa ditimpa
            
            $tempFile = $file.FullName + ".tmp"
            
            # Simpan kompresi ke file temp
            $bmp.Save($tempFile, $jpegCodec, $encoderParams)
            $bmp.Dispose()
            
            $newSize = (Get-Item $tempFile).Length
            
            # Cek apakah hasil kompresi lebih kecil
            if ($newSize -lt $originalSize) {
                Move-Item -Path $tempFile -Destination $file.FullName -Force
                $saved = $originalSize - $newSize
                $totalSaved += $saved
                $savedMb = [math]::Round($saved / 1MB, 2)
                $newMb = [math]::Round($newSize / 1KB, 2)
                Write-Host "✅ Diskala & Dikompresi: $($file.Name) -> $($newMb) KB (Hemat $savedMb MB)" -ForegroundColor Green
            } else {
                Remove-Item $tempFile
                Write-Host "⏭️ Dilewati (Sudah optimal): $($file.Name)" -ForegroundColor Yellow
            }
        }
    }
}

$totalSavedMb = [math]::Round($totalSaved / 1MB, 2)
Write-Host "`n🎉 Kompresi Selesai! Total ukuran yang dihemat: $totalSavedMb MB" -ForegroundColor Magenta
