let licenses = [];
let nextId = 1;

async function getAllLicenses() {
  return licenses;
}

async function saveLicense(fullName, birthDate, docNumber, category) {
  const newLicense = {
    id: nextId++,
    full_name: fullName,
    birth_date: birthDate,
    doc_number: docNumber,
    category: category,
    created_at: new Date().toISOString()
  };
  licenses.push(newLicense);
  return newLicense;
}

module.exports = { getAllLicenses, saveLicense };