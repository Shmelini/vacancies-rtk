type WorkFormatItem = {
  id: string;
  name: string;
};

export type Vacancy = {
  id: string;
  alternate_url: string;
  name: string;
  salary: {
    currency: string;
    from: number | null;
    to: number | null;
  } | null;
  area: {
    id: string;
    name: string;
    url: string;
  };
  experience: {
    id: string;
    name: string;
  };
  employer: {
    id: string;
    name: string;
  };
  work_format: WorkFormatItem[];
};
