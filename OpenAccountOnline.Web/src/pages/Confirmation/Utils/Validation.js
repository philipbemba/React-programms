// --- Imports --- //
import * as yup from 'yup'; // for everything

// --- Regex --- //

// --- Yup Configurations --- //
const schema = yup.object().shape({
  member_account_agreement_accepted: yup.boolean().required()
});

export default { schema };
