// Productos

categories = [
  {
    _id: Id,
    name: String,
    representativeImage: Object,
    products: Array,
  },
];

products = [
  {
    _id: Id,
    name: String,
    description: String,
    picture: Object,
    pictures: Array,
  },
];

attributes = [
  {
    _id: Id,
    product: ForeingId,
    type: String,
    value: String,
  },
];

albums = [
  {
    _id: Id,
    foreingId: ForeingId,
    images: Array,
  },
];

// Empresa

about = {
  resume: String,
  mission: String,
  vission: String,
};

info = {
  name: String,
  address: String,
  state: String,
  country: String,
  phone: String,
  email: String,
  location: Object,
};

location = {
  lat: Number,
  lng: Number,
};

// Website Sections

hero = {
  image: Object,
  title: String,
  subtitle: String,
  redirectTo: String,
};

productHighlight = {
  image: Object,
  title: String,
  description: String,
  redirectTo: String,
};
