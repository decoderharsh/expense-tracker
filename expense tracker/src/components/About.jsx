import React, { useContext } from "react";
import ThemeContext from "../context/themeContext";

const About = () => {
  const { mode } = useContext(ThemeContext);

  return (
    <div  className={`min-h-screen px-4 py-12 transition-colors duration-300 ${mode === "dark"
      ? "bg-gray-950 text-white" : "bg-linear-to-br from-slate-50 via-white to-blue-50 text-slate-900"
  }`}>
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-5 flex h-15 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-400 to-blue-500 text-white shadow-lg shadow-blue-200/20">
            <span className="material-symbols-outlined text-4xl">
              account_balance_wallet
            </span>
          </div>

          <h2
            className={`text-2xl font-extrabold md:text-3xl ${
              mode === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            About <span className="text-red-500">Expense Tracker</span>
          </h2>

          <p
            className={`mt-3 text-lg font-medium ${
              mode === "dark" ? "text-gray-300" : "text-slate-500"
            }`}
          >
            Your money, your control.
          </p>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-linear-to-r from-green-400 to-green-600" />

          <p
            className={`mx-auto mt-5 max-w-2xl leading-7 ${
              mode === "dark" ? "text-gray-300" : "text-slate-600"
            }`}
          >
            Expense Tracker is a simple personal finance management
            application that helps you track your income and expenses,
            understand your spending habits, and build a better financial future.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* What You Can Do */}
          <div
            className={`group rounded-2xl border p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
              mode === "dark"
                ? "border-gray-700 bg-gray-900 hover:shadow-black/20"
                : "border-blue-100 bg-white hover:shadow-blue-100"
            }`}
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <span className="material-symbols-outlined text-3xl">
                checklist
              </span>
            </div>

            <h3
              className={`mb-5 text-xl font-bold ${
                mode === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              What You Can Do
            </h3>

            <ul
              className={`space-y-4 ${
                mode === "dark" ? "text-gray-300" : "text-slate-600"
              }`}
            >
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-500">
                  check_circle
                </span>
                <span>Track income and daily expenses.</span>
              </li>

              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-blue-500">
                  check_circle
                </span>
                <span>Add, edit, and delete transactions.</span>
              </li>

              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-violet-500">
                  check_circle
                </span>
                <span>Organize transactions by category.</span>
              </li>

              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-amber-500">
                  check_circle
                </span>
                <span>Access your records with authentication.</span>
              </li>
            </ul>
          </div>

          {/* Our Goal */}
          <div
            className={`group rounded-2xl border p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
              mode === "dark"
                ? "border-gray-700 bg-gray-900 hover:shadow-black/20"
                : "border-indigo-100 bg-linear-to-br from-orange-100 via-blue-50 to-white hover:shadow-indigo-100"
            }`}
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <span className="material-symbols-outlined text-3xl">
                track_changes
              </span>
            </div>

            <h3
              className={`mb-4 text-xl font-bold ${
                mode === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Our Goal
            </h3>

            <p
              className={`leading-7 ${
                mode === "dark" ? "text-gray-300" : "text-slate-600"
              }`}
            >
              Our goal is to make money management simple and accessible.
              By keeping transactions organized, you can become more
              aware of your spending and make better financial decisions.
            </p>

            <div
              className={`mt-6 flex items-center gap-3 rounded-xl border p-4 ${
                mode === "dark"
                  ? "border-blue-900 bg-blue-950/40"
                  : "border-blue-100 bg-blue-100/70"
              }`}
            >
              <span className="material-symbols-outlined text-3xl text-blue-400">
                trending_up
              </span>

              <p className="font-bold leading-6 text-blue-500">
                Spend smarter.
                <br />
                Track better. Save more.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
