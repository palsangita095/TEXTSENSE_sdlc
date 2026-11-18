import {
  getShowcaseInitials,
  successStatusClasses,
  type ShowcaseUser,
} from "@/data/admin/modalShowcase";

interface SuccessStateCardProps {
  user: ShowcaseUser;
  onAddAnother: () => void;
  onDone: () => void;
}

export default function SuccessStateCard({
  user,
  onAddAnother,
  onDone,
}: SuccessStateCardProps) {
  return (
    <div
      id="successCard"
      className="my-auto w-full rounded-2xl bg-white p-5 text-center shadow-lg sm:p-6">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
        <i className="fa-solid fa-check text-3xl"></i>
      </div>

      <h3 className="mb-2 text-xl font-extrabold text-slate-900">
        User saved successfully
      </h3>

      <p className="mb-6 text-sm leading-6 text-slate-600">
        <span id="successUserName" className="font-bold text-slate-800">
          {user.fullName}
        </span>{" "}
        has been added as a{" "}
        <span id="successUserRole" className="font-semibold text-slate-800">
          {user.role}
        </span>
        . An invitation email was sent to{" "}
        <span
          id="successUserEmail"
          className="break-words font-semibold text-blue-700">
          {user.email}
        </span>
        .
      </p>

      <div className="mb-6 flex items-center rounded-xl border border-slate-200 p-3 text-left">
        <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
          <span id="successInitials">{getShowcaseInitials(user.fullName)}</span>
        </div>

        <div className="min-w-0 flex-1">
          <p id="successProfileName" className="truncate text-sm font-bold text-slate-800">
            {user.fullName}
          </p>

          <p id="successProfileEmail" className="break-all text-xs text-slate-500">
            {user.email}
          </p>
        </div>

        <div className="ml-2 text-right">
          <p id="successProfileRole" className="text-xs text-slate-600">
            {user.role}
          </p>

          <p
            className={`mt-2 text-xs font-semibold ${successStatusClasses[user.status]}`}>
            <i className="fa-solid fa-circle mr-1 text-[7px]"></i>
            {user.status}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row">
        <button
          type="button"
          id="addAnotherBtn"
          onClick={onAddAnother}
          className="mb-3 w-full rounded-xl border border-slate-300 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:mb-0 sm:mr-2">
          <i className="fa-solid fa-plus mr-2"></i>
          Add Another
        </button>

        <button
          type="button"
          id="doneBtn"
          onClick={onDone}
          className="w-full rounded-xl bg-blue-700 px-3 py-3 text-sm font-bold text-white transition hover:bg-blue-800 sm:ml-2">
          Done
        </button>
      </div>
    </div>
  );
}
