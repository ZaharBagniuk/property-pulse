const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// fetch all properties
async function fetchProperties() {
  try {
    // Handle the case when the domain is not available yet
    if(!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data!');
    }
    return res.json();
  } catch (e) {
    console.log(e);
    return [];
  }
}

// fetch single property
async function fetchProperty(id) {
  try {
    // Handle the case when the domain is not available yet
    if(!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data!');
    }
    return res.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}

export {
  fetchProperties,
  fetchProperty
};
