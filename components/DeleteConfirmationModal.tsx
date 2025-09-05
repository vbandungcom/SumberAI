import React from 'react';

interface DeleteConfirmationModalProps {
    articleTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDeleting: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    articleTitle,
    onConfirm,
    onCancel,
    isDeleting,
}) => {
    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
        >
            <div className="bg-blue-900/80 w-full max-w-lg rounded-2xl border border-blue-700/50 flex flex-col shadow-2xl animate-fade-in-up">
                <header className="flex justify-between items-center p-4 border-b border-blue-700/50">
                    <h2 id="delete-modal-title" className="text-2xl font-bold">Confirm Deletion</h2>
                    <button 
                        onClick={onCancel} 
                        className="text-blue-300 hover:text-white text-2xl leading-none"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </header>
                <div className="p-6">
                    <p className="text-blue-200">
                        Are you sure you want to permanently delete the article: <strong className="text-white">"{articleTitle}"</strong>? This action cannot be undone.
                    </p>
                </div>
                <footer className="flex justify-end gap-4 p-4 bg-blue-900/50 rounded-b-2xl">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition disabled:bg-red-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isDeleting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Deleting...
                            </>
                        ) : 'Delete'}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;