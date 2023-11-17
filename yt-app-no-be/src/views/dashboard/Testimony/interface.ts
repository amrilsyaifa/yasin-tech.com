export interface Payload {
  name: string;
  company: string;
  job_title: string;
  desc_ID: string;
  desc_EN: string;
  rating: string;
  image: string;
  status: string;
}

export interface CardProps {
  id: string;
  src: string;
  name: string;
  company: string;
  jobTitle: string;
  rating: string;
  testimony: string;
}
