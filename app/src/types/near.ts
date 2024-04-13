enum Chain {
  ETH = "eth",
  BNB = "bsc"
}

type Transaction = {
  to: string;
  value: string;
  data?: string;
};
