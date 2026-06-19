param(
  [Parameter(Mandatory = $true)]
  [string]$RsvpsCsv,

  [Parameter(Mandatory = $true)]
  [string]$WishesCsv,

  [Parameter(Mandatory = $true)]
  [string]$OutputPath
)

function Convert-PostgresTimestampToIsoUtc {
  param([string]$Value)

  return (($Value -replace ' ', 'T') -replace '\+00$', 'Z')
}

$rsvps = Import-Csv -LiteralPath $RsvpsCsv -Encoding UTF8 | ForEach-Object {
  [ordered]@{
    id = $_.id
    name = $_.name
    guests = [int]$_.guests
    attendance = $_.attendance
    created_at = Convert-PostgresTimestampToIsoUtc $_.created_at
  }
}

$wishes = Import-Csv -LiteralPath $WishesCsv -Encoding UTF8 | ForEach-Object {
  [ordered]@{
    id = $_.id
    name = $_.name
    message = $_.message
    created_at = Convert-PostgresTimestampToIsoUtc $_.created_at
  }
}

$attending = @($rsvps | Where-Object { $_.attendance -eq 'attending' })
$declined = @($rsvps | Where-Object { $_.attendance -eq 'declined' })
$guestCount = 0
foreach ($rsvp in $attending) {
  $guestCount += $rsvp.guests
}

$summary = [ordered]@{
  totalRsvps = @($rsvps).Count
  attending = $attending.Count
  declined = $declined.Count
  guestCount = $guestCount
  wishes = @($wishes).Count
}

$rsvpJson = $rsvps | ConvertTo-Json -Depth 5
$wishJson = $wishes | ConvertTo-Json -Depth 5
$summaryJson = $summary | ConvertTo-Json -Depth 5

$content = @"
import type { RsvpRecord, WishRecord } from "./validation";

export const archivedRsvps = $rsvpJson satisfies RsvpRecord[];

export const archivedWishes = $wishJson satisfies WishRecord[];

export const archivedSummary = $summaryJson;
"@

Set-Content -LiteralPath $OutputPath -Value $content -Encoding UTF8
Write-Output "RSVPs=$(@($rsvps).Count) Wishes=$(@($wishes).Count) Guests=$guestCount"
