const LOWERCASE_LETTER_REGEX = /(?=.*[a-z])/;
const UPPERCASE_LETTER_REGEX = /(?=.*[A-Z])/;
const DIGIT_REGEX = /(?=.*\d)/;
const SPECIAL_CHARACTER_REGEX = /(?=.*[@$!%*?&])/;
const PASSWORD_LENGTH_REGEX = /^.{1,5}$/;
const ALPHANUMERIC_UNDERSCORE_USERNAME_REGEX = /^[a-zA-Z0-9_]*$/;
const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  
export function verifyCredentialsCriteria(credentials) {
  let answer = true;

  if (!ALPHANUMERIC_UNDERSCORE_USERNAME_REGEX.test(credentials.username)) {
    alert(
      "Invalid characters in the username. Please use only letters, numbers, and underscores."
    );
    answer =  false;
  }

  if (
    !STRONG_PASSWORD_REGEX.test(credentials.password) ||
    // props.password.length <= 5
    PASSWORD_LENGTH_REGEX.test(credentials.password)
  ) {
    answer = false;
    let errorMessages =
      "Invalid password. Please ensure it meets the following criteria:\n";
    if (PASSWORD_LENGTH_REGEX.test(credentials.password)) {
      errorMessages += "• Password must be at least 6 characters long\n";
    }
    if (!LOWERCASE_LETTER_REGEX.test(credentials.password)) {
      // done
      errorMessages += "• At least one lowercase letter\n";
    }

    if (!UPPERCASE_LETTER_REGEX.test(credentials.password)) {
      errorMessages += "• At least one uppercase letter\n";
    }

    if (!DIGIT_REGEX.test(credentials.password)) {
      // done
      errorMessages += "• At least one digit\n";
    }

    if (!SPECIAL_CHARACTER_REGEX.test(credentials.password)) {
      // done
      errorMessages += "• At least one special character (@$!%*?&)\n";
    }
    alert(errorMessages);
  }
  return answer;
}

// obj(listname and alllists)

export function createListCreteria (obj) {
  const trimmedNewName = obj.listName.trim();
  let capitalizedNewName = trimmedNewName
    .replace(/\s{2,}/g, ' ') 
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

    let newobj = {
      isNameValid : false,
      listName: null
    }
  if (!trimmedNewName) {
    alert('Please enter a non-empty name.');
    return newobj; 
  }


  if (capitalizedNewName.length > 20) {
    alert('Name should not exceed 20 characters.');
    return newobj; 
  }

  if (
    /^[a-zA-Z0-9_\- \u00C0-\u00FF]+$/.test(capitalizedNewName) &&
    /^\S(?:.*\S)?$/.test(capitalizedNewName)
  ) {
    const isNameExist = obj.allLists.some(list => list.name === capitalizedNewName);

    if (isNameExist) {
      alert('A list with the same name already exists. Please choose a different name.');
      return newobj;
    } else {
      newobj.isNameValid = true;
      newobj.listName = capitalizedNewName;
      return newobj;
    }
  } else {
    alert(
      'Invalid list name. Please use only letters, numbers, underscores, and hyphens.'
    );
    return newobj;
  }
};


export function renameListCreteria(obj){
  
    const trimmedNewName = obj.rename.trim();
    let capitalizedNewName = trimmedNewName
      .replace(/\s{2,}/g, ' ') 
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    let newObj ={
      isNameValid:false,
      newName: null
    }
    if (!trimmedNewName) {
      alert('Please enter a non-empty name.');
      return newObj; 
    }
  

    if (capitalizedNewName.length > 20) {
      alert('Name should not exceed 20 characters.');
      return newObj; 
    }
  
    if (capitalizedNewName === obj.listToEdit.name) {
      alert('New name should be different from the current list name.');
      return newObj;
    } else if (
      /^[a-zA-Z0-9_\- \u00C0-\u00FF]+$/.test(capitalizedNewName) &&
      /^\S(?:.*\S)?$/.test(capitalizedNewName)
    ) {
      const isNameExist = obj.allLists.some(list => list.name === capitalizedNewName);
  
      if (isNameExist) {
        alert('A list with the same name already exists. Please choose a different name.');
        return newObj
      } else {
        newObj.isNameValid = true;
        newObj.newName =capitalizedNewName
        return newObj;
      }
    } else {
      alert(
        'Invalid list name. Please use only letters, numbers, underscores, and hyphens.'
      );
      return newObj;
    }
  };
