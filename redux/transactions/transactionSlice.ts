import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

export interface TransactionState {
  transactions: Partial<Record<TransactionTypes, TransactionDetails>>;
}

const initialState: TransactionState = {
  transactions: {},
};

export const transactionSlice: Slice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    updateTransactions: (state, action: PayloadAction<TransactionDetails>) => {
      state.transactions[action.payload.methodCall] = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  updateTransactions,
  reset,
} = transactionSlice.actions;

export default transactionSlice.reducer;
