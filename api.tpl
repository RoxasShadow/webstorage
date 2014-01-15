<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>API &raquo; Webstorage</title>
<meta name="author" content="Giovanni Capuano" />
<meta name="robots" content="noindex,nofollow" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<p>Welcome in the documentation page of Webstorage's API.<br />
For now, there are available only in read mode, the complete version will be available soon.</p>

<p>&bull; Request -> the param for 'request' field;<br />
&bull; Params -> the params for the homonyms fields;<br />
&bull; Logged -> Y=Yes, N=Not, NR=Not Required;<br />
&bull; Output -> The output. It can be a string, an int, a boolean or a json;<br />
&bull; Action -> What does your request.</p>
<table align="center" width="100%" cellspacing="0" cellpadding="4" border="1">
<tr>
<td><b>Request</b></td>
<td><b>Params</b></td>
<td><b>Logged</b></td>
<td><b>Output</b></td>
<td><b>Action</b></td>
</tr>

<tr>
<td>availablestoragespace</td>
<td></td>
<td>Y</td>
<td>denied</td>
<td>Returns how much storage space is available in your account.</td>
</tr>

<tr>
<td>countunreadedpm</td>
<td></td>
<td>Y</td>
<td>denied</td>
<td>Returns the number of unreaded PMs.</td>
</tr>

<tr>
<td>deletefollow</td>
<td>(string)you, (string)target</td>
<td>Y</td>
<td>denied, same, notfound, notfollow, error, success</td>
<td>Returns the number of unreaded PMs.</td>
</tr>

<tr>
<td>downloader</td>
<td>(string)filename, (string)nickname</td>
<td>N</td>
<td>denied, notfound, (filestream)</td>
<td>Download a public file.</td>
</tr>

<tr>
<td>following</td>
<td>(string)nickname</td>
<td>Y</td>
<td>json(nicknames)</td>
<td>Return the list of following users.</td>
</tr>

<tr>
<td>isfollowing</td>
<td>(string)you, (string)target</td>
<td>Y</td>
<td>same, notfound, notfollowing, following</td>
<td>Check if you are following an user.</td>
</tr>

<tr>
<td>getlive</td>
<td>(string)nickname</td>
<td>Y</td>
<td>notfound, json(list)</td>
<td>Return the last updates of users you are following.</td>
</tr>

<tr>
<td>getonlineusers</td>
<td></td>
<td>NR</td>
<td>json(nicknames)</td>
<td>Return the list of online users.</td>
</tr>

<tr>
<td>getonlinevisitators</td>
<td></td>
<td>NR</td>
<td>int(number)</td>
<td>Return the number of online visitators.</td>
</tr>

<tr>
<td>getpm</td>
<td>opt(int(id))</td>
<td>Y</td>
<td>denied, notfound, json(pm)</td>
<td>Return the PM registered with the id.</td>
</tr>

<tr>
<td>getuser</td>
<td>opt(nickname)</td>
<td>NR</td>
<td>notfound, json(user)</td>
<td>Return the user knew with the nickname, or all users.</td>
</tr>

<tr>
<td>info</td>
<td>opt(file, nickname)</td>
<td>Y</td>
<td>notfound, denied, json(info)</td>
<td>With the params, you'll get the file infos. Otherwise your infos.</td>
</tr>

<tr>
<td>list</td>
<td>nickname</td>
<td>Y</td>
<td>notfound, json(list)</td>
<td>Return your repository as json.</td>
</tr>

<tr>
<td>login</td>
<td>nickname, password, language</td>
<td>N</td>
<td>alreadylogged, error, success</td>
<td>Perform your login.</td>
</tr>

<tr>
<td>logout</td>
<td></td>
<td>Y</td>
<td>Nlogged, success</td>
<td>Perform your logout.</td>
</tr>

<tr>
<td>mailvalidator</td>
<td>code</td>
<td>N</td>
<td>alreadylogged, notneed, invalid, error, success</td>
<td>Confirm your account registration.</td>
</tr>

<tr>
<td>newfollow</td>
<td>you, target</td>
<td>Y</td>
<td>same, notfound, duplicate, error, success</td>
<td>Permit to follow an user.</td>
</tr>

<tr>
<td>totalinitstorage</td>
<td></td>
<td>NR</td>
<td></td>
<td>Return the actually initial storage which we give you.</td>
</tr>

<tr>
<td>viewer</td>
<td>(string)filename, (boolean)clear, (string)nickname</td>
<td>NR</td>
<td>denied, notfound, (filestream)/(text)</td>
<td>View a file. If clear is true, you will get it in a HTML file.</td>
</tr>

<tr>
<td>viewer</td>
<td>(string)filename, (boolean)clear, (string)nickname</td>
<td>NR</td>
<td>denied, notfound, (filestream)/(text)</td>
<td>View a file. If clear is true, you will get it in a HTML file.</td>
</tr>
</table>
</body>
</html>
