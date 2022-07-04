type Nullable<T> = T | null;

// swagger models
type Option = { value: string; key: string };
type Property = { type: string; description?: string };

interface Path {
  [key: string]: Api;
}
interface Api {
  tags?: string[] | null;
  summary: string;
  description: string;
  produces?: string[] | null;
  consumes?: string[] | null;
  parameters?: ParametersEntity[] | null;
  responses: Responses;
  security?: SecurityEntity[] | null;
}
interface ParametersEntity {
  name: string;
  in: string;
  description: string;
  required: boolean;
  type: string;
  enum?: string[] | null;
}
interface Responses {
  [number]: number;
}

interface Window {
  kakao: any;
}
