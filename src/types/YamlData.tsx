export interface YamlData {
  main: {
    title: string;
    instagram: string;
    facebook: string;
    soundcloud: string;
    spotify: string;
    twitter: string;
  };
  featured: {
    name: string
    image: string
    description: string
  };
  hero: {
    heading: string
    subheading: string
    description: string
    backgroundImage: string
  };
  albums: Album[];
}

interface Album {
  name: string;
}

const defaultData: YamlData = {
  main: {
    title: "",
    instagram: "",
    facebook: "",
    soundcloud: "",
    spotify: "",
    twitter: "",
  },
  hero: {
    heading: "",
    subheading: "",
    description: "",
    backgroundImage: ""
  },
  featured: {
    name: "",
    image: "",
    description: ""
  },
  albums: []
};

export default defaultData;