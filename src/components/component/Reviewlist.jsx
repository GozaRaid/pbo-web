import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button";
import { useDeleteBookReviewById } from "@/features/book/review/useDeleteBookReviewById";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReviewForm } from "./Review";

export const ReviewList = ({ reviews, mine = false, id }) => {
  const [editingReviewId, setEditingReviewId] = useState(null);
  const deleteBookReviewMutation = useDeleteBookReviewById();

  const handleRemoveReview = async (reviewId) => {
    try {
      await deleteBookReviewMutation.mutateAsync({
        bookId: id,
        reviewId,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error removing review:", error);
    }
  };

  const handleEditReview = (reviewId) => {
    setEditingReviewId(reviewId);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
  };

  return (
    <div className="space-y-6">
      {!reviews.length && <p className="font-semibold">No reviews yet</p>}
      {reviews.map((review) => (
        <div key={review.id} className="flex gap-2">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt={review.displayName} />
            <AvatarFallback>{review.displayName}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{review.displayName}</div>
            </div>
            {editingReviewId === review.id ? (
              <ReviewForm
                bookId={id}
                initialReview={review.review}
                reviewId={review.id}
                onCancel={handleCancelEdit}
              />
            ) : (
              <p className="text-sm leading-relaxed">{review.review}</p>
            )}
          </div>
          {mine && !editingReviewId && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreVerticalIcon className="w-5 h-5" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleRemoveReview(review.id)}>
                  <TrashIcon className="w-4 h-4 mr-1" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEditReview(review.id)}>
                  <EditIcon className="w-4 h-4 mr-1" />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      ))}
    </div>
  );
};

function MoreVerticalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function EditIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
