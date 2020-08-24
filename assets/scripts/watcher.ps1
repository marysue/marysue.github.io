$labID=$args[0]
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = 'c:\inetpub\wwwroot'
$watcher.IncludeSubdirectories = $true
$watcher.NotifyFilter = [System.IO.NotifyFilters]::LastWrite -bor [System.IO.NotifyFilters]::FileName -bor [System.IO.NotifyFilters]::DirectoryName

$toPath = "c:\users\student\links\WebServerManagedFolder\"
$pso = new-object psobject -property @{toPath = $toPath}

Out-File -FilePath c:\users\administrator\desktop\outlog.txt -Append -InputObject "     Deleting contents of wwwroot"
get-childitem c:\inetpub\wwwroot\* -recurse | remove-item -force -recurse
Out-File -FilePath c:\users\administrator\desktop\outlog.txt -Append -InputObject "     Copying contents of $toPath to wwwroot"
Copy-Item $toPath* c:\inetpub\wwwroot\ -recurse


Register-ObjectEvent $watcher Created -SourceIdentifier FileCreated -MessageData $pso -Action {
    $name = $Event.SourceEventArgs.Name
    $fullPath = $Event.MessageData.toPath + $name
    $fullName = "c:\inetpub\" + $name
    $changeType = $Event.SourceEventArgs.ChangeType
    $timeStamp = $Event.TimeGenerated
    $toPath = $Event.MessageData.toPath
    
    Write-Host ""
    Write-Host ""
    Write-Host "FILE CREATED" -fore green
    Write-Host "============" -fore green
    Write-Host "  FileName:      $name" -fore green
    Write-Host "  Copy from:     $fullName" -fore green
    Write-Host "  Copy to:       $fullPath" -fore green
    Write-Host "  Change type:   $changeType" -fore green
    Write-Host "  Time:          $timeStamp" -fore green
    Write-Host "  ToPath:        $toPath" -fore green

    Out-File -FilePath c:\users\administrator\desktop\outlog.txt -Append -InputObject "The file '$name' was $changeType at $timeStamp"
    Out-File -FilePath c:\users\administrator\desktop\outlog.txt -Append -InputObject "     Deleting contents of $toPath"
    get-childitem $toPath* -recurse | remove-item -force -recurse
    Out-File -FilePath c:\users\administrator\desktop\outlog.txt -Append -InputObject "     Copying contents of c:\inetpub\wwwroot to $toPath"
    Copy-Item c:\inetpub\wwwroot\* $toPath -recurse
}

Register-ObjectEvent $watcher Deleted -SourceIdentifier FileDeleted -MessageData $pso -Action {
    $name = $Event.SourceEventArgs.Name
    $fullPath = $Event.MessageData.toPath + $name
    $fullName = "c:\inetpub\" + $name
    $changeType = $Event.SourceEventArgs.ChangeType
    $timeStamp = $Event.TimeGenerated
    $toPath = $Event.MessageData.toPath
    
    Write-Host ""
    Write-Host ""
    Write-Host "FILE DELETED"  -fore red
    Write-Host "============" -fore red
    Write-Host "  FileName:              $name" -fore red
    Write-Host "  Deleted from:          $fullName" -fore red
    Write-Host "  Deleting in target:    $fullPath" -fore red
    Write-Host "  Change type:           $changeType" -fore red
    Write-Host "  Time:                  $timeStamp" -fore red
    Write-Host "  ToPath:                $toPath" -fore red

    Out-File -FilePath c:\users\administrator\desktop\outlog.txt -Append -InputObject "The file '$name' was $changeType at $timeStamp"
    Out-File -FilePath c:\users\administrator\desktop\outlog.txt -Append -InputObject "     Deleting contents of $toPath"
    get-childitem $toPath* -recurse | remove-item -force -recurse
    Out-File -FilePath c:\users\administrator\desktop\outlog.txt -Append -InputObject "     Copying contents of c:\inetpub\wwwroot to $toPath"
    Copy-Item c:\inetpub\wwwroot\* $toPath -recurse
}

Register-ObjectEvent $watcher Changed -SourceIdentifier FileChanged -MessageData $pso -Action {
    $name = $Event.SourceEventArgs.Name
    $fullName = "c:\inetpub\" + $name
    $fullPath = $Event.MessageData.toPath + $name
    $changeType = $Event.SourceEventArgs.ChangeType
    $timeStamp = $Event.TimeGenerated
    $toPath = $Event.MessageData.toPath
    
    Write-Host ""  
    Write-Host ""  
    Write-Host "FILE Changed" -fore white
    Write-Host "============" -fore white
    Write-Host "  FileName:              $name" -fore white
    Write-Host "  Changed from:          $fullName" -fore white
    Write-Host "  Changing in target:    $fullPath" -fore white
    Write-Host "  Change type:           $changeType" -fore white
    Write-Host "  Time:                  $timeStamp" -fore white
    Write-Host "  ToPath:                $toPath" -fore white

    Out-File -FilePath c:\users\administrator\desktop\outlog.txt -Append -InputObject "The file '$name' was $changeType at $timeStamp"
    Out-File -FilePath c:\users\administrator\desktop\outlog.txt -Append -InputObject "     Deleting contents of $toPath"
    get-childitem $toPath* -recurse | remove-item -force -recurse
    Out-File -FilePath c:\users\administrator\desktop\outlog.txt -Append -InputObject "     Copying contents of c:\inetpub\wwwroot to $toPath"
    Copy-Item c:\inetpub\wwwroot\* $toPath -recurse
}

Register-ObjectEvent $watcher Renamed -SourceIdentifier FileRenamed -MessageData $pso -Action {
    $name = $Event.SourceEventArgs.Name
    $fullPath = $Event.MessageData.toPath + $name
    $changeType = $Event.SourceEventArgs.ChangeType
    $timeStamp = $Event.TimeGenerated
    $toPath = $Event.MessageData.toPath
    
    Write-Host ""
    Write-Host ""
    Write-Host "FILE Renamed " -fore yellow
    Write-Host "============" -fore yellow
    Write-Host "  FileName:              $name" -fore yellow
    Write-Host "  Copying from:          $fullName" -fore yellow
    Write-Host "  Copying to target:     $fullPath" -fore yellow
    Write-Host "  Deleting in target:    <Need code for this>" -fore yellow
    Write-Host "  Change type:           $changeType" -fore yellow
    Write-Host "  Time:                  $timeStamp" -fore yellow
    Write-Host "  ToPath:                $toPath" -fore yellow

    Out-File -FilePath c:\users\administrator\desktop\outlog.txt -Append -InputObject "The file '$name' was $changeType at $timeStamp"
    Out-File -FilePath c:\users\administrator\desktop\outlog.txt -Append -InputObject "     Deleting contents of $toPath"
    get-childitem $toPath* -recurse | remove-item -force -recurse
    Out-File -FilePath c:\users\administrator\desktop\outlog.txt -Append -InputObject "     Copying contents of c:\inetpub\wwwroot to $toPath"
    Copy-Item c:\inetpub\wwwroot\* $toPath -recurse
}

