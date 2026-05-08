export type Lang = "en" | "ru" | "uz";

export interface Destination {
  id: number;
  city: string;
  country: string;
  img: string;
  imgLarge: string;
  price: string;
  tag: string;
  description: string;
  highlights: string[];
}

export interface BlogPost {
  id: string;
  cat: string;
  title: string;
  date: string;
  read: string;
  img: string;
  imgLarge?: string;
  excerpt: string;
  body: string[];
}

export interface Deal {
  from: string;
  to: string;
  date: string;
  price: string;
  save: string;
  airline: string;
  img: string;
}

export interface Testimonial {
  name: string;
  loc: string;
  trip: string;
  stars: number;
  text: string;
  avatar: string;
}

export interface TeamMember {
  name: string;
  role: string;
  img: string;
}

export interface TripInfo {
  city: string;
  country: string;
  price: string;
}
