import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAddBookReviewById } from "@/features/book/review/useAddBookReviewById";
import { useUpdateBookReviewById } from "@/features/book/review/useUpdateBookReviewById";

export const ReviewForm = ({
  bookId,
  initialReview = "",
  reviewId = null,
  onCancel = null,
}) => {
  const [text, setText] = useState(initialReview);
  const addBookReviewMutation = useAddBookReviewById();
  const updateBookReviewMutation = useUpdateBookReviewById();

  useEffect(() => {
    setText(initialReview);
  }, [initialReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text) {
      try {
        if (reviewId) {
          await updateBookReviewMutation.mutateAsync({
            bookId,
            reviewId,
            review: text,
          });
        } else {
          await addBookReviewMutation.mutateAsync({ bookId, review: text });
        }
        setText("");
        if (onCancel) onCancel();
        window.location.reload();
      } catch (error) {
        console.error("Failed to submit review:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Share your thoughts on the book"
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={
            addBookReviewMutation.isLoading ||
            updateBookReviewMutation.isLoading
          }
        >
          {addBookReviewMutation.isLoading || updateBookReviewMutation.isLoading
            ? "Submitting..."
            : reviewId
            ? "Update Review"
            : "Submit Review"}
        </Button>
      </div>
    </form>
  );
};
