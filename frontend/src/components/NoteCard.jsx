import { useState } from "react";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils.js";

const NoteCard = ({ note, onDelete }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openDeleteModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsConfirmOpen(true);
  };

  const closeDeleteModal = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (isDeleting) return;
    setIsConfirmOpen(false);
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDeleting) return;

    setIsDeleting(true);
    const isDeleted = await onDelete(id);
    setIsDeleting(false);

    if (isDeleted) {
      setIsConfirmOpen(false);
    }
  };

  return (
    <>
      <Link
        to={`/note/${note._id}`}
        className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
      >
        <div className="card-body">
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
              {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
              <PenSquareIcon className="size-4" />
              <button
                type="button"
                className="btn btn-ghost btn-xs text-error"
                onClick={openDeleteModal}
                disabled={isDeleting}
                aria-label={`Delete ${note.title}`}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>

      <dialog className={`modal ${isConfirmOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="text-lg font-bold text-base-content">Delete note?</h3>
          <p className="py-3 text-sm text-base-content/70">
            This action will permanently delete{" "}
            <span className="font-semibold text-base-content">
              {note.title}
            </span>
            .
          </p>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={closeDeleteModal}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={(e) => handleDelete(e, note._id)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
        <button
          type="button"
          className="modal-backdrop"
          onClick={closeDeleteModal}
          aria-label="Close delete confirmation"
        />
      </dialog>
    </>
  );
};

export default NoteCard;
