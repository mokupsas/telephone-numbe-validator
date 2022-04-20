/**
 * Checks if telephone number is a valid US number
 * @param str Telephone number.
 * @return bool Is telephone number a valid US number.
 */
function telephoneCheck(str) 
{
	var num = formNumber(str);
	
	if(!checkFormat(str))
		return false;
	
	if(hasAreaCode(num) && checkAreaCode(num))
	{
		return true;
	}
	else if(num.length == 10)
	{
		return true;
	}
	
	return false;
}

/**
 * Checks telephone number format
 * @param str Telephone number.
 * @return num Is format good.
 */
function checkFormat(str)
{
	// Checking if string is not empty
	if(str.length <= 0)
		return false;
	
	// Checking if telephone number starts with digit only ot bracket
	if(!isNumber(str[0]) && str[0] != "(")
		return false;
	
	// Variables for bracket control
	var dashes = 0; 			// count how many dashes number has
	var openBracket = false;
	var closeBracket = false;
	var bracketDis = -1; 		// here we count distance between brackets when opening bracket is found
	
	for(var i=0; i < str.length; i++)
	{
		if(!isAllowedChar(str[i]))
			return false;
		
		if(str[i] == "-")
			dashes++;
		
		if(str[i] == "(")
			openBracket = true;
		
		if(str[i] == ")")
			closeBracket = true;
		
		// Count distance if open bracket found and closed is not found
		if(openBracket == true && closeBracket == false)
			bracketDis++;
	}
	
	// If there is more than 2 dashes return
	if(dashes > 2)
		return false;
	
	// If distance bigger than 3 digits return
	if(bracketDis > 3)
		return false;
	
	if(openBracket == false && closeBracket == false)
		return true;
	
	if(openBracket == true && closeBracket == true)
		return true;
	
	return false;
}

/**
 * Checks if provided character allowed in telephone number
 * @param cha Character to validate.
 * @return bool Is character a allowed.
 */	
function isAllowedChar(cha)
{
	return cha.length === 1 && cha.match(/[0-9()-\s]/i);
}

/**
 * Gets numbers from a string 
 * @param str Telephone number.
 * @return num Telephone number only with digits.
 */
function formNumber(str)
{
	var num = "";
	
	for(var i=0; i < str.length; i++)
	{
		if(isNumber(str[i]))
			num += str[i];
	}
	
	return num;
}

/**
 * Checks if provided character is a number/digit
 * @param cha Character to validate.
 * @return bool Is character a number.
 */	
function isNumber(cha) {
	return cha.length === 1 && cha.match(/[0-9]/i);
}

/**
 * Checks if telephone number has area code
 * @param num Telephone number.
 * @return bool Does the phone number have an area code.
 */	
function hasAreaCode(num)
{
	if(num.length == 11)
		return  true;
	
	return false;
}

/**
 * Validates if area code is an US code
 * @param num Telephone number.
 * @return bool Does telephone number have a valid US area code.
 */
function checkAreaCode(num)
{
	return (num[0] == 1 || num[0] == "1");
}

//console.log(telephoneCheck("(555)-555-5555"));
