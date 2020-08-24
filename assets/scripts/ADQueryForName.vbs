'================================================================================================
' Name:  	QueryADForName.vbs
' Author: 	Mary Lark
' Purpose:  	Queries active directory, looking in surName for a partial string match
'           	Returns PublicID and MD5
' Input: 	substring to match, custOU to search - case insensitive
' Output:  	PublicID and MD5 for all matches
'================================================================================================

'On Error Resume Next
dim ADQUERY_RESULT_FILE, FORAPPENDING
dim fs, objTextFile

FORAPPENDING = 8
ADQUERY_RESULT_FILE = "c:\DOCUME~1\administrator.STUDENT\Desktop\ADQuery_Results.txt"

Set fs = CreateObject("Scripting.FileSystemObject")
If (fs.FileExists(ADQUERY_RESULT_FILE)) Then
	fs.DeleteFile(ADQUERY_RESULT_FILE)
end if

Set objTextFile = fs.OpenTextFile(ADQUERY_RESULT_FILE, FORAPPENDING, True)

'===============================
'Input functions
'===============================
Function stopProg(msg)
	stopProg = MsgBox(msg & vbcrlf & vbcrlf & "Continue?", 4, "Please choose yes or no.")
End Function

Function getName()
 getName=InputBox("Enter name to search: " & vbcrlf & vbcrlf & "Search will return all names that contain substring",,,,500)
End Function

Function getcustOU()
	getcustOU = InputBox("Enter customer OU:  ",,,,500)
End Function

'===============================
' input basic validation
'===============================

Dim studentName, custOU
studentName = getName()
if studentName = "" then
	wscript.echo "No name entered."
	wscript.quit
end if
custOU = getcustOU()
if custOU = "" then
	wscript.echo "No customer entered."
	wscript.quit
end if


'======================================
'establish active directory connection
'======================================
'strOU = "OU=Cust001,DC=STUDENT,DC=com"
strOU = "OU=" & custOU & ",DC=STUDENT,DC=com"
'strOU = "OU=" & custOU & ",DC=STUDENTTEST,DC=com"
' Connect to the LDAP server's root object
Set objRootDSE = GetObject("LDAP://RootDSE")
strDNSDomain = objRootDSE.Get("defaultNamingContext")
strTarget = "LDAP://" & strOU
'wscript.Echo "Starting search from " & strTarget

' Connect to Ad Provider
Set objConnection = CreateObject("ADODB.Connection")
objConnection.Provider = "ADsDSOObject"
objConnection.Open "Active Directory Provider"

dim objCmd, objRecordSet, objMDRecordSet
Set objCmd =   CreateObject("ADODB.Command")
Set objCmd.ActiveConnection = objConnection 
Const ADS_SCOPE_SUBTREE = 2
objCmd.Properties("Page Size") = 500
objCmd.Properties("Timeout") = 30
objCmd.Properties("Searchscope") = ADS_SCOPE_SUBTREE
objCmd.Properties("Cache Results") = True


'=======================================
'active directory query
'=======================================

Dim userName
objCmd.CommandText = "SELECT sn FROM '" & strTarget & "' WHERE objectCategory = 'user' AND sn='*" & studentName & "*'"


Set objRecordSet = objCmd.Execute
if objRecordset.EOF <> true then
	objRecordSet.MoveFirst
end if


'====================================================
' look at records returned for additional information
'====================================================


Dim publicID, myArrayList

' this code creates and populates an ArrayList
dim resultsArray(), i
i = 0


while (objRecordset.EOF <> true)

	' Iterate through the results
	userName = objRecordSet.Fields("sn").Value

	'msg = msg & vbcrlf & "     Found UserName:  " & userName & vbcrlf

	objCmd.CommandText = "SELECT displayName FROM '" & strTarget & "' WHERE objectCategory = 'user' AND sn='" & userName & "'"
	Set objMDRecordSet = objCmd.Execute
	if objMDRecordset.EOF <> true then
		objMDRecordSet.MoveFirst
		MD5 = objMDRecordSet.Fields("displayName").Value

	else
		MD5 = "record not found"
	end if
	ReDim Preserve resultsArray(i)	
	resultsArray(i) = userName & vbtab & "  MD5: " & MD5
	i = i + 1	
	
	objRecordSet.MoveNext
	objMDRecordSet = NULL

	
WEnd


'===============================================
' Print query results in groups of 15
'===============================================

dim remainder, j, k
dim arraySize

On Error Resume Next
arraySize = ubound(resultsArray)
if Err <> 0 then
	wscript.echo "No results found."
	wscript.quit
end if


wscript.echo "Number of entries found:  " & arraySize + 1
msg = ""
msgBoxSize = 0

For j = 0 to arraySize
	msg = msg & resultsArray(j) & vbcrlf
	objTextFile.WriteLine(msg)
	if j = arraySize then
		wscript.echo(msg)
		wscript.quit
	end if

	if msgBoxSize = 15 then
		if stopProg(msg) = 7 then
			wscript.quit
		else
			msgBoxSize = 0
			msg = ""
		end if
	else 
		msgBoxSize = msgBoxSize + 1
	end if
Next
'objTextFile.WriteLine(msg)
objTextFile.Close


wscript.echo "Created file: " & ADQUERY_RESULT_FILE &  vbcrlf & " ... Done."
	

