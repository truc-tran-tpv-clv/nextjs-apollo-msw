export enum EUserRole {
  Admin = "admin",
  Member = "member",
}

export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type TRegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type TSignInRequest = {
  email: string;
  password: string;
};

export type TSignInResponse = TUser & {
  accessToken: string;
};

export enum EProductStatus {
  PENDING = "PENDING",
  PUBLISHED = "PUBLISHED",
  EXPIRED = "EXPIRED",
}

export type TProduct = {
  id: number;
  name: string;
  duration: number;
  status: EProductStatus;
  startPrice: number;
  createdAt: string;
  updatedAt: string;
  expiredAt: string | null;
  createdBy: number;
  user: Pick<TUser, "firstName" | "lastName">;
};

export type TCreateProductRequest = Pick<
  TProduct,
  "name" | "startPrice" | "duration"
>;

export type TDepositRequest = {
  amount: number;
};

type TPaginationRequest = {
  page: number;
  limit: number;
};

export type TProductsRequest = {
  status: EProductStatus;
  keyword: string | undefined;
} & TPaginationRequest;

export type TPaginationResponse<T> = {
  data: T;
  total: number;
};

export type TBidPriceRequest = {
  bidPrice: number;
  id: number;
};

export type THistoryProduct = {
  id: number;
  createdAt: string;
  bidPrice: number;
  product: Pick<TProduct, "id" | "name">;
  user: Pick<TUser, "id" | "firstName" | "lastName">;
};

export type THistoryRequest = {
  id: number;
} & TPaginationRequest;

export enum EEventName {
  ProductPublished = "ProductPublished",
}

export enum EMessageEventType {
  Notification = "Notification",
}

export type TNotificationEvent = {
  eventName: EEventName;
};

export type TMessageEvent = {
  [EMessageEventType.Notification]: TNotificationEvent;
};

export type TCoinHistoryRequest = TPaginationRequest;

export enum ECoinHistoryType {
  DEPOSIT = "Deposit",
  BID_PRICE = "Bid Price",
}

export type TCoinHistory = {
  id: number;
  userId: number;
  coin: number;
  createdAt: string;
  action: ECoinHistoryType;
};
