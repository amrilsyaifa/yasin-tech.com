import { Response } from "express";

interface Params {
  res: Response;
  status: number;
  message: string;
  data?: any;
}

export const SuccessResponse = (props: Params) => {
  return props.res.status(props.status).json({
    status: "success",
    message: props.message,
    data: props?.data ?? null,
  });
};

export const ErrorResponse = (props: Params) => {
  return props.res.status(props.status).json({
    status: "error",
    message: props.message,
    data: props?.data ?? null,
  });
};
