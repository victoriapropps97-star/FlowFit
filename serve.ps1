$port = 8000
$http = [System.Net.HttpListener]::new()
$http.Prefixes.Add("http://localhost:$port/")
$http.Start()
Write-Host "Serving on http://localhost:$port/ - Press Ctrl+C to stop"
try {
    while ($http.IsListening) {
        $context = $http.GetContext()
        $request = $context.Request
        $response = $context.Response
        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/") { $localPath = "/index.html" }
        $filePath = Join-Path (Get-Location) $localPath.TrimStart("/")
        if (Test-Path $filePath -PathType Leaf) {
            try {
                $isBinary = @('.png', '.jpg', '.jpeg', '.gif', '.ico', '.bmp') -contains [IO.Path]::GetExtension($filePath)
                if ($isBinary) {
                    $buffer = [System.IO.File]::ReadAllBytes($filePath)
                } else {
                    $content = Get-Content $filePath -Raw -Encoding UTF8
                    $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
                }
                $response.ContentType = switch ([IO.Path]::GetExtension($filePath)) {
                    ".html" { "text/html; charset=utf-8" }
                    ".js" { "application/javascript; charset=utf-8" }
                    ".css" { "text/css; charset=utf-8" }
                    ".json" { "application/json; charset=utf-8" }
                    ".png" { "image/png" }
                    ".jpg" { "image/jpeg" }
                    ".jpeg" { "image/jpeg" }
                    ".gif" { "image/gif" }
                    ".ico" { "image/x-icon" }
                    ".bmp" { "image/bmp" }
                    default { "application/octet-stream" }
                }
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            } catch {
                Write-Host "Error serving $filePath : $_"
                $response.StatusCode = 500
                $errorMsg = "Internal Server Error"
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($errorMsg)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            }
        } else {
            $response.StatusCode = 404
            $notFound = "<h1>404 - Not Found</h1>"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($notFound)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        $response.OutputStream.Close()
    }
} catch {
    Write-Host "Server error: $_"
} finally {
    $http.Stop()
}