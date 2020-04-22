/**
 * Calculates age given a date of birth
 * @param {string} dob date time stamp representing date of birth
 */
const calculateAge = dob => {
  // Calculate age
  var birthDate = new Date(dob);
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export { calculateAge };
