param(
    [Parameter(Mandatory = $true)]
    [String]$IP,
    [String]$mac,
    [String]$subnetId,
    [String]$server
)
Import-Module './powershell/Modules/DHCP/Microsoft.DHCP.PowerShell.Admin.psm1'
Import-Module './powershell/Modules/Dns/DNSShell'


Clear-Host

Write-Host 'Initiating IP reservation on DHCP server'
Try
{
    new-dhcpreservation -scope RWN_WLAN -Server $server -IPAddress $IP -MACAddress $mac
}
Catch
{
    $ErrorMessage = $_.Exception.Message
    $FailedItem = $_.Exception.ItemName

    Write-Host $ErrorMessage
    Write-Host $FailedItem
    Break
}

# $adOpenStatic = 3
# $adLockOptimistic = 3

# $objConnection = New-Object -comobject ADODB.Connection
# $objRecordset = New-Object -comobject ADODB.Recordset
# $objrecordset1 = New-Object -comobject ADODB.Recordset #IP Addresses in Database, need to check when doing bulk adds
# $objConnection.Open("Provider = Microsoft.ACE.OLEDB.12.0;Data Source = c:\scripts\DB\HostRegistration.accdb")


###################### Function Declarations ###########################
# function get-FreeIpfromScope ($type) {


#  if ($type -eq "WLAN") {$scope="172.29.53"} else {$scope="172.29.52"}

#  [string]$dscope=$scope + ".0"
#  $objRecordset1.Open("Select IPAddr From Registrations WHERE Ipaddr LIKE '" + $scope + "%'", $objConnection,$adOpenStatic,$adLockOptimistic) #Return IP addresses from Database for the current $scope 
#  $count=$objrecordset1.RecordCount # number of addresses in use for the current scope

#     do {$IPlist=$IPlist + "`n" + $objRecordSet1.Fields.Item("IPAddr").Value #build IP list from returned records
#         $objrecordset1.movenext()
#        } while ($objrecordset1.EOF -ne $TRUE)


#  if ($objRecordset1.Recordcount -ne $Null) {

# write-host -foregroundcolor Green $count addresses currently used in $dscope 

# $objrecordset1.close() 

#  if ($count -le 240) { #if less than 240 addresses are in use, process this block of code

#         $FoundIP=$false
#         do  {
#              # first half of scope - 221 addresses max 
#              $octet=get-random -minimum 17 -maximum 240 #generate random number for last octet
#              $proposedIP=$scope + ".$octet" # 
#              $IP=$proposedIP 
#              write-host "Checking " $IP " ..."

#                 if ($IPlist.Contains($proposedIP) -eq $false)#compare proposed IP to list brought back from DB

#                         {write-host "Will assign IP Address " $IP ;$FoundIP=$true} Else {write-host $IP is in use, try again ; $FoundIP=$false}

#              } while ($FoundIP -eq $false)
#                      }  
# Else
#              {
#                   do  {
#                    # second half of scope 251 addresses max
#                   $octet=get-random -minimum 2 -maximum 253
#                   $proposedIP=$scope + ".$octet"
#                   $IP=$proposedIP 
#                   write-host "Checking " $IP " ..."

#                   if ($IPlist.Contains($proposedIP) -eq $false)
#                            {write-host "Will assign IPaddress" $IP ; $FoundIP=$true} Else {write-host $IP is in use, try again ; $FoundIP=$false}


#                      } while ($FoundIP -eq $false)
#                }
#                }

#  return $IP
#  remove-variable $IP
#  remove-varible $IPlist
#  remove-variable $proposedIP
#  } 

################### End Function Declarations



# $objRecordset.Open("Select * From Registrations WHERE Add=Yes", $objConnection,$adOpenStatic,$adLockOptimistic) #Pull records from the Databse where ADD is checked
# if ($objRecordset.EOF -ne $TRUE){
# do {
#  # Get the MAC, connection type and hostname   
# $mac = $objRecordSet.Fields.Item("MAC").Value
# $type = $objRecordSet.Fields.Item("Type").Value
# $hostname = $objRecordSet.Fields.Item("Hostname").Value
# write-host "Adding DHCP reservation for "$hostname " ..."
# $IP=Get-FreeIpFromScope $type #Find a free IP




# $dateadded=get-date #get the date and time and update the fields in the database
# if ($objRecordSet.Fields.Item("DateAdded").Value -eq $Null) {$objRecordSet.Fields.Item("DateAdded").Value = $dateadded}
# if ($objRecordSet.Fields.Item("Add").Value -eq "Yes") {$objRecordSet.Fields.Item("DateUpdated").Value = $dateadded}
# if ($type -eq "WLAN") {$Regtype= 52} Else {$Regtype=54}

# new-dhcpreservation -scope 172.29.$Regtype.0 -Server rwn-ad-001.go.illinois.dvp s.local -IPAddress $IP -MACAddress $mac

# $objRecordSet.Fields.Item("IPAddr").Value = $IP

# $objRecordSet.Fields.Item("Add").Value = $False
# $objRecordSet.Update()
# $objrecordset.Movenext()
# } until ($objRecordSet.BOF -eq $True -or $objrecordset.EOF -eq $True)
# } Else {write-host "Nothing to do ..."}
# $objRecordSet.Close()
# $objConnection.Close()