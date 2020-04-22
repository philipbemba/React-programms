/**
 * Gets share depending on member age
 * @param {number} age age of the member
 * @param {*} state redux state
 */
function getRequiredShare(state, age) {
  if (age >= 12 && age < 18) {
    return addFunding(
      state.catalog.products.find(p => p.name == 'Youth Share')
    );
  }
  return addFunding(
    state.catalog.products.find(p => p.name == 'Regular Share')
  );
}

function addFunding(product) {
  return Object.assign({}, product, { funding: 0 });
}

export { getRequiredShare };
