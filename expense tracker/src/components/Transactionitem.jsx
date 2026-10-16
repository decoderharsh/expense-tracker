
import React, { useContext } from "react";
import transactionContext from "../context/transactionContext";
import ThemeContext from "../context/themeContext";

const Transactionitem = (props) => {
  const context = useContext(transactionContext);
  const { deleteTransaction } = context;

  const themeContext = useContext(ThemeContext);
  const { mode } = themeContext;

  const { trans, updateTransaction } = props;

  return (
    <div className="w-full min-w-0">
      <div
        className={`w-full rounded-xl border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
          mode === "dark"
            ? "bg-gray-950 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Item + Amount */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p
              className={`text-xs font-medium uppercase tracking-wide ${
                mode === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
            >
              Item
            </p>

            <p
              className={`mt-1 wrap-break-words text-base font-semibold ${
                mode === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              {trans.item}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p
              className={`text-xs font-medium uppercase tracking-wide ${
                mode === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
            >
              Amount
            </p>

            <p
              className={`mt-1 text-lg font-bold ${
                trans.type === "Income"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {trans.type === "Income" ? "+" : "-"}₹
              {Number(trans.amount).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Type + Category */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              trans.type === "Income"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {trans.type}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              mode === "dark"
                ? "bg-gray-700 text-gray-200"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {trans.category}
          </span>
        </div>

        {/* Date */}
        <div
          className={`mt-4 border-t pt-3 ${
            mode === "dark" ? "border-gray-700" : "border-gray-100"
          }`}
        >
          <p
            className={`text-sm ${
              mode === "dark" ? "text-gray-300" : "text-gray-500"
            }`}
          >
            <span className="material-symbols-outlined mr-1 align-middle text-base">
              calendar_month
            </span>

            {new Date(trans.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            aria-label="Edit transaction"
            onClick={() => updateTransaction(trans)}
            className="flex items-center gap-1 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100"
          >
            <span className="material-symbols-outlined text-lg">
              edit_square
            </span>
            Edit
          </button>

          <button
            type="button"
            aria-label="Delete transaction"
            onClick={() => {
              deleteTransaction(trans._id);
              props.showAlert("Deleted successfully!", "success");
            }}
            className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
          >
            <span className="material-symbols-outlined text-lg">
              delete
            </span>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactionitem;